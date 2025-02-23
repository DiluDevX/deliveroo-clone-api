import { z } from "zod";

export const userFirstNameSchema = z.string().min(3).max(20);
export const usersLastNameSchema = z.string().min(3).max(20);
export const usersEmailSchema = z.string().email();
export const usersPhoneSchema = z.string().min(10).max(10);
export const usersCheckPasswordSchema = z.string();
export const usersCreatePasswordSchema = z.string().min(8);

export const updateUserFullyRequestBodySchema = z.object({
  firstName: userFirstNameSchema,
  lastName: usersLastNameSchema,
  email: usersEmailSchema,
  phone: usersPhoneSchema,
  password: usersCreatePasswordSchema,
});

export const updateUserPartiallyRequestBodySchema = z.object({
  firstName: userFirstNameSchema.optional(),
  lastName: usersLastNameSchema.optional(),
  email: usersEmailSchema.optional(),
  phone: usersPhoneSchema.optional(),
  password: usersCreatePasswordSchema.optional(),
});
