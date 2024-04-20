import { validate } from "@middlewares";
import { userSchema } from "@schemas/user";
import DB from "@util/koneksi.server";
import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import RedisStore from "connect-redis";
import redis from "redis";
import { promisify } from "util";
import session from "express-session";
import { ENV } from "@schemas/env";

const redisClient = redis.createClient({
  url: ENV.REDIS_URL,
});
redisClient.connect().catch(console.error);
// export const getAsync = promisify(client.get).bind(client);
// export const setAsync = promisify(client.set).bind(client);

const app = express();
const PORT = ENV.PORT;

app.use(cors());
app.use(express.json());
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: ENV.SESSION_SECRET,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 60,
    },
  })
);

app.get("/", async (req: Request, res: Response) => {
  req.session.user = 'fedo'

  const { user } = req.session;

  console.log(user);
  res.send("Hello World!");
});

app.get("/getSessionId", (req, res) => {
  res.send(req.sessionID);
});

app.post(
  "/post",
  validate(userSchema),
  (req: Request, res: Response): Response => {
    try {
      return res.status(200).json(req.body);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

const start = (): void => {
  try {
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}...`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
start();
