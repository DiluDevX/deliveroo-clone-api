import express from "express";
import ValidateBody from "../middleware/validate-body.middleware";
import { sendMailRequestBodySchema } from "../schema/mail.schema";
import { sendPasswordResetMail } from "../controllers/mail.controller";

const router = express.Router();

router.post(
  "/reset-password",
  ValidateBody(sendMailRequestBodySchema),
  sendPasswordResetMail,
);

export default router;
