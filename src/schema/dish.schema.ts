import { z } from "zod";

const DishName = z.string().min(4).max(50);
const DishDescription = z.string().min(3).max(150);
const DishPrice = z.number().min(1);
const DishCategory = z.string().min(4).max(30);
const DishRestaurant = z.string().min(4).max(30);

export const CreateDishRequestBodySchema = z.object({
  name: DishName,
  description: DishDescription.optional(),
  price: DishPrice,
  category: DishCategory,
  restaurant: DishRestaurant,
});

export const FullyUpdateDishRequestBodySchema =
  CreateDishRequestBodySchema.required();

export const PartiallyUpdateDishRequestBodySchema =
  CreateDishRequestBodySchema.optional();

export const DishQueryParamsSchema = z.object({
  populate: z.string(),
  restaurant: z.string().min(4).max(30),
  category: z.string().min(4).max(30),
});
