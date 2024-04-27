import { createPost, deletePostById, getPostById, getPosts, updatePostById } from "@controller/post.controller";
import { validateRequest } from "@middlewares";
import { postSchema } from "@schemas";
import express from "express";

const postRouter = express.Router();

postRouter
  .route("/")
  .get(getPosts)
  .post(validateRequest(postSchema), createPost);
postRouter.route("/:id").get(getPostById).put(validateRequest(postSchema), updatePostById).delete(deletePostById);

export default postRouter;
