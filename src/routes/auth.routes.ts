import express from "express";
const router = express.Router();
import { checkEmail, signup, login } from "../controllers/auth.controller";
import ValidateBody from "../middleware/validate-body.middleware";
import {
  checkEmailRequestBodySchema,
  loginRequestBodySchema,
  signupRequestBodySchema,
} from "../schema/auth.schema";
import { authorizeRole } from "../middleware/authorize-role.middleware";

router.post(
  "/check-email",
  ValidateBody(checkEmailRequestBodySchema),
  checkEmail,
);

router.post("/login", ValidateBody(loginRequestBodySchema), login);

router.post(
  "/signup",
  authorizeRole("admin"),
  ValidateBody(signupRequestBodySchema),
  signup,
);

export default router;
