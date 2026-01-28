import express from "express";
import mongoose from "mongoose";

import dotenv from "dotenv";

import commonRoutes from "./routes/common.routes";
import restaurantRoutes from "./routes/restaurant.routes";
import dishRoutes from "./routes/dish.routes";
import categoryRoutes from "./routes/category.routes";
import usersRoutes from "./routes/users.routes";
import authRoutes from "./routes/auth.routes";
import cartRoutes from "./routes/cart.routes";
import cors from "cors";
import { swaggerUi, swaggerSpec } from "./swagger";

dotenv.config();

const app = express();
const port = 4000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/dishes", dishRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", commonRoutes);

const startServer = async () => {
  try {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error("DATABASE_URL is not defined");
    }
    await mongoose.connect(databaseUrl);
    app.listen(port, () => {
      console.log(`deliveroo-api listening on port ${port}`);
    });
  } catch (error) {
    console.log(error, "error");
  }
};

startServer();
