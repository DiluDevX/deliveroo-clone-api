import express from "express";
import authService from "../services/auth-client.service";

const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Health]
 *     description: Returns OK if the API is running
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: OK
 */
router.get("/", (_req, res) => {
  let authServiceStatus = "unknown";
  let mailServiceStatus = "unknown";
  router.get("http://localhost:4001/", (_req, res) => {
    if (res.status(200)) {
      authServiceStatus = "up";
    } else {
      authServiceStatus = "down";
    }
  });
  router.get("http://localhost:3000/", (_req, res) => {
    if (res.status(200)) {
      mailServiceStatus = "up";
    } else {
      mailServiceStatus = "down";
    }
  });
  res.status(200).json({
    message: "OK",
    time: new Date().toISOString(),
    services: {
      authService: authServiceStatus,
      mailService: mailServiceStatus,
    },
  });
});

router.all("*", (_req, res) => {
  res.status(404).json({
    message: "Route Not Found!",
  });
});

export default router;
