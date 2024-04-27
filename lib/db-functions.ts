"use server";

import db from "./db";

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id: id } });

    return user;
  } catch {
    return null;
  }
};

export const getUserByUsername = async (username: string) => {
  try {
    const user = await db.user.findUnique({
      where: { username: username },
    });

    return user;
  } catch {
    return null;
  }
};
