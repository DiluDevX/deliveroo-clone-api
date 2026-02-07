import express from "express";
import categoryController from "../controllers/category.controller";
import ValidateBody from "../middleware/validate-body.middleware";
import {
  CreateCategoryRequestBodySchema,
  FullyUpdateCategoryRequestBodySchema,
  PartiallyUpdateCategoryRequestBodySchema,
} from "../schema/category.schema";
import ValidateParams from "../middleware/validate-params.middleware";
import { objectIdPathParamsSchema } from "../schema/common.schema";
import { AuthorizeRestaurantAdmin } from "../middleware/authorize-admin.middleware";
const {
  getAllCategories,
  createNewCategory,
  getCategory,
  updateCategoryPartially,
  updateCategoryFully,
  deleteCategory,
} = categoryController;

const router = express.Router();

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     parameters:
 *       - in: query
 *         name: restaurantId
 *         schema:
 *           type: string
 *         description: Filter by restaurant ID
 *     responses:
 *       200:
 *         description: List of categories
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
 *                       restaurantId:
 *                         type: string
 */
router.get("/", getAllCategories);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category (Admin only)
 *     tags: [Categories]
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
 *               - restaurantId
 *             properties:
 *               name:
 *                 type: string
 *                 example: Salads
 *               restaurantId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/",
  AuthorizeRestaurantAdmin(),
  ValidateBody(CreateCategoryRequestBodySchema),
  createNewCategory,
);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update a category fully (Admin only)
 *     tags: [Categories]
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
 *             required:
 *               - name
 *               - restaurantId
 *             properties:
 *               name:
 *                 type: string
 *               restaurantId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated
 *       404:
 *         description: Category not found
 */
router.put(
  "/:id",
  AuthorizeRestaurantAdmin(),
  ValidateParams(objectIdPathParamsSchema),
  ValidateBody(FullyUpdateCategoryRequestBodySchema),
  updateCategoryFully,
);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category details
 *       404:
 *         description: Category not found
 */
router.get("/:id", ValidateParams(objectIdPathParamsSchema), getCategory);

/**
 * @swagger
 * /categories/{id}:
 *   patch:
 *     summary: Partially update a category (Admin only)
 *     tags: [Categories]
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
 *     responses:
 *       200:
 *         description: Category updated
 */
router.patch(
  "/:id",
  AuthorizeRestaurantAdmin(),
  ValidateParams(objectIdPathParamsSchema),
  ValidateBody(PartiallyUpdateCategoryRequestBodySchema),
  updateCategoryPartially,
);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category (Admin only)
 *     tags: [Categories]
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
 *         description: Category deleted
 *       404:
 *         description: Category not found
 */
router.delete(
  "/:id",
  AuthorizeRestaurantAdmin(),
  ValidateParams(objectIdPathParamsSchema),
  deleteCategory,
);

export default router;
