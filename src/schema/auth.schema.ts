import { z } from "zod";
import {
  userFirstNameSchema,
  usersCheckPasswordSchema,
  usersCreatePasswordSchema,
  usersEmailSchema,
  usersLastNameSchema,
  usersPhoneSchema,
} from "./users.schema";

export const checkEmailRequestBodySchema = z.object({
  email: usersEmailSchema,
});

export const loginRequestBodySchema = z.object({
  email: usersEmailSchema,
  password: usersCheckPasswordSchema,
});

export const signupRequestBodySchema = z.object({
  firstName: userFirstNameSchema,
  lastName: usersLastNameSchema,
  email: usersEmailSchema,
  phone: usersPhoneSchema.optional(),
  password: usersCreatePasswordSchema,
  role: z.enum(["admin", "user"]).default("user"),
});

export const forgotPasswordRequestBodySchema = z.object({
  userName: z.string().min(1),
});

export const resetPasswordRequestBodySchema = z.object({
  password: usersCreatePasswordSchema,
  token: z.string().min(1),
});

export const validateResetPasswordRequestBodySchema = z.string().min(10);
