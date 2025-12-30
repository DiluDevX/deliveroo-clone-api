"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantPathParamsSchema = exports.updateRestaurantPartiallyRequestBodySchema = exports.updateRestaurantFullyRequestBodySchema = exports.createRestaurantRequestBodySchema = void 0;
const zod_1 = require("zod");
const restaurantNameSchema = zod_1.z.string().min(1).max(20);
const restaurantDescriptionSchema = zod_1.z.string().min(3).max(150);
const restaurantTagSchema = zod_1.z.string().min(3).max(20);
const restaurantTimeSchema = zod_1.z.string().time();
const restaurantMinimumValueSchema = zod_1.z.string().min(1);
const restaurantDeliveryChargeSchema = zod_1.z.string().min(1);
const restaurantImageSchema = zod_1.z.string();
exports.createRestaurantRequestBodySchema = zod_1.z.object({
    name: restaurantNameSchema,
    description: restaurantDescriptionSchema.optional(),
    tags: zod_1.z.array(restaurantTagSchema),
    openingAt: restaurantTimeSchema,
    closingAt: restaurantTimeSchema,
    minimumValue: restaurantMinimumValueSchema,
    deliveryCharge: restaurantDeliveryChargeSchema,
    image: restaurantImageSchema,
});
exports.updateRestaurantFullyRequestBodySchema = zod_1.z.object({
    name: restaurantNameSchema,
    description: restaurantDescriptionSchema.optional(),
    tags: zod_1.z.array(restaurantTagSchema),
    openingAt: restaurantTimeSchema,
    closingAt: restaurantTimeSchema,
    minimumValue: restaurantMinimumValueSchema,
    deliveryCharge: restaurantDeliveryChargeSchema,
    image: restaurantImageSchema,
});
exports.updateRestaurantPartiallyRequestBodySchema = zod_1.z.object({
    name: restaurantNameSchema.optional(),
    description: restaurantDescriptionSchema.optional(),
    tags: zod_1.z.array(restaurantTagSchema).optional(),
    openingAt: restaurantTimeSchema.optional(),
    closingAt: restaurantTimeSchema.optional(),
    minimumValue: restaurantMinimumValueSchema.optional(),
    deliveryCharge: restaurantDeliveryChargeSchema.optional(),
    image: restaurantImageSchema.optional(),
});
exports.restaurantPathParamsSchema = zod_1.z.object({
    orgID: zod_1.z
        .string()
        .min(4)
        .max(40)
        .regex(/^(?:[a-zA-Z0-9_\- ]|%[0-9A-Fa-f]{2})+$/, "orgID must contain only letters, numbers, dashes, underscores, or encoded characters"),
});
