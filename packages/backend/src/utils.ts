import { Db } from "mongodb";
import {
  UserMongo,
  Context,
  TechnologyMongo,
  CommentMongo,
  ReplyMongo,
  PlaylistMongo,
  ModuleMongo,
  CoursingMongo,
  LikeMongo,
  CoursedMongo,
} from "./types";
import { ACCESSSECRET, REFRESHSECRET } from "./config";
import jsonwebtoken, { SignOptions } from "jsonwebtoken";
import { DecodeJWT } from "./types";
import { GraphQLScalarType, Kind } from "graphql";
import { CookieOptions } from "express";
import { ObjectId } from "bson";
import { createClient } from "redis";

type RedisClientType = ReturnType<typeof createClient>;

export const jwt = {
  decode: (token: string): string | DecodeJWT | null => {
    const decoded = jsonwebtoken.decode(token);
    return decoded as string | DecodeJWT | null;
  },
  verify: (token: string, password: string): DecodeJWT | undefined => {
    const decoded = jsonwebtoken.verify(token, password);
    return decoded as DecodeJWT | undefined;
  },
  sign: (
    data: {
      _id: string;
    },
    secret: string,
    options: SignOptions
  ): string => {
    const token = jsonwebtoken.sign(data, secret, options);
    return token;
  },
};

export const refreshTokenMiddleware = (
  accessToken: string | undefined = "",
  refreshToken: string | undefined
): { validAccessToken: string | undefined; user_oid: ObjectId | undefined } => {
  try {
    if (refreshToken === undefined) {
      throw new Error("No data");
    }
    try {
      const user = jwt.verify(accessToken, ACCESSSECRET);
      if (!user) throw new Error("El token esta corrompido.");
      return {
        validAccessToken: accessToken,
        user_oid: new ObjectId(user._id),
      };
    } catch (e) {
      if (
        e instanceof Error &&
        (e.message === "jwt expired" || e.message === "jwt must be provided")
      ) {
        const user = jwt.verify(refreshToken, REFRESHSECRET);
        if (!user) throw new Error("El token esta corrompido.");
        const validAccessToken = jwt.sign({ _id: user._id }, ACCESSSECRET, {
          expiresIn: "15m",
        });
        return {
          validAccessToken,
          user_oid: new ObjectId(user._id),
        };
      }
      throw e;
    }
  } catch (e) {
    return {
      validAccessToken: undefined,
      user_oid: undefined,
    };
  }
};

export const getContext = (req: unknown, res: unknown): Context => {
  const {
    app: {
      locals: { db, rdb },
    },
    headers,
    cookies: { refreshToken },
  } = req as {
    app: {
      locals: {
        db: Db;
        rdb: RedisClientType;
      };
    };
    headers: { authorization?: string };
    cookies: {
      refreshToken?: string;
    };
  };
  const accessToken = headers.authorization;
  const { user_oid, validAccessToken } = refreshTokenMiddleware(
    accessToken,
    refreshToken
  );
  return {
    users: db.collection<UserMongo>("users"),
    technologies: db.collection<TechnologyMongo>("technologies"),
    comments: db.collection<CommentMongo>("comments"),
    replies: db.collection<ReplyMongo>("replies"),
    playlists: db.collection<PlaylistMongo>("playlist"),
    modules: db.collection<ModuleMongo>("module"),
    coursing: db.collection<CoursingMongo>("coursing"),
    likes: db.collection<LikeMongo>("likes"),
    coursed: db.collection<CoursedMongo>("coursed"),
    rdb,
    user_oid,
    validAccessToken,
    res: res as {
      cookie: (name: string, val: string, options: CookieOptions) => void;
      clearCookie: (name: string) => void;
    },
  };
};

export const DateScalarType = new GraphQLScalarType({
  name: "Date",
  serialize: (value) => {
    return (value as Date).getTime();
  },
  parseValue: (value) => {
    return new Date(value as number);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10));
    }
    return null;
  },
});

export const base64 = (i: string): string => {
  return Buffer.from("arrayconnection:" + i, "utf8").toString("base64");
};

export const unbase64 = (i: string): string => {
  return Buffer.from(i, "base64").toString("utf8").split(":")[1];
};

export const base64Name = (i: string, name: string): string => {
  return Buffer.from(name + ":" + i, "utf8").toString("base64");
};
