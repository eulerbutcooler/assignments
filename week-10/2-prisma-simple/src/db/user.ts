import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function createUser(
  username: string,
  password: string,
  name: string
) {
  try {
    const res = await prisma.user.create({
      data: {
        username: username,
        password: password,
        name: name,
      },
    });
    return res;
  } catch (error) {
    console.error("Error creating user: ", error);
    throw error;
  }
}

/*
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function getUser(userId: number) {
  try {
    const res = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    return res;
  } catch (error) {
    console.error("Error finding the user: ", error);
    throw error;
  }
}
