import express from "express";
const router = express.Router();
import { authenticateUser } from "../controllers/authUser.controller";

router.post("/login", async (req, res) => {
  await authenticateUser(req, res);
});

export default router;
