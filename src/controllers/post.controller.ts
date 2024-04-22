import { postsService } from "@services/post.service";
import type { Request, Response } from "express";

export const getPosts = async (req: Request, res: Response) => {
    try {
        const posts = await postsService()
        return res.status(200).json(posts)
    } catch (error) {
        return res.status(500).json(error)
    }
}