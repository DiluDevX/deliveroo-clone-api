import { z } from "zod";

const restaurantNameSchema = z.string().min(1).max(20);
const restaurantDescriptionSchema = z.string().min(3).max(150);
const restaurantTagSchema = z.string().min(3).max(20);
const restaurantTimeSchema = z.string().time();
const restaurantMinimumValueSchema = z.string().min(1);
const restaurantDeliveryChargeSchema = z.string().min(1);
const restaurantImageSchema = z.string();

export const createRestaurantRequestBodySchema = z.object({
  name: restaurantNameSchema,
  description: restaurantDescriptionSchema.optional(),
  tags: z.array(restaurantTagSchema),
  openingAt: restaurantTimeSchema,
  closingAt: restaurantTimeSchema,
  minimumValue: restaurantMinimumValueSchema,
  deliveryCharge: restaurantDeliveryChargeSchema,
  image: restaurantImageSchema,
});

export const updateRestaurantFullyRequestBodySchema = z.object({
  name: restaurantNameSchema,
  description: restaurantDescriptionSchema.optional(),
  tags: z.array(restaurantTagSchema),
  openingAt: restaurantTimeSchema,
  closingAt: restaurantTimeSchema,
  minimumValue: restaurantMinimumValueSchema,
  deliveryCharge: restaurantDeliveryChargeSchema,
  image: restaurantImageSchema,
});

export const updateRestaurantPartiallyRequestBodySchema = z.object({
  name: restaurantNameSchema.optional(),
  description: restaurantDescriptionSchema.optional(),
  tags: z.array(restaurantTagSchema).optional(),
  openingAt: restaurantTimeSchema.optional(),
  closingAt: restaurantTimeSchema.optional(),
  minimumValue: restaurantMinimumValueSchema.optional(),
  deliveryCharge: restaurantDeliveryChargeSchema.optional(),
  image: restaurantImageSchema.optional(),
});

export const restaurantPathParamsSchema = z.object({
  orgID: z
    .string()
    .min(4)
    .max(40)
    .regex(
      /^(?:[a-zA-Z0-9_\- ]|%[0-9A-Fa-f]{2})+$/,
      "orgID must contain only letters, numbers, dashes, underscores, or encoded characters",
    ),
});
