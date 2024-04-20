import z from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string(),
  PORT: z.coerce.number(),
  REDIS_URL: z.string(),
  SESSION_SECRET: z.string(),
});

export const ENV = envSchema.parse(process.env)
