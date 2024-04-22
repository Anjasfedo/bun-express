import { signIn, signUp } from "@controller/auth.controller";
import { validateRequest } from "@middlewares";
import { userSchema } from "@schemas";
import express from "express";

const authRouter = express.Router();

authRouter.route("/signup").post(validateRequest(userSchema), signUp);
authRouter.route("/signin").post(validateRequest(userSchema), signIn);

export default authRouter;
