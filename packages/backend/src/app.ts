import express from "express";
import { graphqlHTTP } from "express-graphql";
import { GraphQLSchema, GraphQLObjectType } from "graphql";
import cors from "cors";
import { SignUpMutation } from "./mutations/SignUpMutation";
import { SignInMutation } from "./mutations/SignInMutation";
//import { BlacklistUserMutation } from "./mutations/BlacklistUserMutation";
import { getContext } from "./utils";
import { QueryUser } from "./User";
import { nodeField } from "./Nodes";
import cookieParser from "cookie-parser";
import { AddCommentMutation } from "./mutations/AddComment";
import { AddReplyMutation } from "./mutations/AddReply";
import { UpdateDefaultModuleMutation } from "./mutations/UpdateDefaultModule";
import { UpdateDefaultTechnologyMutation } from "./mutations/UpdateDefaultTechnology";
import { LogOutMutation } from "./mutations/LogOutMutation";
//import { UpdateUserMutation } from "./mutations/UpdateUser";

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    signUp: SignUpMutation,
    signIn: SignInMutation,
    //blacklistUser: BlacklistUserMutation,
    //updateUser: UpdateUserMutation,
    addComment: AddCommentMutation,
    addReply: AddReplyMutation,
    updateDefaultModule: UpdateDefaultModuleMutation,
    updateDefaultTechnology: UpdateDefaultTechnologyMutation,
    logOut: LogOutMutation,
  },
});

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    user: QueryUser,
    node: nodeField,
  },
});

const schema = new GraphQLSchema({
  mutation: Mutation,
  query: Query,
});

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000", "http://0.0.0.0:3000"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Server running!");
});

app.use(
  "/graphql",
  graphqlHTTP((req, res) => {
    return {
      schema: schema,
      graphiql: true,
      context: getContext(req, res),
    };
  })
);

export { app };
