"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const validate_body_middleware_1 = __importDefault(require("../middleware/validate-body.middleware"));
const validate_params_middleware_1 = __importDefault(require("../middleware/validate-params.middleware"));
const cart_schema_1 = require("../schema/cart.schema");
const common_schema_1 = require("../schema/common.schema");
const cart_controller_1 = require("../controllers/cart.controller");
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
router.get("/:userId", (0, validate_params_middleware_1.default)(common_schema_1.userIdPathParamsSchema), cart_controller_1.getCart);
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
router.post("/", (0, validate_body_middleware_1.default)(cart_schema_1.addToCartSchema), cart_controller_1.addToCart);
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
router.patch("/:userId/items/:dishId", (0, validate_params_middleware_1.default)(common_schema_1.userIdAndDishIdPathParamsSchema), (0, validate_body_middleware_1.default)(cart_schema_1.updateCartItemSchema), cart_controller_1.updateCartItem);
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
router.delete("/:userId/items/:dishId", (0, validate_params_middleware_1.default)(common_schema_1.userIdAndDishIdPathParamsSchema), cart_controller_1.removeFromCart);
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
router.delete("/:userId", (0, validate_params_middleware_1.default)(common_schema_1.userIdPathParamsSchema), cart_controller_1.clearCart);
exports.default = router;
