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
import { authorizeRole } from "../middleware/authorize-role.middleware";

const router = express.Router();

router.get("/", ValidateQuery(DishQueryParamsSchema), getAllDishes);

router.post(
  "/",
  authorizeRole("admin"),
  ValidateBody(CreateDishRequestBodySchema),
  createNewDish,
);

router.put(
  "/:id",
  authorizeRole("admin"),
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
  authorizeRole("admin"),
  ValidateParams(objectIdPathParamsSchema),
  ValidateBody(PartiallyUpdateDishRequestBodySchema),
  updateDishPartially,
);

router.delete(
  "/:id",
  authorizeRole("admin"),
  ValidateParams(objectIdPathParamsSchema),
  deleteDish,
);

export default router;
