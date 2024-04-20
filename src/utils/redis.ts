import { ENV } from "@schemas/env";
import redis from "redis";

const redisClient = redis.createClient({
  url: ENV.REDIS_URL,
});

redisClient.connect().catch(console.error);

redisClient.on("connect", () => {
  console.log("Connected to Redis server");
});

redisClient.on("error", (error) => {
  console.error("Error connecting to Redis server:", error);
  process.exit(1); // Exit process if unable to connect to Redis
});

export default redisClient;
