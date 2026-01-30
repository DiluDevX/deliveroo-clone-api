import express from "express";

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
  res.status(200).json({
    message: "OK",
    time: new Date().toISOString(),
  });
});

router.all("*", (_req, res) => {
  res.status(404).json({
    message: "Route Not Found!",
  });
});

export default router;
