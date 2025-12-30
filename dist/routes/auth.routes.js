"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_controller_1 = require("../controllers/auth.controller");
const validate_body_middleware_1 = __importDefault(require("../middleware/validate-body.middleware"));
const auth_schema_1 = require("../schema/auth.schema");
const authorize_admin_middleware_1 = require("../middleware/authorize-admin.middleware");
/**
 * @swagger
 * /auth/check-email:
 *   post:
 *     summary: Check if email exists
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
router.post("/check-email", (0, validate_body_middleware_1.default)(auth_schema_1.checkEmailRequestBodySchema), auth_controller_1.checkEmail);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", (0, validate_body_middleware_1.default)(auth_schema_1.loginRequestBodySchema), auth_controller_1.login);
/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - firstName
 *               - lastName
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: User already exists
 */
router.post("/signup", (0, authorize_admin_middleware_1.optionalAuthorizeRole)("admin"), (0, validate_body_middleware_1.default)(auth_schema_1.signupRequestBodySchema), auth_controller_1.signup);
/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Request password reset
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Reset email sent
 *       404:
 *         description: User not found
 */
router.post("/forgot-password", (0, validate_body_middleware_1.default)(auth_schema_1.forgotPasswordRequestBodySchema), auth_controller_1.forgotPassword);
/**
 * @swagger
 * /auth/validate-token:
 *   post:
 *     summary: Validate password reset token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token is valid
 *       400:
 *         description: Invalid or expired token
 */
router.post("/validate-token", (0, validate_body_middleware_1.default)(auth_schema_1.validateResetPasswordRequestBodySchema), auth_controller_1.validateResetPasswordToken);
router.post("validate-OAuthToken", (0, validate_body_middleware_1.default)(auth_schema_1.validateOAuthTokenRequestBodySchema));
exports.default = router;
