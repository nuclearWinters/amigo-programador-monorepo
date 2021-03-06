import { mutationWithClientMutationId } from "graphql-relay";
import { GraphQLNonNull, GraphQLString } from "graphql";
import { Context } from "../types";

type Payload = {
  error: string;
};

export const LogOutMutation = mutationWithClientMutationId({
  name: "LogOut",
  description: "Cierra sesión.",
  inputFields: {},
  outputFields: {
    error: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ error }: Payload): string => error,
    },
  },
  mutateAndGetPayload: async (_, { res }: Context): Promise<Payload> => {
    try {
      res.clearCookie("refreshToken");
      return {
        error: "",
      };
    } catch (e) {
      return {
        error: e instanceof Error ? e.message : "",
      };
    }
  },
});
