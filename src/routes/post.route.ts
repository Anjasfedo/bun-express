import { getPosts } from "@controller/post.controller";
import express from "express";

const postRouter = express.Router();

postRouter.route("/").get(getPosts);

export default postRouter;
