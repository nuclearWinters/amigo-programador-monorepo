import { app } from "./app";
import { MongoClient } from "mongodb";
import { MONGO_DB } from "./config";
import { createClient } from "redis";
import { REDIS } from "./config";

MongoClient.connect(MONGO_DB).then(async (client) => {
  const redisClient = createClient({
    url: REDIS,
  });
  await client.connect();
  const db = client.db("courses");
  app.locals.db = db;
  await redisClient.connect();
  app.locals.rdb = redisClient;
  app.listen(process.env.PORT || 4000);
});
