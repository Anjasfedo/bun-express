import {
  createPostService,
  deletePostByIdService,
  getPostByIdService,
  getPostsService,
  updatePostByIdService,
} from "@services/post.service";
import { internalServerErrorResponse } from "@util/util";
import type { Request, Response } from "express";

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await getPostsService();
    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    return internalServerErrorResponse(res, error);
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await getPostByIdService(req.params.id);

    return res.status(200).json(post);
  } catch (error) {
    console.error(error);
    return internalServerErrorResponse(res, error);
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const post = await createPostService(req.body);

    return res.status(201).json(post);
  } catch (error) {
    console.error(error);
    return internalServerErrorResponse(res, error);
  }
};

export const updatePostById = async (req: Request, res: Response) => {
  try {
    const post = await updatePostByIdService(req.body, req.params.id);

    return res.status(200).json(post);
  } catch (error) {
    console.error(error);
    return internalServerErrorResponse(res, error);
  }
};

export const deletePostById = async (req: Request, res: Response) => {
  try {
    await deletePostByIdService(req.params.id);

    return res.status(204).end();
  } catch (error) {
    console.error(error);
    return internalServerErrorResponse(res, error);
  }
};
