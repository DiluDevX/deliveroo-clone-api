import { z } from "zod";

const usersEmailSchema = z.string().email().min(3).max(50);
const usersPasswordSchema = z.string().min(8);

export const loginUserRequestBodySchema = z.object({
  email: usersEmailSchema,
  password: usersPasswordSchema,
});

export const authenticateUserRequestBodySchema = z.object({
  email: usersEmailSchema,
});
