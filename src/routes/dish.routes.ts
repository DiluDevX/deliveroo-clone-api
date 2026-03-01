import express from "express";
import ValidateBody from "../middleware/validate-body.middleware";
import {
  getAllDishes,
  createNewDish,
  getADish,
  updateDishPartially,
  updateDishFully,
  deleteDish,
} from "../controllers/dish.controller";
import {
  CreateDishRequestBodySchema,
  DishQueryParamsSchema,
  FullyUpdateDishRequestBodySchema,
  PartiallyUpdateDishRequestBodySchema,
} from "../schema/dish.schema";
import ValidateParams from "../middleware/validate-params.middleware";
import { objectIdPathParamsSchema } from "../schema/common.schema";
import ValidateQuery from "../middleware/validate-query.middleware";
import { AuthorizeRestaurantAdmin } from "../middleware/authorize-admin.middleware";

const router = express.Router();

router.get("/", ValidateQuery(DishQueryParamsSchema), getAllDishes);

router.post(
  "/",
  AuthorizeRestaurantAdmin(),
  ValidateBody(CreateDishRequestBodySchema),
  createNewDish,
);

router.put(
  "/:id",
  AuthorizeRestaurantAdmin(),
  ValidateParams(objectIdPathParamsSchema),
  ValidateBody(FullyUpdateDishRequestBodySchema),
  updateDishFully,
);

router.get(
  "/:id",
  ValidateParams(objectIdPathParamsSchema),
  getADish,
  ValidateQuery(DishQueryParamsSchema),
);

router.patch(
  "/:id",
  AuthorizeRestaurantAdmin(),
  ValidateParams(objectIdPathParamsSchema),
  ValidateBody(PartiallyUpdateDishRequestBodySchema),
  updateDishPartially,
);

router.delete(
  "/:id",
  AuthorizeRestaurantAdmin(),
  ValidateParams(objectIdPathParamsSchema),
  deleteDish,
);

export default router;
