import jwt from "jsonwebtoken";
import express from "express";
import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generateAccessToken, internalServerErrorResponse } from "@util/util";
import { createUser, getUser } from "@services/auth.service";
import { Prisma } from "@prisma/client";

export const signUp = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  try {
    const hashPasword = await bcrypt.hash(password, 12);

    const user = await createUser(email, hashPasword, name);

    const token = generateAccessToken(email);

    res.status(201).json({
      user,
      token,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res
        .status(400)
        .json({ error: "Bad Request", message: error.message });
    }

    return internalServerErrorResponse(res, error);
  }
};

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await getUser(email);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { email: uEmail, name, password: uPassword } = user;

    const validPassword = await bcrypt.compare(password, uPassword);

    if (!validPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = generateAccessToken(email);

    res.status(200).json({
      user: { email: uEmail, name },
      token,
    });
  } catch (error) {
    return internalServerErrorResponse(res, error);
  }
};
