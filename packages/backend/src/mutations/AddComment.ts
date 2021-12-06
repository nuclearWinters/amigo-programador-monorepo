import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";
import { GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";
import { CommentMongo, Context } from "../types";
import { ObjectId } from "bson";
import { base64 } from "../utils";
import { GraphQLCommentEdge } from "../objects/Comment";

interface Input {
  comment: string;
  module_gid: string;
  user_gid: string;
  user_username: string;
}

interface CommentEdge {
  cursor: string;
  node: CommentMongo;
}

type Payload = {
  comment_edge: CommentEdge | null;
  accessToken: string;
  error: string;
};

export const AddCommentMutation = mutationWithClientMutationId({
  name: "AddComment",
  description: "Añade un comentario a un modulo.",
  inputFields: {
    comment: { type: new GraphQLNonNull(GraphQLString) },
    module_gid: { type: new GraphQLNonNull(GraphQLID) },
    user_gid: { type: new GraphQLNonNull(GraphQLID) },
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
    comment_edge: {
      type: GraphQLCommentEdge,
      resolve: ({ comment_edge }: Payload): CommentEdge | null => comment_edge,
    },
  },
  mutateAndGetPayload: async (
    { comment, module_gid, user_gid, user_username }: Input,
    { comments, user_oid, validAccessToken }: Context
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
      const { id: module_id } = fromGlobalId(module_gid);
      const module_oid = new ObjectId(module_id);
      const doc = await comments.insertOne({
        text: comment,
        user_id: user_oid,
        user_username,
        module_id: module_oid,
        created_at: date,
        updated_at: date,
        likes: 0,
      });
      return {
        error: "",
        accessToken: validAccessToken,
        comment_edge: {
          cursor: base64(doc.insertedId.toHexString()),
          node: {
            _id: doc.insertedId,
            text: comment,
            user_id: user_oid,
            user_username,
            module_id: module_oid,
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
        comment_edge: null,
      };
    }
  },
});
