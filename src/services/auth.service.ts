import DB from "@configs/koneksi.config";

export const createUser = async (
  email: string,
  password: string,
  name?: string
) => {
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
};

export const getUser = async (email: string) => {
    const user = await DB.user.findUnique({
      where: {
        email,
      },
      select: {
        email: true,
        name: true,
        password: true,
      },
    });

    return user;
};
