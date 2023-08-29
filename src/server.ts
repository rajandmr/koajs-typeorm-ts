import * as Koa from "koa";
import * as BodyParser from "koa-bodyparser";
import { DefaultState, DefaultContext } from "koa";
import userRouter from "./routes/userRoutes";
import logger from "./utils/logger";

const app: Koa<DefaultState, DefaultContext> = new Koa();

app.use(BodyParser());

app.use(userRouter.routes()).use(userRouter.allowedMethods());

app.use(async (ctx) => {
  ctx.status = 200;
  ctx.body = {
    message: "OK",
  };
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});

app.on("error", (err) => {
  logger.error("server error", err);
});
