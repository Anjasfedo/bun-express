import jwt from "jsonwebtoken";
import express from "express";
import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generateAccessToken } from "@util/util";

export const signUp = async(req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        // const hashPasword = await bcrypt.hash(password, 12)
        
        const token = generateAccessToken(email)

        res.json(token)
    } catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }


    return res.status(201).json("hewroo")
}
