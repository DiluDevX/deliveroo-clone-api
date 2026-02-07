import express from "express";
import ValidateBody from "../middleware/validate-body.middleware";
import {
  getAllDishes,
  createNewDish,
  getADish,
  updateDishPartially,
  updateDishFully,
  deleteDish,
} from "../controllers/dish.controller";
import {
  CreateDishRequestBodySchema,
  DishQueryParamsSchema,
  FullyUpdateDishRequestBodySchema,
  PartiallyUpdateDishRequestBodySchema,
} from "../schema/dish.schema";
import ValidateParams from "../middleware/validate-params.middleware";
import { objectIdPathParamsSchema } from "../schema/common.schema";
import ValidateQuery from "../middleware/validate-query.middleware";
import { AuthorizeRestaurantAdmin } from "../middleware/authorize-admin.middleware";

const router = express.Router();

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
router.get("/", ValidateQuery(DishQueryParamsSchema), getAllDishes);

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
router.post(
  "/",
  AuthorizeRestaurantAdmin(),
  ValidateBody(CreateDishRequestBodySchema),
  createNewDish,
);

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
router.put(
  "/:id",
  AuthorizeRestaurantAdmin(),
  ValidateParams(objectIdPathParamsSchema),
  ValidateBody(FullyUpdateDishRequestBodySchema),
  updateDishFully,
);

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
router.get(
  "/:id",
  ValidateParams(objectIdPathParamsSchema),
  getADish,
  ValidateQuery(DishQueryParamsSchema),
);

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
router.patch(
  "/:id",
  AuthorizeRestaurantAdmin(),
  ValidateParams(objectIdPathParamsSchema),
  ValidateBody(PartiallyUpdateDishRequestBodySchema),
  updateDishPartially,
);

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
router.delete(
  "/:id",
  AuthorizeRestaurantAdmin(),
  ValidateParams(objectIdPathParamsSchema),
  deleteDish,
);

export default router;
