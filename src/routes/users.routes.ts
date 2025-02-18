import express from "express";
const router = express.Router();
import {
  deleteAnUser,
  getAllUsers,
  getAnUser,
  updateAnUserPartially,
  updateAnUserFully,
} from "../controllers/users.controller";
import ValidateBody from "../middleware/validate-body.middleware";
import ValidateParams from "../middleware/validate-params.middleware";
import { objectIdPathParamsSchema } from "../schema/common.schema";
import {
  updateUserFullyRequestBodySchema,
  updateUserPartiallyRequestBodySchema,
} from "../schema/users.schema";

router.get("/", getAllUsers);

router.get("/:id", ValidateParams(objectIdPathParamsSchema), getAnUser);

router.patch(
  "/:id",
  ValidateParams(objectIdPathParamsSchema),
  ValidateBody(updateUserPartiallyRequestBodySchema),
  updateAnUserPartially,
);

router.put(
  "/:id",
  ValidateParams(objectIdPathParamsSchema),
  ValidateBody(updateUserFullyRequestBodySchema),
  updateAnUserFully,
);

router.delete("/:id", ValidateParams(objectIdPathParamsSchema), deleteAnUser);

export default router;
