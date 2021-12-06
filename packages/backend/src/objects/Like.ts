import { GraphQLNonNull, GraphQLObjectType, GraphQLBoolean } from "graphql";
import { globalIdField } from "graphql-relay";
import { nodeInterface } from "../Nodes";
import { LikeMongo } from "../types";
import { DateScalarType } from "../utils";

export const GraphQLLike = new GraphQLObjectType<LikeMongo>({
  name: "Like",
  fields: {
    id: globalIdField("Like", ({ _id }): string => _id.toHexString()),
    comment_gid: globalIdField("Comment", ({ comment_id }): string =>
      comment_id.toHexString()
    ),
    user_gid: globalIdField("User", ({ user_id }): string =>
      user_id.toHexString()
    ),
    status: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve: ({ status }): boolean => status,
    },
    created_at: {
      type: new GraphQLNonNull(DateScalarType),
      resolve: ({ created_at }): Date => created_at,
    },
    updated_at: {
      type: new GraphQLNonNull(DateScalarType),
      resolve: ({ updated_at }): Date => updated_at,
    },
  },
  interfaces: () => [nodeInterface],
});
