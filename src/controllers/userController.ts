import { Context } from "koa";
import { CreateUserInput } from "../schemas/user.schema";
import logger from "../utils/logger";
import { prisma } from "../utils/dbClient";

const getAllUsers = async (ctx: Context) => {
  try {
    const users = await prisma.user.findMany();

    ctx.status = 200;
    ctx.body = {
      data: users,
      success: true,
      message: "Users fetched successfully",
    };
  } catch (error) {
    logger.error(`Error while fetching users: ${error}`);
    ctx.status = 500;
    ctx.body = {
      success: false,
      message: error?.message || "Internal Server Error",
    };
  }
};

const createUser = async (ctx: Context) => {
  try {
    const payload = ctx.request.body as CreateUserInput;

    await prisma.user.create({
      data: payload,
    });
    ctx.body = {
      message: "User created successfully",
      data: payload,
      success: false,
    };
    ctx.status = 201;
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
  try {
    const id = ctx.params.id;

    await prisma.user.delete({
      where: {
        id: id,
      },
    });

    ctx.status = 204;
    ctx.body = {
      success: true,
      message: "User deleted successfully",
      data: {},
    };
  } catch (error) {
    logger.error(`Error while deleting user: ${error}`);
    ctx.status = 500;
    ctx.body = {
      success: false,
      message: error?.message || "Internal Server Error",
    };
  }
};

const userController = {
  getAllUsers,
  createUser,
  deleteUser,
};

export default userController;
