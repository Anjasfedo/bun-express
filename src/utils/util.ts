import ENV from "@configs/env.config";
import jwt from "jsonwebtoken";

export const generateAccessToken = (email: string) => {
  const payload = { email };

  return jwt.sign(payload, ENV.TOKEN_SECRET, { expiresIn: '60s' });
};
