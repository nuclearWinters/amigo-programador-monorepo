import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInt,
} from "graphql";
import { globalIdField } from "graphql-relay";
import { nodeInterface } from "../Nodes";
import { Context, CoursingMongo } from "../types";

export const GraphQLCoursing = new GraphQLObjectType<CoursingMongo, Context>({
  name: "Coursing",
  fields: {
    id: globalIdField("Coursing", ({ _id }): string => _id.toHexString()),
    module_gid: globalIdField("Module", ({ module_id }): string =>
      module_id.toHexString()
    ),
    user_gid: globalIdField("User", ({ user_id }): string =>
      user_id.toHexString()
    ),
    technology_gid: globalIdField("Technology", ({ technology_id }): string =>
      technology_id.toHexString()
    ),
    progress: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ progress }): string => progress,
    },
    completed: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: ({ completed }): boolean => completed,
    },
  },
  interfaces: () => [nodeInterface],
});
