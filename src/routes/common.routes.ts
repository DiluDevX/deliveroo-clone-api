import express from "express";
import { CommonResponseDTO } from "../dto/common.dto";
import { HttpStatusCode } from "axios";

const router = express.Router();

router.get("/", (_req, res) => {
  let authServiceStatus = "unknown";
  router.get("http://localhost:4001/", (_req, res) => {
    if (res.status(200)) {
      authServiceStatus = "up";
    } else {
      authServiceStatus = "down";
    }
  });
  res.status(HttpStatusCode.Ok).json({
    message: "OK",
    time: new Date().toISOString(),
    services: {
      authService: authServiceStatus,
    },
  });
});

router.all("*", (_req, res) => {
  const response: CommonResponseDTO<never> = {
    success: false,
    message: "Route Not Found!",
  };
  res.status(HttpStatusCode.NotFound).json(response);
});

export default router;
