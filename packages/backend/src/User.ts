import { ObjectId } from "bson";
import { GraphQLNonNull } from "graphql";
import { GraphQLUser } from "./Nodes";
import { Context, UserRoot } from "./types";

const QueryUser = {
  type: new GraphQLNonNull(GraphQLUser),
  resolve: async (
    _root: unknown,
    _args: unknown,
    { users, user_oid, coursed }: Context
  ): Promise<UserRoot> => {
    try {
      const user = await users.findOne({
        _id: user_oid,
      });
      if (!user) {
        throw new Error("El usuario no existe.");
      }
      const coursedlist = await coursed
        .find({
          user_id: user_oid,
        })
        .toArray();
      return {
        ...user,
        coursed: coursedlist,
      };
    } catch (e) {
      return {
        _id: new ObjectId("000000000000000000000000"),
        email: "",
        password: "",
        username: "",
        coursed: [
          {
            _id: new ObjectId("000000000000000000000003"),
            technology_id: new ObjectId("1095f055f92be2001a15885a"),
            total: 0,
            default_module_id: new ObjectId("3095f055f92be2001a15885a"),
            user_id: new ObjectId("7095f055f92be2001a15885a"),
          },
        ],
        default_technology_id: new ObjectId("1095f055f92be2001a15885a"),
      };
    }
  },
};

export { QueryUser };
