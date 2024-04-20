import { z } from "zod";

export const userSchema = z.object({
  body: z.strictObject({
    email: z.string({ required_error: "Email is required" }).email("Invalid email"),
    name: z.string({ required_error: "Name is required" }),
  }),
});
