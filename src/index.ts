import { userSchema } from "@schemas/user";
import DB from "@util/koneksi.server";
import express from "express";
import type { Request, Response, NextFunction } from "express";
import type { AnyZodObject } from "zod";

const app = express();
const PORT = 8080;

const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (error) {
      return res.status(400).json(error);
    }
  };

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.post("/post", (req: Request, res: Response): Response => {
  const user = req.body;

  console.log(user);

  const result = userSchema.safeParse(user);

  if (!result.success) {
    return res.status(404).json(result.error);
  }

  return res.status(200).json(result.data);
});

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
