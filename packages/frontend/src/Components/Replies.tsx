import { graphql } from "babel-plugin-relay/macro";
import { FC } from "react";
import { usePaginationFragment } from "react-relay";
import { Reply } from "./Reply";
import { RepliesPaginationQuery } from "./__generated__/RepliesPaginationQuery.graphql";
import { Replies_query$key } from "./__generated__/Replies_query.graphql";

const repliesFragment = graphql`
  fragment Replies_query on Comment
  @argumentDefinitions(
    count: { type: "Int", defaultValue: 0 }
    cursor: { type: "String", defaultValue: "" }
  )
  @refetchable(queryName: "RepliesPaginationQuery") {
    id
    replies(first: $count, after: $cursor)
      @connection(key: "Replies_query_replies") {
      edges {
        node {
          id
          ...Reply_replies
        }
      }
    }
  }
`;

type Props = {
  data: Replies_query$key;
};

export const Replies: FC<Props> = (props) => {
  const { data, refetch } = usePaginationFragment<
    RepliesPaginationQuery,
    Replies_query$key
  >(repliesFragment, props.data);
  return (
    <div>
      <div
        onClick={() => {
          refetch({ count: 5, cursor: "" });
        }}
      >
        Show Replies
      </div>
      {data.replies?.edges?.map((edge) =>
        edge?.node ? <Reply key={edge?.node.id} data={edge.node} /> : null
      )}
    </div>
  );
};
