import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";
import { GraphQLString, GraphQLNonNull, GraphQLID } from "graphql";
import { Context, CoursedMongo } from "../types";
import { ObjectId } from "mongodb";
import { GraphQLCoursed } from "../objects/Coursed";

interface Input {
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
    { module_gid, technology_gid }: Input,
    { user_oid, validAccessToken, coursed }: Context
  ): Promise<Payload> => {
    try {
      if (!validAccessToken || !user_oid) {
        throw new Error("No logged user.");
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
