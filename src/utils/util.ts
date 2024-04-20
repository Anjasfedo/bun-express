import ENV from "@configs/env.config";
import jwt from "jsonwebtoken";
import type { Response } from "express";

export const generateAccessToken = (email: string) => {
  const payload = { email };

  return jwt.sign(payload, ENV.TOKEN_SECRET, { expiresIn: '60s' });
};

export const internalServerErrorResponse = (res: Response, error: unknown) => {
  console.error(error);
  return res.status(500).json("Internal Server Error");
}
