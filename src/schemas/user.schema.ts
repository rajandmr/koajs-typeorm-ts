import { z, object, string } from "zod";

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "name is required",
    }),
    email: string({
      required_error: "Email is required",
    }).email(),
  }),
});

export const verifyUserSchema = object({
  params: object({
    id: string(),
    verificationCode: string(),
  }),
});

export const deleteUserSchema = object({
  params: object({
    id: string(),
  }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>["body"];
export type VerifyUserInput = z.infer<typeof verifyUserSchema>["params"];
export type DeleteUserInput = z.infer<typeof deleteUserSchema>["params"];
