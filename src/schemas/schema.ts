import z from "zod";

export const envSchema = z.object({
  DATABASE_URL: z.string(),
  PORT: z.coerce.number(),
  REDIS_URL: z.string(),
  SESSION_SECRET: z.string(),
  TOKEN_SECRET: z.string(),
  API_KEY: z.string(),
  AUTH_DOMAIN: z.string(),
  PROJECT_ID: z.string(),
  STORAGE_BUCKET: z.string(),
  MESSAGING_SENDER_ID: z.string(),
  APP_ID: z.string(),
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
