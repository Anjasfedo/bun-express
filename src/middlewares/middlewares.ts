import type { AnyZodObject, z } from "zod";
import { ZodError } from "zod";
import type { Response, Request } from "express";

export const validate = async <T extends AnyZodObject>(
  schema: T,
  req: Request
): Promise<z.infer<T>> => {
  try {
    return await schema.parseAsync(req);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error(error.message);
    }
    throw new Error(JSON.stringify(error));
  }
};
