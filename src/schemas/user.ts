import { z } from "zod";

export const userSchema = z.object({
  body: z.object({
    email: z.string().email(),
    name: z.string(),
  }),
});
