import { signUp } from "@controller/auth.controller";
import { validate } from "@middlewares";
import { userSchema } from "@schemas";
import express from "express";

const authRouter = express.Router();

authRouter.route("/signup").post(validate(userSchema), signUp);

export default authRouter;
