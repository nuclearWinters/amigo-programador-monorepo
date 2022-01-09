import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import {
  Connection,
  ConnectionArguments,
  forwardConnectionArgs,
  connectionDefinitions,
  connectionFromArray,
  globalIdField,
} from "graphql-relay";
import { Filter } from "mongodb";
import { nodeInterface } from "../Nodes";
import { CommentMongo, Context, ModuleMongo } from "../types";
import { base64, DateScalarType, unbase64 } from "../utils";
import { replies } from "./Reply";
import { ObjectId } from "bson";

export const GraphQLComment = new GraphQLObjectType<CommentMongo>({
  name: "Comment",
  fields: {
    id: globalIdField("Comment", ({ _id }): string => _id.toHexString()),
    likes: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: ({ likes }): number => likes,
    },
    module_gid: globalIdField("Module", ({ module_id }): string =>
      module_id.toHexString()
    ),
    text: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ text }): string => text,
    },
    user_gid: globalIdField("User", ({ user_id }): string =>
      user_id.toHexString()
    ),
    user_username: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ user_username }): string => user_username,
    },
    created_at: {
      type: new GraphQLNonNull(DateScalarType),
      resolve: ({ created_at }): Date => created_at,
    },
    updated_at: {
      type: new GraphQLNonNull(DateScalarType),
      resolve: ({ updated_at }): Date => updated_at,
    },
    replies,
  },
  interfaces: () => [nodeInterface],
});

export const {
  connectionType: CommentConnection,
  edgeType: GraphQLCommentEdge,
} = connectionDefinitions({
  name: "Comment",
  nodeType: GraphQLComment,
});

export const comments = {
  type: new GraphQLNonNull(CommentConnection),
  args: {
    ...forwardConnectionArgs,
  },
  resolve: async (
    { _id: module_id }: ModuleMongo,
    args: unknown,
    { comments }: Context
  ): Promise<Connection<CommentMongo>> => {
    const { first, after } = args as ConnectionArguments;
    try {
      if (!first) {
        throw new Error("first is falsy.");
      }
      if (first < 0) {
        throw new Error("first is less than zero.");
      }
      const comment_id = unbase64(after || "");
      const limit = first + 1;
      const query: Filter<CommentMongo> = {
        module_id: new ObjectId(module_id),
      };
      if (comment_id) {
        query._id = { $lt: new ObjectId(comment_id) };
      }
      const results = await comments
        .find(query)
        .limit(limit)
        .sort({ $natural: -1 })
        .toArray();
      const edgesMapped = results.map((comment) => {
        return {
          cursor: base64(comment._id.toHexString()),
          node: comment,
        };
      });
      const edges = edgesMapped.slice(0, first || 5);
      return {
        edges,
        pageInfo: {
          startCursor: edges[0]?.cursor || null,
          endCursor: edges[edges.length - 1]?.cursor || null,
          hasPreviousPage: false,
          hasNextPage: edgesMapped.length > (first || 0),
        },
      };
    } catch (e) {
      return connectionFromArray([], { first, after });
    }
  },
};
