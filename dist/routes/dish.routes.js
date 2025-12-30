"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_body_middleware_1 = __importDefault(require("../middleware/validate-body.middleware"));
const dish_controller_1 = require("../controllers/dish.controller");
const dish_schema_1 = require("../schema/dish.schema");
const validate_params_middleware_1 = __importDefault(require("../middleware/validate-params.middleware"));
const common_schema_1 = require("../schema/common.schema");
const validate_query_middleware_1 = __importDefault(require("../middleware/validate-query.middleware"));
const authorize_admin_middleware_1 = require("../middleware/authorize-admin.middleware");
const router = express_1.default.Router();
/**
 * @swagger
 * /dishes:
 *   get:
 *     summary: Get all dishes
 *     tags: [Dishes]
 *     parameters:
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: string
 *         description: Filter by category ID
 *       - in: query
 *         name: restaurantId
 *         schema:
 *           type: string
 *         description: Filter by restaurant ID
 *     responses:
 *       200:
 *         description: List of dishes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       price:
 *                         type: number
 *                       image:
 *                         type: string
 *                       categoryId:
 *                         type: string
 */
router.get("/", (0, validate_query_middleware_1.default)(dish_schema_1.DishQueryParamsSchema), dish_controller_1.getAllDishes);
/**
 * @swagger
 * /dishes:
 *   post:
 *     summary: Create a new dish (Admin only)
 *     tags: [Dishes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - categoryId
 *             properties:
 *               name:
 *                 type: string
 *                 example: Caesar Salad
 *               description:
 *                 type: string
 *                 example: Fresh romaine lettuce with caesar dressing
 *               price:
 *                 type: number
 *                 example: 12.99
 *               image:
 *                 type: string
 *               categoryId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Dish created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/", (0, authorize_admin_middleware_1.authorizeRole)("admin"), (0, validate_body_middleware_1.default)(dish_schema_1.CreateDishRequestBodySchema), dish_controller_1.createNewDish);
/**
 * @swagger
 * /dishes/{id}:
 *   put:
 *     summary: Update a dish fully (Admin only)
 *     tags: [Dishes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Dish ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - categoryId
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *               categoryId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Dish updated
 *       404:
 *         description: Dish not found
 */
router.put("/:id", (0, authorize_admin_middleware_1.authorizeRole)("admin"), (0, validate_params_middleware_1.default)(common_schema_1.objectIdPathParamsSchema), (0, validate_body_middleware_1.default)(dish_schema_1.FullyUpdateDishRequestBodySchema), dish_controller_1.updateDishFully);
/**
 * @swagger
 * /dishes/{id}:
 *   get:
 *     summary: Get a dish by ID
 *     tags: [Dishes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Dish ID
 *     responses:
 *       200:
 *         description: Dish details
 *       404:
 *         description: Dish not found
 */
router.get("/:id", (0, validate_params_middleware_1.default)(common_schema_1.objectIdPathParamsSchema), dish_controller_1.getADish, (0, validate_query_middleware_1.default)(dish_schema_1.DishQueryParamsSchema));
/**
 * @swagger
 * /dishes/{id}:
 *   patch:
 *     summary: Partially update a dish (Admin only)
 *     tags: [Dishes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Dish updated
 */
router.patch("/:id", (0, authorize_admin_middleware_1.authorizeRole)("admin"), (0, validate_params_middleware_1.default)(common_schema_1.objectIdPathParamsSchema), (0, validate_body_middleware_1.default)(dish_schema_1.PartiallyUpdateDishRequestBodySchema), dish_controller_1.updateDishPartially);
/**
 * @swagger
 * /dishes/{id}:
 *   delete:
 *     summary: Delete a dish (Admin only)
 *     tags: [Dishes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dish deleted
 *       404:
 *         description: Dish not found
 */
router.delete("/:id", (0, authorize_admin_middleware_1.authorizeRole)("admin"), (0, validate_params_middleware_1.default)(common_schema_1.objectIdPathParamsSchema), dish_controller_1.deleteDish);
exports.default = router;
