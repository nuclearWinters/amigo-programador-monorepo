import { graphql } from "babel-plugin-relay/macro";
import { FC } from "react";
import { useFragment, usePaginationFragment } from "react-relay";
import { Comment } from "./Comment";
import { CommentsPaginationModule } from "./__generated__/CommentsPaginationModule.graphql";
import { Comments_data_user$key } from "./__generated__/Comments_data_user.graphql";
import { Comments_module$key } from "./__generated__/Comments_module.graphql";

const commentsFragment = graphql`
  fragment Comments_module on Module
  @argumentDefinitions(
    count: { type: "Int", defaultValue: 5 }
    cursor: { type: "String", defaultValue: "" }
  )
  @refetchable(queryName: "CommentsPaginationModule") {
    comments(first: $count, after: $cursor)
      @connection(key: "Comments_query_comments") {
      edges {
        node {
          id
          ...Comment_comments
        }
      }
    }
  }
`;

const commentsUserFragment = graphql`
  fragment Comments_data_user on User {
    ...Comment_user
  }
`;

type Props = {
  data: Comments_module$key;
  user: Comments_data_user$key;
};

export const Comments: FC<Props> = (props) => {
  const { data } = usePaginationFragment<
    CommentsPaginationModule,
    Comments_module$key
  >(commentsFragment, props.data);
  const userData = useFragment<Comments_data_user$key>(
    commentsUserFragment,
    props.user
  );
  return (
    <div>
      <h2>Comments</h2>
      {data.comments?.edges?.map((edge) =>
        edge?.node ? (
          <Comment key={edge?.node.id} data={edge.node} user={userData} />
        ) : null
      )}
    </div>
  );
};
