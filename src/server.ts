//* Server imports
import * as Koa from 'koa';
import * as Logger from 'koa-logger';
import * as BodyParser from 'koa-bodyparser';
//* Packages imports
import { DefaultState, DefaultContext } from 'koa';
import userRouter from './routes/userRoutes';
import { createConnection } from 'typeorm';

createConnection()
  .then(async (connection) => {
    const app: Koa<DefaultState, DefaultContext> = new Koa();

    //* Middlewares
    app.use(BodyParser());

    //* Routes Declaration
    app.use(userRouter.routes()).use(userRouter.allowedMethods());

    app.listen(3000);
  })
  .catch((error) => console.log('TypeORM connection error; ', error));
