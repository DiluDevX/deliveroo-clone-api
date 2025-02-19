import express from "express";
const router = express.Router();

import {
  getAllRestaurants,
  createNewRestaurant,
  getARestaurant,
  updateARestaurantPartially,
  updateARestaurantFully,
  deleteARestaurant,
} from "../controllers/restaurant.controller";
import ValidateBody from "../middleware/validate-body.middleware";
import {
  createRestaurantRequestBodySchema,
  restaurantPathParamsSchema,
  updateRestaurantFullyRequestBodySchema,
  updateRestaurantPartiallyRequestBodySchema,
} from "../schema/restaurant.schema";
import { objectIdPathParamsSchema } from "../schema/common.schema";
import ValidateParams from "../middleware/validate-params.middleware";

router.get("/", getAllRestaurants);

router.post(
  "/",
  ValidateBody(createRestaurantRequestBodySchema),
  createNewRestaurant,
);

router.put(
  "/:id",
  ValidateParams(objectIdPathParamsSchema),
  ValidateBody(updateRestaurantFullyRequestBodySchema),
  updateARestaurantFully,
);

router.get(
  "/:orgID",
  ValidateParams(restaurantPathParamsSchema),
  getARestaurant,
);

router.patch(
  "/:id",
  ValidateParams(objectIdPathParamsSchema),
  ValidateBody(updateRestaurantPartiallyRequestBodySchema),
  updateARestaurantPartially,
);

router.delete(
  "/:id",
  ValidateParams(objectIdPathParamsSchema),
  deleteARestaurant,
);

export default router;
