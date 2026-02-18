import { z } from "zod";

const DishName = z.string().min(4).max(50);
const DishDescription = z.string().min(3).max(150);
const DishPrice = z.number().min(1);
const DishCategoryId = z.string().min(4).max(40);
const DishRestaurantId = z.string().min(4).max(40);
const DishTag = z.enum(["bestseller", "new", "special"]);

export const CreateDishRequestBodySchema = z.object({
  name: DishName,
  description: DishDescription.optional(),
  price: DishPrice,
  categoryId: DishCategoryId,
  restaurant: DishRestaurantId,
  image: z.string(),
  isVegetarian: z.boolean().optional().default(false),
  isSpicy: z.boolean().optional().default(false),
  isAvailable: z.boolean().optional().default(true),
  tags: DishTag.optional(),
});

export const FullyUpdateDishRequestBodySchema =
  CreateDishRequestBodySchema.required();

export const PartiallyUpdateDishRequestBodySchema =
  CreateDishRequestBodySchema.partial();

export const DishQueryParamsSchema = z.object({
  populate: z.string().optional(),
  restaurant: z.string().min(4).max(40).optional(),
  category: z.string().min(4).max(40).optional(),
});
