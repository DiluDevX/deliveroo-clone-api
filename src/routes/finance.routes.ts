import express from "express";
import {
  getPlatformStats,
  getPlatformRevenue,
  getAllRecords,
} from "../controllers/finance.controller";

const router = express.Router();

router.get("/admin-dashboard-stats", getPlatformStats);

router.get("/revenue", getPlatformRevenue);

router.get("/all", getAllRecords);

export const financeRoutes = router;
