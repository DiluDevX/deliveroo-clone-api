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

/**
 * @swagger
 * /cart/{userId}:
 *   get:
 *     summary: Get user's cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: Cart contents
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           dishId:
 *                             type: string
 *                           name:
 *                             type: string
 *                           price:
 *                             type: number
 *                           quantity:
 *                             type: integer
 *                           image:
 *                             type: string
 *       404:
 *         description: Cart not found
 */
router.get("/:userId", ValidateParams(objectIdPathParamsSchema), getCart);

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Add item to cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - item
 *             properties:
 *               userId:
 *                 type: string
 *               item:
 *                 type: object
 *                 required:
 *                   - dishId
 *                   - name
 *                   - price
 *                   - quantity
 *                 properties:
 *                   dishId:
 *                     type: string
 *                   name:
 *                     type: string
 *                     example: Caesar Salad
 *                   price:
 *                     type: number
 *                     example: 12.99
 *                   quantity:
 *                     type: integer
 *                     example: 1
 *                   image:
 *                     type: string
 *     responses:
 *       200:
 *         description: Item added to cart
 */
router.post("/", ValidateBody(addToCartSchema), addToCart);

/**
 * @swagger
 * /cart/{userId}/items/{dishId}:
 *   patch:
 *     summary: Update cart item quantity
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: dishId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *                 example: 2
 *     responses:
 *       200:
 *         description: Cart item updated
 *       404:
 *         description: Cart or item not found
 */
router.patch(
  "/:userId/items/:dishId",
  ValidateParams(objectIdPathParamsSchema),
  ValidateBody(updateCartItemSchema),
  updateCartItem,
);

/**
 * @swagger
 * /cart/{userId}/items/{dishId}:
 *   delete:
 *     summary: Remove item from cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: dishId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item removed from cart
 *       404:
 *         description: Cart or item not found
 */
router.delete(
  "/:userId/items/:dishId",
  ValidateParams(objectIdPathParamsSchema),
  removeFromCart,
);

/**
 * @swagger
 * /cart/{userId}:
 *   delete:
 *     summary: Clear entire cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cart cleared
 *       404:
 *         description: Cart not found
 */
router.delete("/:userId", ValidateParams(objectIdPathParamsSchema), clearCart);

export default router;
