import { graphql } from "babel-plugin-relay/macro";
import { FC, useState } from "react";
import { useFragment, useMutation } from "react-relay";
import { Replies } from "./Replies";
import { CommentAddReplyMutation } from "./__generated__/CommentAddReplyMutation.graphql";
import { Comment_comments$key } from "./__generated__/Comment_comments.graphql";
import { ConnectionHandler } from "relay-runtime";
import { logOut } from "../utils";
import { tokensAndData } from "../App";
import { Comment_user$key } from "./__generated__/Comment_user.graphql";

const commentFragment = graphql`
  fragment Comment_comments on Comment {
    id
    module_gid
    likes
    text
    user_gid
    user_username
    created_at
    updated_at
    ...Replies_query
  }
`;

const commentUserFragment = graphql`
  fragment Comment_user on User {
    id
    username
  }
`;

type Props = {
  data: Comment_comments$key;
  user: Comment_user$key;
};

export const Comment: FC<Props> = (props) => {
  const data = useFragment<Comment_comments$key>(commentFragment, props.data);
  const user = useFragment<Comment_user$key>(commentUserFragment, props.user);
  const [reply, setReply] = useState("");
  const [commit] = useMutation<CommentAddReplyMutation>(graphql`
    mutation CommentAddReplyMutation($input: AddReplyInput!) {
      addReply(input: $input) {
        error
        reply_edge {
          cursor
          node {
            id
            likes
            comment_gid
            text
            user_gid
            user_username
            created_at
            updated_at
          }
        }
        accessToken
      }
    }
  `);
  return (
    <div>
      <div>{data.text}</div>
      <div>{data.likes}</div>
      <div>{data.user_username}</div>
      <div>{data.created_at}</div>
      <div>{data.updated_at}</div>
      <input
        type="text"
        value={reply}
        onChange={(e) => {
          setReply(e.target.value);
        }}
      />
      <button
        onClick={() => {
          setReply("");
          commit({
            variables: {
              input: {
                reply,
                user_gid: user.id,
                user_username: user.username,
                comment_gid: data.id,
              },
            },
            onCompleted: (response) => {
              if (response.addReply.error) {
                if (response.addReply.error === "jwt expired") {
                  logOut();
                }
                return window.alert(response.addReply.error);
              }
              tokensAndData.accessToken = response.addReply.accessToken;
            },
            updater: (store) => {
              try {
                const commentRecord = store.get(data.id);
                if (!commentRecord) {
                  throw new Error("No comment found (addReply).");
                }
                const connectionRecordEmpty = ConnectionHandler.getConnection(
                  commentRecord,
                  "Replies_query_replies",
                  { comment_gid: "" }
                );
                const connectionRecordGid = ConnectionHandler.getConnection(
                  commentRecord,
                  "Replies_query_replies",
                  { comment_gid: data.id }
                );
                const connection = connectionRecordGid || connectionRecordEmpty;
                if (!connection) {
                  throw new Error("No connection found (addReply).");
                }
                const payload = store.getRootField("addReply");
                const serverEdge = payload.getLinkedRecord("reply_edge");
                const newEdge = ConnectionHandler.buildConnectionEdge(
                  store,
                  connection,
                  serverEdge
                );
                if (!newEdge) {
                  throw new Error("No new edge (addReply).");
                }
                ConnectionHandler.insertEdgeBefore(connection, newEdge);
              } catch (e) {}
            },
          });
        }}
      >
        Reply
      </button>
      <Replies data={data} />
    </div>
  );
};
