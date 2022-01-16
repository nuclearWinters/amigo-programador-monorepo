import { /*fromGlobalId,*/ mutationWithClientMutationId } from "graphql-relay";
import { GraphQLString, GraphQLNonNull, GraphQLID } from "graphql";
import { /*Context,*/ UserMongo } from "../types";
//import { ObjectId } from "mongodb";
//import { refreshTokenMiddleware } from "../utils";
import { GraphQLUser } from "../Nodes";

/*interface Input {
  user_gid: string;
  username: string;
  email: string;
}*/

type Payload = {
  validAccessToken: string;
  error: string;
  user: UserMongo | null;
};

export const UpdateUserMutation = mutationWithClientMutationId({
  name: "UpdateUser",
  description:
    "Actualiza los datos personales: recibe el usuario actualizado y obtén un AccessToken valido. Datos disponibles: username y email",
  inputFields: {
    user_gid: { type: new GraphQLNonNull(GraphQLID) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    error: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ error }: Payload): string => error,
    },
    validAccessToken: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ validAccessToken }: Payload): string => validAccessToken,
    },
    user: {
      type: new GraphQLNonNull(GraphQLUser),
      resolve: ({ user }: Payload): UserMongo | null => user,
    },
  },
  mutateAndGetPayload: async (): /*{ user_gid, ...user }: Input,
    { users accessToken, refreshToken }: Context*/
  Promise<Payload> => {
    try {
      /*const { id: user_id } = fromGlobalId(user_gid);
      const { _id, validAccessToken } = await refreshTokenMiddleware(
        accessToken,
        refreshToken
      );
      if (user_id !== _id) {
        throw new Error("No es el mismo usuario.");
      }
      const _id_user = new ObjectId(user_id);
      const { value: userResult } = await users.findOneAndUpdate(
        { _id: _id_user },
        { $set: user }
      );
      if (!userResult) {
        throw new Error("No user found.");
      }
      return {
        validAccessToken,
        error: "",
        user: {
          ...userResult,
          _id: _id_user,
        },
      };*/
      return {
        validAccessToken: "",
        error: "",
        user: null,
      };
    } catch (e) {
      return {
        validAccessToken: "",
        error: e instanceof Error ? e.message : "",
        user: null,
      };
    }
  },
});
