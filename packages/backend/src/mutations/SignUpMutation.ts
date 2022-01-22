import { mutationWithClientMutationId } from "graphql-relay";
import { GraphQLString, GraphQLNonNull } from "graphql";
import { ACCESSSECRET, REFRESHSECRET } from "../config";
import { Context } from "../types";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import { jwt } from "../utils";
import { addDays } from "date-fns";

interface Input {
  email: string;
  password: string;
  username: string;
}

type Payload = {
  accessToken: string;
  error: string;
};

export const SignUpMutation = mutationWithClientMutationId({
  name: "SignUp",
  description:
    "Registra un nuevo usuario y obtén un Refresh Token y un AccessToken.",
  inputFields: {
    password: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    username: { type: new GraphQLNonNull(GraphQLString) },
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
  },
  mutateAndGetPayload: async (
    { email, password, username }: Input,
    { users, res }: Context
  ): Promise<Payload> => {
    try {
      const user = await users.findOne({ $or: [{ email, username }] });
      if (user?.email === email)
        throw new Error("El email ya esta siendo usado.");
      if (user?.username === username)
        throw new Error("El username ya esta siendo usado.");
      const hash_password = await bcrypt.hash(password, 12);
      const result = await users.insertOne({
        email,
        password: hash_password,
        username,
        default_technology_id: new ObjectId("3095f055f92be2001a15885a"),
      });
      const refreshToken = jwt.sign(
        {
          _id: result.insertedId.toHexString(),
        },
        REFRESHSECRET,
        { expiresIn: "30 days" }
      );
      const accessToken = jwt.sign(
        {
          _id: result.insertedId.toHexString(),
        },
        ACCESSSECRET,
        { expiresIn: "15m" }
      );
      //const msg = {
      //  to: email,
      //  from: "soporte@amigoprogramador.com",
      //  subject: "Sending with Twilio SendGrid is Fun",
      //  text: "and easy to do anywhere, even with Node.js",
      //  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
      //};
      //sgMail.send(msg);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        expires: addDays(new Date(), 30),
      });
      return { accessToken, error: "" };
    } catch (e) {
      return {
        accessToken: "",
        error: e instanceof Error ? e.message : "",
      };
    }
  },
});
