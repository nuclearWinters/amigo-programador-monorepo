import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInt,
} from "graphql";
import { globalIdField } from "graphql-relay";
import { nodeInterface } from "../Nodes";
import { Context, PlaylistMongo } from "../types";

export const GraphQLPlaylist = new GraphQLObjectType<PlaylistMongo, Context>({
  name: "Playlist",
  fields: {
    id: globalIdField("Playlist", ({ _id }): string => _id.toHexString()),
    title: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ title }): string => title,
    },
    thumbnail: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ thumbnail }): string => thumbnail,
    },
    duration: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ duration }): string => duration,
    },
    order: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: ({ order }): number => order,
    },
    technology_gid: globalIdField("Technology", ({ technology_id }): string =>
      technology_id.toHexString()
    ),
    module_gid: globalIdField("Module", ({ module_id }): string =>
      module_id.toHexString()
    ),
  },
  interfaces: () => [nodeInterface],
});
