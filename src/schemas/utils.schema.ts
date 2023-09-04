import { z } from "zod";

//* If success is true, it should contain data and message, else only message
const ResponseSchema = z.discriminatedUnion("status", [
  z.object({
    status: z.literal("success"),
    data: z.any(),
    message: z.string(),
  }),
  z.object({
    status: z.literal("error"),
    message: z.string(),
  }),
]);

export type Response = z.infer<typeof ResponseSchema>;
