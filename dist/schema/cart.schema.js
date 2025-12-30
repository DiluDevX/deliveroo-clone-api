"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCartItemSchema = exports.addToCartSchema = exports.cartSchema = exports.cartItemSchema = void 0;
const zod_1 = require("zod");
exports.cartItemSchema = zod_1.z.object({
    dishId: zod_1.z.string(),
    name: zod_1.z.string(),
    price: zod_1.z.number().positive(),
    restaurantId: zod_1.z.string().optional(),
    quantity: zod_1.z.number().int().positive(),
    image: zod_1.z.string().url().optional(),
    description: zod_1.z.string().optional(),
});
// Cart schema
exports.cartSchema = zod_1.z.object({
    userId: zod_1.z.string(),
    items: zod_1.z.array(exports.cartItemSchema),
    restaurantId: zod_1.z.string().optional(),
});
// Add item to cart schema
exports.addToCartSchema = zod_1.z.object({
    userId: zod_1.z.string(),
    item: exports.cartItemSchema,
});
// Update cart item schema
exports.updateCartItemSchema = zod_1.z.object({
    quantity: zod_1.z.number().int().positive(),
});
