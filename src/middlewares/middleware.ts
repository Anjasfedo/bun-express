import type { AnyZodObject } from "zod";
import type { Request, Response, NextFunction } from "express";
import redisClient from "@configs/redis.config";
import { internalServerErrorResponse } from "@util/util";

export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req);
      return next();
    } catch (error) {
      return res.status(400).json("Bad Request");
    }
  };

export const checkCache = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let search = req.params.search;

  try {
    const value = await redisClient.get("starwars");

    if (!value) {
      return next();
    }

    return res.json(JSON.parse(value));
  } catch (error) {
    return internalServerErrorResponse(res, error);
  }
};

export const protectAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    throw Error("hewroo")
  } catch (error) {
    return internalServerErrorResponse(res, error);
  }
};
