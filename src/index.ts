import { validate } from "@middlewares/*";
import { userSchema } from "@schemas/user";
import DB from "@util/koneksi.server";
import express from "express";
import type { Request, Response } from "express";

const app = express();
const PORT = 8080;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.post(
  "/post",
  validate(userSchema),
  (req: Request, res: Response): Response => {
    return res.status(200).json(req.body);
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
