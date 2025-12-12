import express from "express";
const router = express.Router();

import {
  getAllRestaurants,
  createNewRestaurant,
  getARestaurant,
  updateARestaurantPartially,
  updateARestaurantFully,
  deleteARestaurant,
} from "../controllers/restaurant.controller";
import ValidateBody from "../middleware/validate-body.middleware";
import {
  createRestaurantRequestBodySchema,
  restaurantPathParamsSchema,
  updateRestaurantFullyRequestBodySchema,
  updateRestaurantPartiallyRequestBodySchema,
} from "../schema/restaurant.schema";
import { objectIdPathParamsSchema } from "../schema/common.schema";
import ValidateParams from "../middleware/validate-params.middleware";
import { authorizeRole } from "../middleware/authorize-admin.middleware";

/**
 * @swagger
 * /restaurants:
 *   get:
 *     summary: Get all restaurants
 *     tags: [Restaurants]
 *     responses:
 *       200:
 *         description: List of all restaurants
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
 *                       image:
 *                         type: string
 *                       rating:
 *                         type: number
 *                       deliveryTime:
 *                         type: string
 *                       deliveryFee:
 *                         type: number
 */
router.get("/", getAllRestaurants);

/**
 * @swagger
 * /restaurants:
 *   post:
 *     summary: Create a new restaurant (Admin only)
 *     tags: [Restaurants]
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
 *               - orgID
 *             properties:
 *               name:
 *                 type: string
 *               orgID:
 *                 type: string
 *               image:
 *                 type: string
 *               rating:
 *                 type: number
 *               deliveryTime:
 *                 type: string
 *               deliveryFee:
 *                 type: number
 *     responses:
 *       201:
 *         description: Restaurant created
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/",
  authorizeRole("admin"),
  ValidateBody(createRestaurantRequestBodySchema),
  createNewRestaurant,
);

/**
 * @swagger
 * /restaurants/{id}:
 *   put:
 *     summary: Update a restaurant fully (Admin only)
 *     tags: [Restaurants]
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
 *     responses:
 *       200:
 *         description: Restaurant updated
 *       404:
 *         description: Restaurant not found
 */
router.put(
  "/:id",
  authorizeRole("admin"),
  ValidateParams(objectIdPathParamsSchema),
  ValidateBody(updateRestaurantFullyRequestBodySchema),
  updateARestaurantFully,
);

/**
 * @swagger
 * /restaurants/{orgID}:
 *   get:
 *     summary: Get a restaurant by orgID
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: orgID
 *         required: true
 *         schema:
 *           type: string
 *         description: The organization ID
 *     responses:
 *       200:
 *         description: Restaurant details
 *       404:
 *         description: Restaurant not found
 */
router.get(
  "/:orgID",
  ValidateParams(restaurantPathParamsSchema),
  getARestaurant,
);

/**
 * @swagger
 * /restaurants/{id}:
 *   patch:
 *     summary: Partially update a restaurant (Admin only)
 *     tags: [Restaurants]
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
 *     responses:
 *       200:
 *         description: Restaurant updated
 */
router.patch(
  "/:id",
  authorizeRole("admin"),
  ValidateParams(objectIdPathParamsSchema),
  ValidateBody(updateRestaurantPartiallyRequestBodySchema),
  updateARestaurantPartially,
);

/**
 * @swagger
 * /restaurants/{id}:
 *   delete:
 *     summary: Delete a restaurant (Admin only)
 *     tags: [Restaurants]
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
 *         description: Restaurant deleted
 *       404:
 *         description: Restaurant not found
 */
router.delete(
  "/:id",
  authorizeRole("admin"),
  ValidateParams(objectIdPathParamsSchema),
  deleteARestaurant,
);

export default router;
