import express from "express";
const router = express.Router();
import {
  signup,
  login,
  forgotPassword,
  checkEmail,
  resetPassword,
  refreshToken,
  checkAuthStatus,
} from "../controllers/auth.controller";
import ValidateBody from "../middleware/validate-body.middleware";
import {
  checkEmailRequestBodySchema,
  forgotPasswordRequestBodySchema,
  loginRequestBodySchema,
  resetPasswordRequestBodySchema,
  signupRequestBodySchema,
  validateRefreshTokenRequestBodySchema,
} from "../schema/auth.schema";
import { optionalAuthorizeRole } from "../middleware/authorize-admin.middleware";

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
router.post(
  "/check-email",
  ValidateBody(checkEmailRequestBodySchema),
  checkEmail,
);

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
router.post("/login", ValidateBody(loginRequestBodySchema), login);

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
router.post(
  "/signup",
  optionalAuthorizeRole("admin"),
  ValidateBody(signupRequestBodySchema),
  signup,
);

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
router.post(
  "/forgot-password",
  ValidateBody(forgotPasswordRequestBodySchema),
  forgotPassword,
);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset password with token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - token
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               token:
 *                 type: string
 *                 example: abc123token
 *               password:
 *                 type: string
 *                 example: newPassword123
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid or expired token
 *       404:
 *         description: User not found
 */
router.post(
  "/reset-password",
  ValidateBody(resetPasswordRequestBodySchema),
  resetPassword,
);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: Token refreshed successfully
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
 *         description: Invalid or expired refresh token
 */
router.post(
  "/refresh",
  ValidateBody(validateRefreshTokenRequestBodySchema),
  refreshToken,
);

router.post("/me", checkAuthStatus)

export default router;
