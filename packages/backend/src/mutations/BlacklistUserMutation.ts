import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";
import { GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";
import { Context } from "../types";

interface Input {
  user_gid: string;
}

type Payload = {
  validAccessToken: string;
  error: string;
};

export const BlacklistUserMutation = mutationWithClientMutationId({
  name: "BlacklistUser",
  description: "Bloquea los refresh token de un usuario por una hora.",
  inputFields: {
    user_gid: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    validAccessToken: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ validAccessToken }: Payload): string => validAccessToken,
    },
    error: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ error }: Payload): string => error,
    },
  },
  mutateAndGetPayload: async (
    { user_gid }: Input,
    { rdb, user_oid, validAccessToken }: Context
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
        throw new Error("Solo el usuario puede bloquear su cuenta.");
      }
      await rdb.set(user_id, user_id, {
        EX: 60 * 60 * 24 * 365,
      });
      return { validAccessToken: "", error: "" };
    } catch (e) {
      return {
        validAccessToken: "",
        error: e instanceof Error ? e.message : "",
      };
    }
  },
});
