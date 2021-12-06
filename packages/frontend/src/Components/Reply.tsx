import { graphql } from "babel-plugin-relay/macro";
import { FC } from "react";
import { useFragment } from "react-relay";
import { Reply_replies$key } from "./__generated__/Reply_replies.graphql";

const replyFragment = graphql`
  fragment Reply_replies on Reply {
    id
    comment_gid
    likes
    text
    user_gid
    user_username
    created_at
    updated_at
  }
`;

type Props = {
  data: Reply_replies$key;
};

export const Reply: FC<Props> = (props) => {
  const data = useFragment<Reply_replies$key>(replyFragment, props.data);
  return (
    <div>
      <div>{data.text}</div>
      <div>{data.likes}</div>
      <div>{data.user_username}</div>
      <div>{data.created_at}</div>
      <div>{data.updated_at}</div>
    </div>
  );
};
