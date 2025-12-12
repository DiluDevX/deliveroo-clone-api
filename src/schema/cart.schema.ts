import { z } from "zod";

export const cartItemSchema = z.object({
  dishId: z.string(),
  name: z.string(),
  price: z.number().positive(),
  restaurantId: z.string().optional(),
  quantity: z.number().int().positive(),
  image: z.string().url().optional(),
  description: z.string().optional(),
});

// Cart schema
export const cartSchema = z.object({
  userId: z.string(),
  items: z.array(cartItemSchema),
  restaurantId: z.string().optional(),
});

// Add item to cart schema
export const addToCartSchema = z.object({
  userId: z.string(),
  item: cartItemSchema,
});

// Update cart item schema
export const updateCartItemSchema = z.object({
  quantity: z.number().int().positive(),
});

// Export types
export type CartItem = z.infer<typeof cartItemSchema>;
export type Cart = z.infer<typeof cartSchema>;
export type AddToCart = z.infer<typeof addToCartSchema>;
export type UpdateCartItem = z.infer<typeof updateCartItemSchema>;
