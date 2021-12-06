import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";
import { GraphQLString, GraphQLNonNull, GraphQLID } from "graphql";
import { Context, UserMongo } from "../types";
import { ObjectId } from "mongodb";
import { GraphQLUser } from "../Nodes";

interface Input {
  user_gid: string;
  technology_gid: string;
}

type Payload = {
  accessToken: string;
  error: string;
  user: UserMongo | null;
};

export const UpdateDefaultTechnologyMutation = mutationWithClientMutationId({
  name: "UpdateDefaultTechnology",
  description:
    "Actualiza la tecnología que el usuario vera por defecto cuando revise su curso.",
  inputFields: {
    user_gid: { type: new GraphQLNonNull(GraphQLID) },
    technology_gid: { type: new GraphQLNonNull(GraphQLID) },
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
    user: {
      type: GraphQLUser,
      resolve: ({ user }: Payload): UserMongo | null => user,
    },
  },
  mutateAndGetPayload: async (
    { user_gid, technology_gid }: Input,
    { user_oid, validAccessToken, users }: Context
  ): Promise<Payload> => {
    try {
      if (!validAccessToken) {
        throw new Error("No logged user.");
      }
      if (!user_oid) {
        throw new Error("No logged user.");
      }
      if (user_gid === "VXNlcjowMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDA") {
        return {
          accessToken: "",
          error: "",
          user: {
            _id: new ObjectId("000000000000000000000000"),
            email: "",
            password: "",
            username: "",
            default_technology_id: new ObjectId("1095f055f92be2001a15885a"),
          },
        };
      }
      const { id: user_id } = fromGlobalId(user_gid);
      if (user_id !== user_oid.toHexString()) {
        throw new Error("No es el mismo usuario.");
      }
      const { id: technology_id } = fromGlobalId(technology_gid);
      const technology_oid = new ObjectId(technology_id);
      const { value: user } = await users.findOneAndUpdate(
        {
          _id: user_oid,
        },
        {
          $set: {
            default_technology_id: technology_oid,
          },
        },
        { returnDocument: "after" }
      );
      if (!user) {
        throw new Error("No user found.");
      }
      return {
        accessToken: validAccessToken,
        error: "",
        user,
      };
    } catch (e) {
      return {
        accessToken: "",
        error: e instanceof Error ? e.message : "",
        user: null,
      };
    }
  },
});
