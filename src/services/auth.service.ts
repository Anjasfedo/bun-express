import DB from "@configs/koneksi.config";

import { PrismaClient, Prisma } from '@prisma/client'

export const createUser = async (
  email: string,
  password: string,
  name?: string
) => {
  try {
    const createdUser = await DB.user.create({
      data: {
        email,
        password,
        name,
      },
      select: {
        email: true,
        name: true,
      },
    });
  
    return createdUser;
  } catch (error) {
    throw error
  }
};
