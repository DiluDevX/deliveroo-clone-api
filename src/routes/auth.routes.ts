import express from "express";
const router = express.Router();
import {
  checkEmail,
  signup,
  login,
  forgotPassword,
} from "../controllers/auth.controller";
import ValidateBody from "../middleware/validate-body.middleware";
import {
  checkEmailRequestBodySchema,
  forgotPasswordRequestBodySchema,
  loginRequestBodySchema,
  signupRequestBodySchema,
} from "../schema/auth.schema";
import { optionalAuthorizeRole } from "../middleware/authorize-admin.middleware";

router.post(
  "/check-email",
  ValidateBody(checkEmailRequestBodySchema),
  checkEmail,
);

router.post(
  "/forgot-password",
  ValidateBody(forgotPasswordRequestBodySchema),
  forgotPassword,
);

router.post(
  "/login",

  ValidateBody(loginRequestBodySchema),
  login,
);

router.post(
  "/signup",
  optionalAuthorizeRole("admin"),
  ValidateBody(signupRequestBodySchema),
  signup,
);

export default router;
