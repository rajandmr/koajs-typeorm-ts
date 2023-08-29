import { Context } from "koa";
import { createUserSchema } from "../schemas/user.schema";

const getAllUsers = async (ctx: Context) => {
  ctx.status = 200;
  ctx.body = {};
};

const createUser = async (ctx: Context) => {
  try {
    const payload = createUserSchema.parse(ctx.request);
    ctx.status = 201;
    ctx.body = payload;
  } catch (error) {
    (ctx.status = 500), (ctx.body = error.message);
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
