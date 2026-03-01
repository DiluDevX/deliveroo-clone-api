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
import { AuthorizeRestaurantAdmin } from "../middleware/authorize-admin.middleware";

router.get("/", getAllRestaurants);

router.post(
  "/",
  ValidateBody(createRestaurantRequestBodySchema),
  createNewRestaurant,
);

router.put(
  "/:id",
  AuthorizeRestaurantAdmin(),
  ValidateParams(objectIdPathParamsSchema),
  ValidateBody(updateRestaurantFullyRequestBodySchema),
  updateARestaurantFully,
);

router.get(
  "/:restaurantId",
  ValidateParams(restaurantPathParamsSchema),
  getARestaurant,
);

router.patch(
  "/:id",
  AuthorizeRestaurantAdmin(),
  ValidateParams(objectIdPathParamsSchema),
  ValidateBody(updateRestaurantPartiallyRequestBodySchema),
  updateARestaurantPartially,
);

router.delete(
  "/:id",
  AuthorizeRestaurantAdmin(),
  ValidateParams(objectIdPathParamsSchema),
  deleteARestaurant,
);

export default router;
