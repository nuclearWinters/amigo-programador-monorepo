import { GraphQLInt, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { globalIdField } from "graphql-relay";
import { nodeInterface } from "../Nodes";
import { Context, CoursedMongo } from "../types";

export const GraphQLCoursed = new GraphQLObjectType<CoursedMongo, Context>({
  name: "Coursed",
  fields: {
    id: globalIdField("Coursed", ({ _id }): string => _id.toHexString()),
    technology_gid: globalIdField("Technology", ({ technology_id }): string =>
      technology_id.toHexString()
    ),
    total: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: ({ total }): number => total,
    },
    default_module_gid: globalIdField(
      "Module",
      ({ default_module_id }): string => default_module_id.toHexString()
    ),
    user_gid: globalIdField("User", ({ user_id }): string =>
      user_id.toHexString()
    ),
  },
  interfaces: () => [nodeInterface],
});
