import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { globalIdField } from "graphql-relay";
import { nodeInterface } from "../Nodes";
import { Context, LikeMongo, ModuleMongo } from "../types";
import { DateScalarType } from "../utils";
import { comments } from "./Comment";
import { GraphQLLike } from "./Like";

export const GraphQLModule = new GraphQLObjectType<ModuleMongo, Context>({
  name: "Module",
  fields: {
    id: globalIdField("Module", ({ _id }): string => _id.toHexString()),
    title: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ title }): string => title,
    },
    date: {
      type: new GraphQLNonNull(DateScalarType),
      resolve: ({ date }): Date => date,
    },
    duration: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ description }): string => description,
    },
    comments,
    likes: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(GraphQLLike))
      ),
      resolve: async (
        { _id: module_id },
        _args: unknown,
        { likes, user_oid }: Context
      ): Promise<LikeMongo[]> => {
        try {
          if (!user_oid) {
            throw new Error("No logged user.");
          }
          const results = await likes
            .find({
              module_id,
              user_id: user_oid,
            })
            .toArray();
          return results;
        } catch (e) {
          return [];
        }
      },
    },
  },
  interfaces: () => [nodeInterface],
});
