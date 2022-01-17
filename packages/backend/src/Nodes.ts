import { ObjectId } from "bson";
import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
} from "graphql";
import { fromGlobalId, globalIdField, nodeDefinitions } from "graphql-relay";
//import { GraphQLComment } from "./objects/Comment";
import { GraphQLCoursed } from "./objects/Coursed";
import { GraphQLCoursing } from "./objects/Coursing";
import { GraphQLModule } from "./objects/Module";
import { GraphQLPlaylist } from "./objects/Playlist";
//import { GraphQLReply } from "./objects/Reply";
import { GraphQLTechnology } from "./objects/Technologies";
import {
  Context,
  CoursedMongo,
  CoursingMongo,
  ModuleMongo,
  PlaylistMongo,
  TechnologyMongo,
  UserRoot,
} from "./types";

export const { nodeInterface, nodeField } = nodeDefinitions<Context>(
  async (globalId, { comments, replies, modules, users }) => {
    const { type, id } = fromGlobalId(globalId);
    switch (type) {
      case "Comment":
        return { ...(await comments.findOne({ _id: new ObjectId(id) })), type };
      case "Reply":
        return { ...(await replies.findOne({ _id: new ObjectId(id) })), type };
      case "Module":
        return { ...(await modules.findOne({ _id: new ObjectId(id) })), type };
      case "User":
        return {
          ...(globalId === "VXNlcjowMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDA="
            ? {
                _id: new ObjectId("000000000000000000000000"),
                email: "",
                password: "",
                username: "",
                default_technology_id: new ObjectId("1095f055f92be2001a15885a"),
              }
            : await users.findOne({ _id: new ObjectId(id) })),
          type,
        };
      default:
        return { type: "" };
    }
  },
  (obj: { type: string }) => obj.type
);

export const GraphQLUser = new GraphQLObjectType<UserRoot, Context>({
  name: "User",
  fields: {
    test: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (): string => "test1",
    },
    id: globalIdField("User", ({ _id }): string => _id.toHexString()),
    username: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ username }): string => username,
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ email }): string => email,
    },
    default_technology_gid: globalIdField(
      "Technology",
      ({ default_technology_id }): string => default_technology_id.toHexString()
    ),
    coursed: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(GraphQLCoursed))
      ),
      resolve: async (
        { _id: user_id },
        _args,
        { coursed }
      ): Promise<CoursedMongo[]> => {
        try {
          const results = await coursed.find({ user_id }).toArray();
          return results;
        } catch (e) {
          return [];
        }
      },
    },
    technologies: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(GraphQLTechnology))
      ),
      resolve: async (
        _root: unknown,
        _args: unknown,
        { technologies }: Context
      ): Promise<TechnologyMongo[]> => {
        try {
          const results = await technologies.find().toArray();
          return results;
        } catch (e) {
          return [];
        }
      },
    },
    module: {
      type: new GraphQLNonNull(GraphQLModule),
      args: {
        module_gid: { type: GraphQLID },
      },
      resolve: async (
        root,
        args,
        { modules }: Context
      ): Promise<ModuleMongo> => {
        try {
          const { module_gid } = args as { module_gid?: string };
          const { default_technology_id, coursed } = root;
          const module_id = module_gid
            ? new ObjectId(fromGlobalId(module_gid).id)
            : coursed.find(
                (course) =>
                  course.technology_id.toHexString() ===
                  default_technology_id.toHexString()
              )?.default_module_id;
          if (!module_id) {
            throw new Error("No module_gid found.");
          }
          const value = await modules.findOne({ _id: module_id });
          if (!value) throw new Error("No module found.");
          return value;
        } catch (e) {
          return {
            _id: new ObjectId("000000000000000000000001"),
            title: "Error",
            date: new Date(),
            description: "Error",
          };
        }
      },
    },
    playlist: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(GraphQLPlaylist))
      ),
      args: {
        technology_gid: { type: GraphQLID },
      },
      resolve: async (
        root,
        args: unknown,
        { playlists }: Context
      ): Promise<PlaylistMongo[]> => {
        try {
          const { technology_gid } = args as { technology_gid?: string };
          const { default_technology_id } = root;
          const technology_id = technology_gid
            ? new ObjectId(fromGlobalId(technology_gid).id)
            : default_technology_id;
          const results = await playlists.find({ technology_id }).toArray();
          return results.sort((a, b) => a.order - b.order);
        } catch (e) {
          return [];
        }
      },
    },
    coursing: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(GraphQLCoursing))
      ),
      args: {
        technology_gid: { type: GraphQLID },
      },
      resolve: async (
        root,
        args: unknown,
        { coursing }: Context
      ): Promise<CoursingMongo[]> => {
        try {
          const { technology_gid } = args as { technology_gid?: string };
          const { default_technology_id, _id } = root;
          const technology_id = technology_gid
            ? new ObjectId(fromGlobalId(technology_gid).id)
            : default_technology_id;
          const results = await coursing
            .find({
              technology_id,
              user_id: _id,
            })
            .toArray();
          return results;
        } catch (e) {
          return [];
        }
      },
    },
  },
  interfaces: [nodeInterface],
});
