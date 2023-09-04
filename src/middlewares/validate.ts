import { Context, Next } from "koa";
import { ZodError, z } from "zod";

export const validatePayload = (schema: z.Schema<any>) => {
  return async (ctx: Context, next: Next) => {
    try {
      const validatedData = schema.parse(ctx.request);
      ctx.state.validatedData = validatedData;
      await next();
    } catch (error) {
      if (error instanceof ZodError) {
        ctx.status = 400;
        ctx.body = { error: "Validation failed", details: error.issues };
      } else {
        ctx.status = 500;
        ctx.body = { error: "Internal server error" };
      }
    }
  };
};
