import { password } from "bun";
import z from "zod";

export const envSchema = z.object({
  DATABASE_URL: z.string(),
  PORT: z.coerce.number(),
  REDIS_URL: z.string(),
  SESSION_SECRET: z.string(),
  TOKEN_SECRET: z.string(),
});

export const userSchema = z.object({
  body: z.strictObject({
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email"),
    name: z.string().optional(),
    password: z.string({ required_error: "Password is required" }),
  }),
});
