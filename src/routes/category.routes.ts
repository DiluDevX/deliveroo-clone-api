import express from "express";
import categoryController from "../controllers/category.controller";
import ValidateBody from "../middleware/validate-body.middleware";
import {
  CreateCategoryRequestBodySchema,
  FullyUpdateCategoryRequestBodySchema,
  PartiallyUpdateCategoryRequestBodySchema,
} from "../schema/category.schema";
import ValidateParams from "../middleware/validate-params.middleware";
import { objectIdPathParamsSchema } from "../schema/common.schema";
import { AuthorizeRestaurantAdmin } from "../middleware/authorize-admin.middleware";
const {
  getAllCategories,
  createNewCategory,
  getCategory,
  updateCategoryPartially,
  updateCategoryFully,
  deleteCategory,
} = categoryController;

const router = express.Router();

router.get("/", getAllCategories);

router.post(
  "/",
  AuthorizeRestaurantAdmin(),
  ValidateBody(CreateCategoryRequestBodySchema),
  createNewCategory,
);

router.put(
  "/:id",
  AuthorizeRestaurantAdmin(),
  ValidateParams(objectIdPathParamsSchema),
  ValidateBody(FullyUpdateCategoryRequestBodySchema),
  updateCategoryFully,
);

router.get("/:id", ValidateParams(objectIdPathParamsSchema), getCategory);

router.patch(
  "/:id",
  AuthorizeRestaurantAdmin(),
  ValidateParams(objectIdPathParamsSchema),
  ValidateBody(PartiallyUpdateCategoryRequestBodySchema),
  updateCategoryPartially,
);

router.delete(
  "/:id",
  AuthorizeRestaurantAdmin(),
  ValidateParams(objectIdPathParamsSchema),
  deleteCategory,
);

export default router;
