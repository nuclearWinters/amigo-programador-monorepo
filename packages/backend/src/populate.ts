import { MongoClient, ObjectId } from "mongodb";
import {
  CommentMongo,
  CoursedMongo,
  CoursingMongo,
  LikeMongo,
  ModuleMongo,
  PlaylistMongo,
  ReplyMongo,
  TechnologyMongo,
  UserMongo,
} from "./types";

MongoClient.connect("mongodb://mongo-courses:27017").then(async (client) => {
  const db = client.db("courses");
  const users = db.collection<UserMongo>("users");
  const technologies = db.collection<TechnologyMongo>("technologies");
  const comments = db.collection<CommentMongo>("comments");
  const replies = db.collection<ReplyMongo>("replies");
  const playlists = db.collection<PlaylistMongo>("playlist");
  const modules = db.collection<ModuleMongo>("module");
  const coursing = db.collection<CoursingMongo>("coursing");
  const likes = db.collection<LikeMongo>("likes");
  const coursed = db.collection<CoursedMongo>("coursed");
  await coursed.deleteMany({});
  await coursed.insertOne({
    _id: new ObjectId("9095f055f92be2001a15885a"),
    technology_id: new ObjectId("1095f055f92be2001a15885a"),
    total: 0,
    default_module_id: new ObjectId("3095f055f92be2001a15885a"),
    user_id: new ObjectId("7095f055f92be2001a15885a"),
  });
  await users.deleteMany({});
  await users.insertOne({
    _id: new ObjectId("7095f055f92be2001a15885a"),
    email: "anrp1@gmail.com",
    password: "$2a$12$O4JHSerceMnKfKl1ZB7M6.C9VZ/3osnasNzZmTgk81ursNf0Mc.dW",
    username: "nuclearWinters",
    default_technology_id: new ObjectId("1095f055f92be2001a15885a"),
  });
  await technologies.deleteMany({});
  await technologies.insertMany([
    {
      _id: new ObjectId("1095f055f92be2001a15885a"),
      title: "Quick Start",
      total: 1,
      order: 0,
      default_module_id: new ObjectId("3095f055f92be2001a15885a"),
    },
    {
      _id: new ObjectId("1095f055f92be2001a15885b"),
      title: "HTML",
      total: 1,
      order: 1,
      default_module_id: new ObjectId("3095f055f92be2001a15885b"),
    },
    {
      _id: new ObjectId("1095f055f92be2001a15885c"),
      title: "CSS",
      total: 1,
      order: 2,
      default_module_id: new ObjectId("3095f055f92be2001a15885c"),
    },
    {
      _id: new ObjectId("1095f055f92be2001a15885d"),
      title: "Javascript",
      total: 1,
      order: 3,
      default_module_id: new ObjectId("3095f055f92be2001a15885d"),
    },
    {
      _id: new ObjectId("1095f055f92be2001a15885e"),
      title: "React",
      total: 1,
      order: 4,
      default_module_id: new ObjectId("3095f055f92be2001a15885e"),
    },
  ]);
  await playlists.deleteMany({});
  await playlists.insertMany([
    {
      title: "Primer 1 video Quick Start",
      thumbnail: "",
      duration: "",
      order: 0,
      technology_id: new ObjectId("1095f055f92be2001a15885a"),
      module_id: new ObjectId("3095f055f92be2001a15885a"),
    },
    {
      title: "Segundo 2 video Quick Start",
      thumbnail: "",
      duration: "",
      order: 1,
      technology_id: new ObjectId("1095f055f92be2001a15885a"),
      module_id: new ObjectId("4095f055f92be2001a15885a"),
    },
    {
      title: "Primer 1 video HTML",
      thumbnail: "",
      duration: "",
      order: 0,
      technology_id: new ObjectId("1095f055f92be2001a15885b"),
      module_id: new ObjectId("3095f055f92be2001a15885b"),
    },
    {
      title: "Segundo 2 video HTML",
      thumbnail: "",
      duration: "",
      order: 1,
      technology_id: new ObjectId("1095f055f92be2001a15885b"),
      module_id: new ObjectId("4095f055f92be2001a15885b"),
    },
    {
      title: "Primer 1 video CSS",
      thumbnail: "",
      duration: "",
      order: 0,
      technology_id: new ObjectId("1095f055f92be2001a15885c"),
      module_id: new ObjectId("3095f055f92be2001a15885c"),
    },
    {
      title: "Segundo 2 video CSS",
      thumbnail: "",
      duration: "",
      order: 1,
      technology_id: new ObjectId("1095f055f92be2001a15885c"),
      module_id: new ObjectId("4095f055f92be2001a15885c"),
    },
    {
      title: "Primer 1 video Javascript",
      thumbnail: "",
      duration: "",
      order: 0,
      technology_id: new ObjectId("1095f055f92be2001a15885d"),
      module_id: new ObjectId("3095f055f92be2001a15885d"),
    },
    {
      title: "Segundo 2 video Javascript",
      thumbnail: "",
      duration: "",
      order: 1,
      technology_id: new ObjectId("1095f055f92be2001a15885d"),
      module_id: new ObjectId("4095f055f92be2001a15885d"),
    },
    {
      title: "Primer 1 video React",
      thumbnail: "",
      duration: "",
      order: 0,
      technology_id: new ObjectId("1095f055f92be2001a15885e"),
      module_id: new ObjectId("3095f055f92be2001a15885e"),
    },
    {
      title: "Segundo 2 video React",
      thumbnail: "",
      duration: "",
      order: 1,
      technology_id: new ObjectId("1095f055f92be2001a15885e"),
      module_id: new ObjectId("4095f055f92be2001a15885e"),
    },
  ]);
  await comments.deleteMany({});
  await comments.insertMany([
    {
      _id: new ObjectId("2095f055f92be2001a15885a"),
      module_id: new ObjectId("3095f055f92be2001a15885a"),
      likes: 1,
      text: "Primer comentario",
      user_id: new ObjectId("7095f055f92be2001a15885a"),
      user_username: "nuclearWinters",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      _id: new ObjectId("2095f055f92be2001a15885b"),
      module_id: new ObjectId("3095f055f92be2001a15885a"),
      likes: 0,
      text: "Segundo comentario",
      user_id: new ObjectId("7095f055f92be2001a15885a"),
      user_username: "nuclearWinters",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
  await replies.deleteMany({});
  await replies.insertMany([
    {
      comment_id: new ObjectId("2095f055f92be2001a15885a"),
      likes: 1,
      text: "Primer repliy",
      user_id: new ObjectId("7095f055f92be2001a15885a"),
      user_username: "nuclearWinters",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
  await likes.deleteMany({});
  await likes.insertMany([
    {
      comment_id: new ObjectId("2095f055f92be2001a15885a"),
      user_id: new ObjectId("7095f055f92be2001a15885a"),
      status: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
  await modules.deleteMany({});
  await modules.insertMany([
    {
      _id: new ObjectId("3095f055f92be2001a15885a"),
      title: "Primer 1 video quick start",
      date: new Date(),
      description: "Descripción primer video Quick Start",
    },
    {
      _id: new ObjectId("4095f055f92be2001a15885a"),
      title: "Segundo 2 video quick start",
      date: new Date(),
      description: "Descripción segundo video Quick Start",
    },
    {
      _id: new ObjectId("3095f055f92be2001a15885b"),
      title: "Primer 1 video HTML",
      date: new Date(),
      description: "Descripción primer video HTML",
    },
    {
      _id: new ObjectId("4095f055f92be2001a15885b"),
      title: "Segundo 2 video HTML",
      date: new Date(),
      description: "Descripción segundo video HTML",
    },
    {
      _id: new ObjectId("3095f055f92be2001a15885c"),
      title: "Primer 1 video CSS",
      date: new Date(),
      description: "Descripción primer video CSS",
    },
    {
      _id: new ObjectId("4095f055f92be2001a15885c"),
      title: "Segundo 2 video CSS",
      date: new Date(),
      description: "Descripción segundo video CSS",
    },
    {
      _id: new ObjectId("3095f055f92be2001a15885d"),
      title: "Primer 1 video Javascript",
      date: new Date(),
      description: "Descripción primer video Javascript",
    },
    {
      _id: new ObjectId("4095f055f92be2001a15885d"),
      title: "Segundo 2 video Javascript",
      date: new Date(),
      description: "Descripción segundo video Javascript",
    },
    {
      _id: new ObjectId("3095f055f92be2001a15885e"),
      title: "Primer 1 video React",
      date: new Date(),
      description: "Descripción primer video React",
    },
    {
      _id: new ObjectId("4095f055f92be2001a15885e"),
      title: "Segundo 2 video React",
      date: new Date(),
      description: "Descripción segundo video React",
    },
  ]);
  await coursing.deleteMany({});
  await coursing.insertMany([
    {
      user_id: new ObjectId("7095f055f92be2001a15885a"),
      module_id: new ObjectId("3095f055f92be2001a15885a"),
      progress: "",
      completed: false,
      technology_id: new ObjectId("1095f055f92be2001a15885a"),
    },
  ]);
  process.exit();
});
