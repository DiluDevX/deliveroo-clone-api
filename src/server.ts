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

app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/restaurants", restaurantRoutes);
app.use("/dishes", dishRoutes);
app.use("/categories", categoryRoutes);
app.use("/users", usersRoutes);
app.use("/cart", cartRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(commonRoutes);

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
