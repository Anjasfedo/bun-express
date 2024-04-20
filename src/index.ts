import { checkCache, validate } from "src/middlewares/middleware";
import DB from "@configs/koneksi.config";
import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import RedisStore from "connect-redis";
import session from "express-session";
import redisClient from "@configs/redis.config";
import ENV from "@configs/env.config";
import { userSchema } from "@schemas";
import authRouter from "@routes/auth.route";
import { internalServerErrorResponse } from "@util/util";

const STARWARSAPI = "https://swapi.dev/api/films/";
const PORT = ENV.PORT;

const app = express();

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
    return internalServerErrorResponse(res, error);
  }
});

app.post(
  "/post",
  validate(userSchema),
  (req: Request, res: Response): Response => {
    try {
      return res.status(200).json(req.body);
    } catch (error) {
      return internalServerErrorResponse(res, error);
    }
  }
);

app.use("/api/auth", authRouter);

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
