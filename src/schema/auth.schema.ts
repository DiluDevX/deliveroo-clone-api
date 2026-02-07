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

export const userUpdateRequestBodySchema = z.object({
  firstName: userFirstNameSchema.optional(),
  lastName: usersLastNameSchema.optional(),
  email: usersEmailSchema.optional(),
  phone: usersPhoneSchema.optional(),
  password: usersCreatePasswordSchema.optional(),
  role: z.enum(["admin", "user"]).default("user").optional(),
  status: z.enum(["active", "inactive"]).default("active").optional(),
  restaurantID: z.string().optional(),
});

export const signUpRestaurantAdminRequestBodySchema = z.object({
  firstName: userFirstNameSchema,
  lastName: usersLastNameSchema,
  email: usersEmailSchema,
  password: usersCreatePasswordSchema,
  role: z.enum(["restaurant_admin"]),
});

export const forgotPasswordRequestBodySchema = z.object({
  email: usersEmailSchema,
});

export const resetPasswordRequestBodySchema = z.object({
  password: usersCreatePasswordSchema,
  token: z.string().min(10),
});

export const validateResetPasswordRequestBodySchema = z.object({
  token: z.string().min(10),
});

export const validateOAuthTokenRequestBodySchema = z.object({
  refreshToken: z.string().min(10),
});

export const validateRefreshTokenRequestBodySchema = z.object({
  refreshToken: z.string().min(10),
});
