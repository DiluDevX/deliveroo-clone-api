"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = __importDefault(require("../controllers/category.controller"));
const validate_body_middleware_1 = __importDefault(require("../middleware/validate-body.middleware"));
const category_schema_1 = require("../schema/category.schema");
const validate_params_middleware_1 = __importDefault(require("../middleware/validate-params.middleware"));
const common_schema_1 = require("../schema/common.schema");
const authorize_admin_middleware_1 = require("../middleware/authorize-admin.middleware");
const { getAllCategories, createNewCategory, getCategory, updateCategoryPartially, updateCategoryFully, deleteCategory, } = category_controller_1.default;
const router = express_1.default.Router();
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
router.post("/", (0, authorize_admin_middleware_1.authorizeRole)("admin"), (0, validate_body_middleware_1.default)(category_schema_1.CreateCategoryRequestBodySchema), createNewCategory);
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
router.put("/:id", (0, authorize_admin_middleware_1.authorizeRole)("admin"), (0, validate_params_middleware_1.default)(common_schema_1.objectIdPathParamsSchema), (0, validate_body_middleware_1.default)(category_schema_1.FullyUpdateCategoryRequestBodySchema), updateCategoryFully);
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
router.get("/:id", (0, validate_params_middleware_1.default)(common_schema_1.objectIdPathParamsSchema), getCategory);
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
router.patch("/:id", (0, authorize_admin_middleware_1.authorizeRole)("admin"), (0, validate_params_middleware_1.default)(common_schema_1.objectIdPathParamsSchema), (0, validate_body_middleware_1.default)(category_schema_1.PartiallyUpdateCategoryRequestBodySchema), updateCategoryPartially);
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
router.delete("/:id", (0, authorize_admin_middleware_1.authorizeRole)("admin"), (0, validate_params_middleware_1.default)(common_schema_1.objectIdPathParamsSchema), deleteCategory);
exports.default = router;
