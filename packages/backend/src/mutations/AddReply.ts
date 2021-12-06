import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";
import { GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";
import { Context, ReplyMongo } from "../types";
import { ObjectId } from "bson";
import { base64 } from "../utils";
import { GraphQLReplyEdge } from "../objects/Reply";

interface Input {
  reply: string;
  comment_gid: string;
  user_gid: string;
  user_username: string;
}

interface ReplyEdge {
  cursor: string;
  node: ReplyMongo;
}

type Payload = {
  reply_edge: ReplyEdge | null;
  accessToken: string;
  error: string;
};

export const AddReplyMutation = mutationWithClientMutationId({
  name: "AddReply",
  description: "Añade una respuesta a un comentario.",
  inputFields: {
    reply: { type: new GraphQLNonNull(GraphQLString) },
    comment_gid: { type: new GraphQLNonNull(GraphQLID) },
    user_gid: { type: new GraphQLNonNull(GraphQLString) },
    user_username: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    error: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ error }: Payload): string => error,
    },
    accessToken: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ accessToken }: Payload): string => accessToken,
    },
    reply_edge: {
      type: GraphQLReplyEdge,
      resolve: ({ reply_edge }: Payload): ReplyEdge | null => reply_edge,
    },
  },
  mutateAndGetPayload: async (
    { reply, comment_gid, user_gid, user_username }: Input,
    { replies, user_oid, validAccessToken }: Context
  ): Promise<Payload> => {
    try {
      if (!validAccessToken) {
        throw new Error("No logged user.");
      }
      if (!user_oid) {
        throw new Error("No logged user.");
      }
      const { id: user_id } = fromGlobalId(user_gid);
      if (user_id !== user_oid.toHexString()) {
        throw new Error("No es el mismo usuario.");
      }
      const date = new Date();
      const { id: comment_id } = fromGlobalId(comment_gid);
      const comment_oid = new ObjectId(comment_id);
      const doc = await replies.insertOne({
        text: reply,
        user_id: user_oid,
        user_username,
        comment_id: comment_oid,
        created_at: date,
        updated_at: date,
        likes: 0,
      });
      return {
        error: "",
        accessToken: validAccessToken,
        reply_edge: {
          cursor: base64(doc.insertedId.toHexString()),
          node: {
            _id: doc.insertedId,
            text: reply,
            user_id: user_oid,
            user_username,
            comment_id: comment_oid,
            created_at: date,
            updated_at: date,
            likes: 0,
          },
        },
      };
    } catch (e) {
      return {
        error: e instanceof Error ? e.message : "",
        accessToken: "",
        reply_edge: null,
      };
    }
  },
});
