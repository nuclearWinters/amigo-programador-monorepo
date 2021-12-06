import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInt,
} from "graphql";
import { globalIdField } from "graphql-relay";
import { nodeInterface } from "../Nodes";
import { Context, TechnologyMongo } from "../types";

export const GraphQLTechnology = new GraphQLObjectType<
  TechnologyMongo,
  Context
>({
  name: "Technology",
  fields: {
    id: globalIdField("Technology", ({ _id }): string => _id.toHexString()),
    title: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ title }): string => title,
    },
    total: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: ({ total }): number => total,
    },
    order: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: ({ order }): number => order,
    },
    default_module_gid: globalIdField(
      "Module",
      ({ default_module_id }): string => default_module_id.toHexString()
    ),
  },
  interfaces: () => [nodeInterface],
});
