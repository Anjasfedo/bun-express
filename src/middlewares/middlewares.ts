import type { AnyZodObject } from "zod";
import type { Request, Response, NextFunction } from "express";

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
