import { CookieOptions } from "express";
import { ObjectId, Collection } from "mongodb";
import { RedisClientType } from "@node-redis/client/dist/lib/client";

export interface Context {
  users: Collection<UserMongo>;
  technologies: Collection<TechnologyMongo>;
  playlists: Collection<PlaylistMongo>;
  modules: Collection<ModuleMongo>;
  coursing: Collection<CoursingMongo>;
  comments: Collection<CommentMongo>;
  replies: Collection<ReplyMongo>;
  likes: Collection<LikeMongo>;
  coursed: Collection<CoursedMongo>;
  rdb: RedisClientType;
  user_oid?: ObjectId;
  validAccessToken?: string;
  res: {
    cookie: (name: string, val: string, options: CookieOptions) => void;
    clearCookie: (name: string) => void;
  };
}

export interface CoursedMongo {
  _id?: ObjectId;
  technology_id: ObjectId;
  total: number;
  default_module_id: ObjectId;
  user_id: ObjectId;
}

export interface CoursedInput {
  id: string;
  technology_gid: string;
  total: number;
  default_module_gid: string;
  user_gid: string;
}

export interface UserMongo {
  _id?: ObjectId;
  email: string;
  password: string;
  username: string;
  default_technology_id: ObjectId;
}

export type UserRoot = UserMongo & {
  coursed: CoursedMongo[];
};

export interface TechnologyMongo {
  _id?: ObjectId;
  title: string;
  total: number;
  order: number;
  default_module_id: ObjectId;
}

export interface PlaylistMongo {
  _id?: ObjectId;
  title: string;
  thumbnail: string;
  duration: string;
  order: number;
  technology_id: ObjectId;
  module_id: ObjectId;
}

export interface ModuleMongo {
  _id?: ObjectId;
  title: string;
  date: Date;
  description: string;
}

export interface CoursingMongo {
  _id?: ObjectId;
  user_id: ObjectId;
  module_id: ObjectId;
  progress: string;
  completed: boolean;
  technology_id: ObjectId;
}

export interface CommentMongo {
  _id?: ObjectId;
  module_id: ObjectId;
  likes: number;
  text: string;
  user_id: ObjectId;
  user_username: string; //if user updates username then what?
  created_at: Date;
  updated_at: Date;
}

export interface ReplyMongo {
  _id?: ObjectId;
  comment_id: ObjectId;
  likes: number;
  text: string;
  user_id: ObjectId;
  user_username: string; //if user updates username then what?
  created_at: Date;
  updated_at: Date;
}

export interface LikeMongo {
  _id?: ObjectId;
  comment_id: ObjectId;
  user_id: ObjectId;
  status: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface DecodeJWT {
  _id: string;
}
