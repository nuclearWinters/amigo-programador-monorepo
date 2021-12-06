import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";
import { GraphQLString, GraphQLNonNull, GraphQLID } from "graphql";
import { Context, CoursedMongo } from "../types";
import { ObjectId } from "mongodb";
import { GraphQLCoursed } from "../objects/Coursed";

interface Input {
  user_gid: string;
  module_gid: string;
  technology_gid: string;
}

type Payload = {
  accessToken: string;
  error: string;
  coursedModule: CoursedMongo | null;
};

export const UpdateDefaultModuleMutation = mutationWithClientMutationId({
  name: "UpdateDefaultModule",
  description:
    "Actualiza el modulo que el usuario vera por defecto cuando revise una tecnología.",
  inputFields: {
    user_gid: { type: new GraphQLNonNull(GraphQLID) },
    module_gid: { type: new GraphQLNonNull(GraphQLID) },
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
    coursedModule: {
      type: GraphQLCoursed,
      resolve: ({ coursedModule }: Payload): CoursedMongo | null =>
        coursedModule,
    },
  },
  mutateAndGetPayload: async (
    { user_gid, module_gid, technology_gid }: Input,
    { user_oid, validAccessToken, coursed }: Context
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
          coursedModule: {
            _id: new ObjectId("000000000000000000000003"),
            technology_id: new ObjectId("1095f055f92be2001a15885a"),
            total: 0,
            default_module_id: new ObjectId("3095f055f92be2001a15885a"),
            user_id: new ObjectId("7095f055f92be2001a15885a"),
          },
        };
      }
      const { id: user_id } = fromGlobalId(user_gid);
      if (user_id !== user_oid.toHexString()) {
        throw new Error("No es el mismo usuario.");
      }
      const { id: module_id } = fromGlobalId(module_gid);
      const { id: technology_id } = fromGlobalId(technology_gid);
      const module_oid = new ObjectId(module_id);
      const technology_oid = new ObjectId(technology_id);
      const { value: coursedModule } = await coursed.findOneAndUpdate(
        {
          user_id: user_oid,
          technology_id: technology_oid,
        },
        {
          $set: {
            default_module_id: module_oid,
          },
          $setOnInsert: {
            user_id: user_oid,
            technology_id: technology_oid,
            total: 0,
          },
        },
        { upsert: true, returnDocument: "after" }
      );
      if (!coursedModule) {
        throw new Error("No coursed module found.");
      }
      return {
        accessToken: validAccessToken,
        error: "",
        coursedModule,
      };
    } catch (e) {
      return {
        accessToken: "",
        error: e instanceof Error ? e.message : "",
        coursedModule: null,
      };
    }
  },
});
