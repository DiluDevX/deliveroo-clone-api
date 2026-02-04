import { Router } from "express";
import { verifyApiKey } from "../controllers/admin.controller";

const router = Router();

router.post("/verify-api-key", verifyApiKey);

export default router;
