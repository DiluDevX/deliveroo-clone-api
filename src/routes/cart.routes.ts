import express from "express";
const router = express.Router();

import ValidateBody from "../middleware/validate-body.middleware";
import ValidateParams from "../middleware/validate-params.middleware";
import { addToCartSchema, updateCartItemSchema } from "../schema/cart.schema";
import {
  userIdPathParamsSchema,
  userIdAndDishIdPathParamsSchema,
} from "../schema/common.schema";
import {
  updateCartItem,
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
} from "../controllers/cart.controller";

router.get("/:userId", ValidateParams(userIdPathParamsSchema), getCart);

router.post("/", ValidateBody(addToCartSchema), addToCart);

router.patch(
  "/:userId/items/:dishId",
  ValidateParams(userIdAndDishIdPathParamsSchema),
  ValidateBody(updateCartItemSchema),
  updateCartItem,
);

router.delete(
  "/:userId/items/:dishId",
  ValidateParams(userIdAndDishIdPathParamsSchema),
  removeFromCart,
);

router.delete("/:userId", ValidateParams(userIdPathParamsSchema), clearCart);

export default router;
