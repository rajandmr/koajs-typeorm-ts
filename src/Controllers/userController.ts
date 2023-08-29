import Validate from "../validations/UserSchema";
import { Context } from "koa";

const getAllUsers = async (ctx: Context) => {
  ctx.status = 200;
  ctx.body = {};
};

const createUser = async (ctx: Context) => {
  const request = ctx.request.body;
  const valid = Validate(request);

  if (valid !== true) {
    ctx.status = 422;
    ctx.body = valid;
    return;
  }
  try {
    ctx.status = 201;
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
