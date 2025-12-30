"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryPathParamsSchema = exports.CategoryQueryParamsSchema = exports.PartiallyUpdateCategoryRequestBodySchema = exports.FullyUpdateCategoryRequestBodySchema = exports.CreateCategoryRequestBodySchema = void 0;
const zod_1 = require("zod");
const categoryNameSchema = zod_1.z.string().min(1).max(20);
const categoryRestaurantSchema = zod_1.z.string().min(1).max(30);
exports.CreateCategoryRequestBodySchema = zod_1.z.object({
    name: categoryNameSchema,
    restaurant: categoryRestaurantSchema,
});
exports.FullyUpdateCategoryRequestBodySchema = exports.CreateCategoryRequestBodySchema.required();
exports.PartiallyUpdateCategoryRequestBodySchema = exports.CreateCategoryRequestBodySchema.optional();
exports.CategoryQueryParamsSchema = zod_1.z.object({
    populate: zod_1.z.string(),
    restaurant: zod_1.z.string().min(1).max(20).or(zod_1.z.number()),
});
exports.CategoryPathParamsSchema = zod_1.z.object({
    orgID: zod_1.z
        .string()
        .min(4)
        .max(30)
        .regex(/^(?:[a-zA-Z0-9_-]|%[0-9A-Fa-f]{2})+$/, "orgID must contain only letters, numbers, dashes, underscores, or encoded characters"),
});
