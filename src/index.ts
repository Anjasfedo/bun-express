import { checkCache, validate } from "@middlewares";
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

export const redisClient = redis.createClient({
  url: ENV.REDIS_URL,
});
redisClient.connect().catch(console.error);
// export const getAsync = promisify(client.get).bind(client);
// export const setAsync = promisify(client.set).bind(client);

const app = express();
const PORT = ENV.PORT;

const STARWARSAPI = "https://swapi.dev/api/films/";

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

app.get("/", checkCache, async (req: Request, res: Response) => {
  // req.session.user = "fedo";

  // const { user } = req.session;

  // console.log(user);
  // redisClient.setEx("key", 60, "hello");
  res.send("Hello World!");
});

app.get("/starwars/", checkCache, async (req: Request, res: Response) => {
  try {
    let search = req.params.search;

    const response = await fetch(STARWARSAPI);

    const data = await response.json();

    redisClient.setEx("key", 600, data);

    res.json(data);
  } catch (error) {
    res.status(500);
  }
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
