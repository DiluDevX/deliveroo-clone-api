import { z } from "zod";

const restaurantNameSchema = z.string().min(1).max(30);
const restaurantDescriptionSchema = z.string().min(3).max(150);
const restaurantTagSchema = z.string().min(3).max(30);
const restaurantMinimumValueSchema = z.string().min(1);
const restaurantDeliveryChargeSchema = z.string().min(1);
const restaurantImageSchema = z.string();
const restaurantCommissionPercentageSchema = z.number().min(0).max(100);

// Operating hours schema - matches model structure
const operatingHoursSchema = z.object({
  day: z.enum([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]),
  openAt: z.string().time(),
  closeAt: z.string().time(),
  isOpen: z.boolean(),
});

export const createRestaurantRequestBodySchema = z.object({
  name: restaurantNameSchema,
  description: restaurantDescriptionSchema.optional(),
  tags: z.array(restaurantTagSchema),
  operatingHours: z.array(operatingHoursSchema).min(1),
  minimumValue: restaurantMinimumValueSchema,
  deliveryCharge: restaurantDeliveryChargeSchema,
  image: restaurantImageSchema,
  cuisine: z.string(),
  commissionPercentage: restaurantCommissionPercentageSchema
    .optional()
    .default(10),
  adminId: z.string(),
});

export const updateRestaurantFullyRequestBodySchema = z.object({
  name: restaurantNameSchema,
  description: restaurantDescriptionSchema.optional(),
  tags: z.array(restaurantTagSchema),
  operatingHours: z.array(operatingHoursSchema).min(1),
  minimumValue: restaurantMinimumValueSchema,
  deliveryCharge: restaurantDeliveryChargeSchema,
  image: restaurantImageSchema,
  cuisine: z.string(),
  commissionPercentage: restaurantCommissionPercentageSchema.optional(),
});

export const updateRestaurantPartiallyRequestBodySchema = z.object({
  name: restaurantNameSchema.optional(),
  description: restaurantDescriptionSchema.optional(),
  tags: z.array(restaurantTagSchema).optional(),
  operatingHours: z.array(operatingHoursSchema).optional(),
  minimumValue: restaurantMinimumValueSchema.optional(),
  deliveryCharge: restaurantDeliveryChargeSchema.optional(),
  image: restaurantImageSchema.optional(),
  cuisine: z.string().optional(),
  commissionPercentage: restaurantCommissionPercentageSchema.optional(),
});

export const restaurantPathParamsSchema = z.object({
  restaurantId: z
    .string()
    .min(4)
    .max(40)
    .regex(
      /^(?:[a-zA-Z0-9_\- ]|%[0-9A-Fa-f]{2})+$/,
      "restaurantId must contain only letters, numbers, dashes, underscores, or encoded characters",
    ),
});
