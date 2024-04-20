import { checkCache, validate } from "@middlewares";
import { userSchema } from "@schemas/user";
import DB from "@util/koneksi.server";
import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import RedisStore from "connect-redis";
import session from "express-session";
import { ENV } from "@schemas/env";
import redisClient from "@util/redis";



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
  res.send("Hello World!");
});

app.get("/starwars/", checkCache, async (req: Request, res: Response) => {
  try {
    const response = await fetch(STARWARSAPI);

    const data = await response.json();

    redisClient.setEx("starwars", 600, JSON.stringify(data));

    res.json(data);
  } catch (error) {
    console.error(error)
    res.status(500).json("Internal server error");
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
      console.error(error)
      return res.status(500).json("Internal server error");
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
