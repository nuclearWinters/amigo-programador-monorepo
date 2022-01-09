import {
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import {
  Connection,
  ConnectionArguments,
  connectionDefinitions,
  connectionFromArray,
  forwardConnectionArgs,
  fromGlobalId,
  globalIdField,
} from "graphql-relay";
import { Filter } from "mongodb";
import { nodeInterface } from "../Nodes";
import { Context, ReplyMongo } from "../types";
import { base64, DateScalarType, unbase64 } from "../utils";
import { ObjectId } from "bson";

export const GraphQLReply = new GraphQLObjectType<ReplyMongo>({
  name: "Reply",
  fields: {
    id: globalIdField("Reply", ({ _id }): string => _id.toHexString()),
    likes: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: ({ likes }): number => likes,
    },
    comment_gid: globalIdField("Comment", ({ comment_id }): string =>
      comment_id.toHexString()
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
  },
  interfaces: () => [nodeInterface],
});

export const { connectionType: ReplyConnection, edgeType: GraphQLReplyEdge } =
  connectionDefinitions({
    name: "Reply",
    nodeType: GraphQLReply,
  });

export const replies = {
  type: new GraphQLNonNull(ReplyConnection),
  args: {
    comment_gid: { type: GraphQLID },
    ...forwardConnectionArgs,
  },
  resolve: async (
    _root: unknown,
    args: unknown,
    { replies }: Context
  ): Promise<Connection<ReplyMongo>> => {
    const { comment_gid, first, after } = args as ConnectionArguments & {
      comment_gid?: string;
    };
    try {
      if (!comment_gid) {
        throw new Error("comment_gid is empty.");
      }
      if (!first) {
        throw new Error("first is falsy.");
      }
      if (first < 0) {
        throw new Error("first is less than zero.");
      }
      const { id: comment_id } = fromGlobalId(comment_gid);
      const reply_id = unbase64(after || "");
      const limit = first + 1;
      const query: Filter<ReplyMongo> = {
        comment_id: new ObjectId(comment_id),
      };
      if (reply_id) {
        query._id = { $lt: new ObjectId(reply_id) };
      }
      const results = await replies
        .find(query)
        .limit(limit)
        .sort({ $natural: -1 })
        .toArray();
      const edgesMapped = results.map((reply) => {
        return {
          cursor: base64(reply._id.toHexString()),
          node: reply,
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
