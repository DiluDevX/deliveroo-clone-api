import express from "express";
const router = express.Router();
import { checkEmail, signup, login } from "../controllers/auth.controller";
import ValidateBody from "../middleware/validate-body.middleware";
import {
  checkEmailRequestBodySchema,
  loginRequestBodySchema,
  signupRequestBodySchema,
} from "../schema/auth.schema";

router.post(
  "/check-email",
  ValidateBody(checkEmailRequestBodySchema),
  checkEmail,
);

router.post("/login", ValidateBody(loginRequestBodySchema), login);

router.post("/signup", ValidateBody(signupRequestBodySchema), signup);

export default router;
