//* Server imports
import * as Koa from "koa";
import * as BodyParser from "koa-bodyparser";
//* Packages imports
import { DefaultState, DefaultContext } from "koa";
import userRouter from "./routes/userRoutes";

const app: Koa<DefaultState, DefaultContext> = new Koa();

//* Middlewares
app.use(BodyParser());

app.use(async (ctx) => {
  ctx.body = "Hello World";
  ctx.status = 200;
});

//* Routes Declaration
app.use(userRouter.routes()).use(userRouter.allowedMethods());

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.on("error", (err) => {
  console.error("server error", err);
});
