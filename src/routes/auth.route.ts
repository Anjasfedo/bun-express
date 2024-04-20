import { signUp } from "@controller/auth.controller";
import { protectAccess, validate } from "@middlewares";
import { userSchema } from "@schemas";
import express from "express";

const authRouter = express.Router();

authRouter.route("/signup").post(validate(userSchema), protectAccess, signUp);

export default authRouter;
