"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const restaurant_controller_1 = require("../controllers/restaurant.controller");
const validate_body_middleware_1 = __importDefault(require("../middleware/validate-body.middleware"));
const restaurant_schema_1 = require("../schema/restaurant.schema");
const common_schema_1 = require("../schema/common.schema");
const validate_params_middleware_1 = __importDefault(require("../middleware/validate-params.middleware"));
const authorize_admin_middleware_1 = require("../middleware/authorize-admin.middleware");
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
router.get("/", restaurant_controller_1.getAllRestaurants);
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
router.post("/", (0, authorize_admin_middleware_1.authorizeRole)("admin"), (0, validate_body_middleware_1.default)(restaurant_schema_1.createRestaurantRequestBodySchema), restaurant_controller_1.createNewRestaurant);
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
router.put("/:id", (0, authorize_admin_middleware_1.authorizeRole)("admin"), (0, validate_params_middleware_1.default)(common_schema_1.objectIdPathParamsSchema), (0, validate_body_middleware_1.default)(restaurant_schema_1.updateRestaurantFullyRequestBodySchema), restaurant_controller_1.updateARestaurantFully);
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
router.get("/:orgID", (0, validate_params_middleware_1.default)(restaurant_schema_1.restaurantPathParamsSchema), restaurant_controller_1.getARestaurant);
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
router.patch("/:id", (0, authorize_admin_middleware_1.authorizeRole)("admin"), (0, validate_params_middleware_1.default)(common_schema_1.objectIdPathParamsSchema), (0, validate_body_middleware_1.default)(restaurant_schema_1.updateRestaurantPartiallyRequestBodySchema), restaurant_controller_1.updateARestaurantPartially);
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
router.delete("/:id", (0, authorize_admin_middleware_1.authorizeRole)("admin"), (0, validate_params_middleware_1.default)(common_schema_1.objectIdPathParamsSchema), restaurant_controller_1.deleteARestaurant);
exports.default = router;
