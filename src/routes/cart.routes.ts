import express from "express";
const router = express.Router();

import ValidateBody from "../middleware/validate-body.middleware";
import ValidateParams from "../middleware/validate-params.middleware";
import { addToCartSchema, updateCartItemSchema } from "../schema/cart.schema";
import { objectIdPathParamsSchema } from "../schema/common.schema";
import {
  updateCartItem,
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
} from "../controllers/cart.controller";

// Get user's cart
router.get("/:userId", ValidateParams(objectIdPathParamsSchema), getCart);

// Add item to cart
router.post("/", ValidateBody(addToCartSchema), addToCart);

// Update cart item quantity
router.patch(
  "/:userId/items/:dishId",
  ValidateParams(objectIdPathParamsSchema),
  ValidateBody(updateCartItemSchema),
  updateCartItem,
);

// Remove item from cart
router.delete(
  "/:userId/items/:dishId",
  ValidateParams(objectIdPathParamsSchema),
  removeFromCart,
);

// Clear entire cart
router.delete("/:userId", ValidateParams(objectIdPathParamsSchema), clearCart);

export default router;
