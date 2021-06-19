import Validate from '../validations/UserSchema';
import { BaseContext, Context } from 'koa';
import { getManager, getRepository, Repository } from 'typeorm';
import { User } from '../entities/User';
import { UserInterface } from '../validations/UserSchema';

// export default class UserController {
//   public static async helloWorld(ctx: BaseContext): Promise<void> {
//     ctx.body = 'Hello World from another file';
//   }

//   public static async getAllUsers(context: Context) {
//     const userRepository = getManager().getRepository(User);
//     const users: User[] = await userRepository.find();
//     context.status = 200;
//     context.body = users;
//   }

//   public static async createUser(ctx: Context) {
//     const userRepository: Repository<User> = getManager().getRepository(User);

//     const userDoc: User = new User();
//     userDoc.name = ctx.request.body.name;
//     const user = await userRepository.save(userDoc);
//     ctx.status = 201;
//     ctx.body = user;
//   }
// }

const helloWorld = async (ctx: BaseContext): Promise<void> => {
  ctx.body = 'Hello World from another file';
};

const getAllUsers = async (ctx: Context) => {
  const userRepository: Repository<User> = getRepository(User);
  const users: User[] = await userRepository.find();
  ctx.status = 200;
  ctx.body = users;
};

const createUser = async (ctx: Context) => {
  const userRepository: Repository<User> = getRepository(User);
  const request: UserInterface = ctx.request.body;
  const valid = Validate(request);

  if (valid !== true) {
    ctx.status = 422;
    ctx.body = valid;
    return;
  }
  try {
    const user = await userRepository.save(request);
    ctx.status = 201;
    ctx.body = user;
  } catch (error) {
    (ctx.status = 500), (ctx.body = error.message);
  }
};

const deleteUser = async (ctx: Context) => {
  const userRepository: Repository<User> = getRepository(User);
  const id = ctx.params.id;
  await userRepository.delete({ id });
  ctx.status = 204;
};

const userController = {
  helloWorld,
  getAllUsers,
  createUser,
  deleteUser,
};

export default userController;
