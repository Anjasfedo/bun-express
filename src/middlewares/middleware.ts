import type { AnyZodObject } from "zod";
import type { Request, Response, NextFunction } from "express";
import redisClient from "@configs/redis.config";
import { internalServerErrorResponse } from "@util/util";
import jwt from "jsonwebtoken";
import type { VerifyErrors } from "jsonwebtoken";
import ENV from "@configs/env.config";

declare global {
  namespace Express {
    interface Request {
      payload?: any; // Define the payload property on Request
    }
  }
}

export const validateRequest =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req);
      return next();
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  };

export const checkCache = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
      const token = bearerHeader.split(" ")[1];
      if (!token) return res.status(401).json({ message: "Token required" });

      jwt.verify(
        token,
        ENV.TOKEN_SECRET,
        (error: VerifyErrors | null, payload: any) => {
          if (error)
            return res
              .status(403)
              .json({ message: "Invalid or expired token" });

          req.payload = payload; // Attach the payload to the request object
          return next();
        }
      );
    }
  } catch (error) {
    return internalServerErrorResponse(res, error);
  }
};
