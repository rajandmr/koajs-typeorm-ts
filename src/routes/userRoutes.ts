import * as Router from 'koa-router';
import { user } from '../Controllers';

const userRouter = new Router();

userRouter.get('/', user.helloWorld);
userRouter.get('/users', user.getAllUsers);
userRouter.post('/user', user.createUser);
userRouter.delete('/user/:id', user.deleteUser);

export default userRouter;
