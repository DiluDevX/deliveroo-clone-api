import { z } from "zod";

export const userFirstNameSchema = z
  .string()
  .min(1, "First name is required")
  .max(50, "First name must be at most 50 characters");

export const usersLastNameSchema = z
  .string()
  .min(1, "Last name is required")
  .max(50, "Last name must be at most 50 characters");

export const usersEmailSchema = z
  .string()
  .email("Invalid email format")
  .min(1, "Email is required");

export const usersPhoneSchema = z.string().optional();

export const usersCheckPasswordSchema = z.string();

export const usersCreatePasswordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password must be at most 128 characters")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
  );

export const userRoleSchema = z
  .enum(["user", "platform_admin", "restaurant_user"])
  .default("user");

export const createUserRequestBodySchema = z.object({
  firstName: userFirstNameSchema,
  lastName: usersLastNameSchema,
  email: usersEmailSchema,
  phone: usersPhoneSchema,
  password: usersCreatePasswordSchema,
  role: userRoleSchema,
});

export const userUpdatePartiallyRequestBodySchema = z.object({
  firstName: userFirstNameSchema.optional(),
  lastName: usersLastNameSchema.optional(),
  email: usersEmailSchema.optional(),
  phone: usersPhoneSchema,
  password: usersCreatePasswordSchema.optional(),
  role: z
    .enum(["user", "platform_admin", "restaurant_user"])
    .default("user")
    .optional(),
});

export const userUpdatePartiallyRequestParamsSchema = z.object({
  id: z.string().min(1, "User ID is required"),
});

export const deleteUserRequestParamsSchema = z.object({
  id: z.string().min(1, "User ID is required"),
});

export const getUserRequestParamsSchema = z.object({
  id: z.string().min(1, "User ID is required"),
});

export type UserUpdatePartiallyInput = z.infer<
  typeof userUpdatePartiallyRequestBodySchema
>;
