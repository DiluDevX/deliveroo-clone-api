import { z } from "zod";

const userFirstNameSchema = z.string().min(3).max(20);
const usersLastNameSchema = z.string().min(3).max(20);
const usersEmailSchema = z.string().email().min(3).max(50);
const usersPhoneSchema = z.string().min(10).max(10);
const usersPasswordSchema = z.string().min(8);

export const createUserRequestBodySchema = z.object({
  firstName: userFirstNameSchema.optional(),
  lastName: usersLastNameSchema.optional(),
  email: usersEmailSchema,
  phone: usersPhoneSchema.optional(),
  password: usersPasswordSchema,
});

export const updateUserFullyRequestBodySchema = z.object({
  firstName: userFirstNameSchema,
  lastName: usersLastNameSchema,
  email: usersEmailSchema,
  phone: usersPhoneSchema,
  password: usersPasswordSchema,
});

export const updateUserPartiallyRequestBodySchema = z.object({
  firstName: userFirstNameSchema.optional(),
  lastName: usersLastNameSchema.optional(),
  email: usersEmailSchema.optional(),
  phone: usersPhoneSchema.optional(),
  password: usersPasswordSchema.optional(),
});
