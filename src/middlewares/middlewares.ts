import type { AnyZodObject } from "zod";
import type { Request, Response, NextFunction } from "express";
import { redisClient } from "src";

export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req);
      return next();
    } catch (error) {
      return res.status(400).json(error);
    }
  };

export const checkCache = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let search = req.params.search;

  const value = await redisClient.get("key");

  if (!value) {
    return next();
  }
  
  return res.json(JSON.parse(value));
};
