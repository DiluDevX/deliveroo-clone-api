import express from "express";
const router = express.Router();
import {
  checkEmail,
  signup,
  login,
  forgotPassword,
  validateResetPasswordToken,
} from "../controllers/auth.controller";
import ValidateBody from "../middleware/validate-body.middleware";
import {
  checkEmailRequestBodySchema,
  forgotPasswordRequestBodySchema,
  loginRequestBodySchema,
  signupRequestBodySchema,
  validateOAuthTokenRequestBodySchema,
  validateResetPasswordRequestBodySchema,
} from "../schema/auth.schema";
import { optionalAuthorizeRole } from "../middleware/authorize-admin.middleware";

router.post(
  "/check-email",
  ValidateBody(checkEmailRequestBodySchema),
  checkEmail,
);

router.post("/login", ValidateBody(loginRequestBodySchema), login);

router.post(
  "/signup",
  optionalAuthorizeRole("admin"),
  ValidateBody(signupRequestBodySchema),
  signup,
);

router.post(
  "/forgot-password",
  ValidateBody(forgotPasswordRequestBodySchema),
  forgotPassword,
);

router.post(
  "/validate-token",
  ValidateBody(validateResetPasswordRequestBodySchema),
  validateResetPasswordToken,
);

router.post(
  "validate-OAuthToken",
  ValidateBody(validateOAuthTokenRequestBodySchema),
);

export default router;
