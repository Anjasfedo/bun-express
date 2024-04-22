import { createPostService, postsService } from "@services/post.service";
import { internalServerErrorResponse } from "@util/util";
import type { Request, Response } from "express";

export const getPosts = async (req: Request, res: Response) => {
    try {
        const posts = await postsService()
        return res.status(200).json(posts)
    } catch (error) {
        console.error(error);
        return internalServerErrorResponse(res, error);
    }
}

export const createPost = async (req: Request, res: Response) => {
    try {
        const post = await createPostService(req.body)

        return res.status(201).json(post)
    } catch (error) {
        console.error(error);
        return internalServerErrorResponse(res, error);
    }
}