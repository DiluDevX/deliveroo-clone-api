import express from "express";
const router = express.Router();
import ValidateBody from "../middleware/validate-body.middleware";
import ValidateHeader from "../middleware/validate-header.middleware";
import {
  checkEmailRequestBodySchema,
  forgotPasswordRequestBodySchema,
  loginRequestBodySchema,
  signupRequestBodySchema,
  validateResetPasswordRequestBodySchema,
  updateResetPasswordRequestBodySchema,
  refreshTokenHeaderSchema,
} from "../schema/auth.schema";
import {
  checkEmail,
  forgotPassword,
  login,
  logOut,
  refreshToken,
  resetPassword,
  signup,
  verifyResetPasswordToken,
} from "../controllers/auth.controller";

router.post(
  "/check-email",
  ValidateBody(checkEmailRequestBodySchema),
  checkEmail,
);

router.post("/login", ValidateBody(loginRequestBodySchema), login);

router.post("/signup", ValidateBody(signupRequestBodySchema), signup);

router.post(
  "/forgot-password",
  ValidateBody(forgotPasswordRequestBodySchema),
  forgotPassword,
);

router.post(
  "/reset-password/verify",
  ValidateBody(validateResetPasswordRequestBodySchema),
  verifyResetPasswordToken,
);

router.post(
  "/reset-password/update",
  ValidateBody(updateResetPasswordRequestBodySchema),
  resetPassword,
);

router.post(
  "/refresh-token",
  ValidateHeader(refreshTokenHeaderSchema, "x-refresh-token"),
  refreshToken,
);

router.post("/logout", logOut);

export default router;
