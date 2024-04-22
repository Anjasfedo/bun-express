import { createPost, getPosts } from "@controller/post.controller";
import { validateRequest } from "@middlewares";
import { postSchema } from "@schemas";
import express from "express";

const postRouter = express.Router();

postRouter.route("/").get(getPosts).post(validateRequest(postSchema), createPost);

export default postRouter;
