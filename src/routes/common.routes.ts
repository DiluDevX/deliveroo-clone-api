import express from "express";

const router = express.Router();

router.get("/", (_req, res) => {
  res.status(200).json({
    message: "OK",
  });
});

router.all("*", (_req, res) => {
  res.status(404).json({
    message: "Route Not Found!",
  });
});

export default router;
