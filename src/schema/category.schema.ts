import { z } from "zod";

const categoryNameSchema = z.string().min(1).max(20);
const categoryRestaurantSchema = z.string().min(1).max(20);

export const CreateCategoryRequestBodySchema = z.object({
  name: categoryNameSchema,
  restaurant: categoryRestaurantSchema,
});

export const FullyUpdateCategoryRequestBodySchema =
  CreateCategoryRequestBodySchema.required();

export const PartiallyUpdateCategoryRequestBodySchema =
  CreateCategoryRequestBodySchema.optional();

export const CategoryQueryParamsSchema = z.object({
  populate: z.string(),
  restaurant: z.string().min(1).max(20).or(z.number()),
});

export const CategoryPathParamsSchema = z.object({
  orgID: z
    .string()
    .min(4)
    .max(30)
    .regex(
      /^(?:[a-zA-Z0-9_-]|%[0-9A-Fa-f]{2})+$/,
      "orgID must contain only letters, numbers, dashes, underscores, or encoded characters",
    ),
});
