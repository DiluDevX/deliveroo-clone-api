import { z } from "zod";

export const userFirstNameSchema = z.string().min(3).max(20);
export const usersLastNameSchema = z.string().min(3).max(20);
export const usersEmailSchema = z.string().email();
export const usersPhoneSchema = z.string().min(10).max(10);
export const usersCheckPasswordSchema = z.string();
export const usersCreatePasswordSchema = z
  .string()
  .min(3, "Password must be at least 8 characters.")
  .max(20, "Password must be at most 20 characters.")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
    "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.",
  );

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

export const updateUserPartiallyRequestParamsSchema = z.object({
  userId: z.string().min(1),
});
