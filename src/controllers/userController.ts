import { Context } from "koa";
import { createUserSchema } from "../schemas/user.schema";
import logger from "../utils/logger";
import { prisma } from "../utils/dbClient";
const getAllUsers = async (ctx: Context) => {
  ctx.status = 200;

  const users = await prisma.user.findMany();

  ctx.body = {
    users: users,
  };
};

const createUser = async (ctx: Context) => {
  try {
    const payload = createUserSchema.parse(ctx.request).body;

    await prisma.user.create({
      data: payload,
    });
    ctx.status = 201;
    ctx.body = payload;
  } catch (error) {
    logger.error(`Error while creating user: ${error}`);
    ctx.status = 500;
    ctx.body = {
      success: false,
      message: error?.message || "Internal Server Error",
    };
  }
};

const deleteUser = async (ctx: Context) => {
  const id = ctx.params.id;
  ctx.status = 204;
};

const userController = {
  getAllUsers,
  createUser,
  deleteUser,
};

export default userController;
