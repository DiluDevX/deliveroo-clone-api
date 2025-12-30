"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DishQueryParamsSchema = exports.PartiallyUpdateDishRequestBodySchema = exports.FullyUpdateDishRequestBodySchema = exports.CreateDishRequestBodySchema = void 0;
const zod_1 = require("zod");
const DishName = zod_1.z.string().min(4).max(50);
const DishDescription = zod_1.z.string().min(3).max(150);
const DishPrice = zod_1.z.number().min(1);
const DishCategory = zod_1.z.string().min(4).max(30);
const DishRestaurant = zod_1.z.string().min(4).max(30);
exports.CreateDishRequestBodySchema = zod_1.z.object({
    name: DishName,
    description: DishDescription.optional(),
    price: DishPrice,
    category: DishCategory,
    restaurant: DishRestaurant,
});
exports.FullyUpdateDishRequestBodySchema = exports.CreateDishRequestBodySchema.required();
exports.PartiallyUpdateDishRequestBodySchema = exports.CreateDishRequestBodySchema.partial();
exports.DishQueryParamsSchema = zod_1.z.object({
    populate: zod_1.z.string().optional(),
    restaurant: zod_1.z.string().min(4).max(30).optional(),
    category: zod_1.z.string().min(4).max(30).optional(),
});
