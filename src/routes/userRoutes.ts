import * as Router from "koa-router";
import { user } from "../controllers";

const userRouter = new Router();

userRouter.get("/users", user.getAllUsers);
userRouter.post("/user", user.createUser);
userRouter.delete("/user/:id", user.deleteUser);

export default userRouter;
