import * as Router from "koa-router";
import { user } from "../controllers";
import { validatePayload } from "../middlewares/validate";
import { createUserSchema, deleteUserSchema } from "../schemas/user.schema";

const userRouter = new Router();

userRouter.get("/users", user.getAllUsers);
userRouter.post("/user", validatePayload(createUserSchema), user.createUser);
userRouter.delete(
  "/user/:id",
  validatePayload(deleteUserSchema),
  user.deleteUser
);

export default userRouter;
