import express from "express";
const router = express.Router();
import {
  checkEmail,
  createNewUser,
  logInUser,
} from "../controllers/auth.controller";
import ValidateBody from "../middleware/validate-body.middleware";
import {
  authenticateUserRequestBodySchema,
  loginUserRequestBodySchema,
} from "../schema/auth.schema";
import { createUserRequestBodySchema } from "../schema/users.schema";

router.post(
  "/check-email",
  ValidateBody(authenticateUserRequestBodySchema),
  checkEmail,
);

router.post("/login", ValidateBody(loginUserRequestBodySchema), logInUser);

router.post(
  "/signup",
  ValidateBody(createUserRequestBodySchema),
  createNewUser,
);

export default router;
