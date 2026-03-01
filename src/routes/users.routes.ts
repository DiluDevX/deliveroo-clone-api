import express from "express";
const router = express.Router();
import ValidateBody from "../middleware/validate-body.middleware";
import ValidateParams from "../middleware/validate-params.middleware";
import {
  createUserRequestBodySchema,
  userUpdatePartiallyRequestBodySchema,
  userUpdatePartiallyRequestParamsSchema,
  deleteUserRequestParamsSchema,
  getUserRequestParamsSchema,
} from "../schema/users.schema";
import {
  getAllUsers,
  createUser,
  getAnUser,
  updateAnUserPartially,
  deleteAnUser,
} from "../controllers/users.controller";

router.get("/", getAllUsers);

router.post("/", ValidateBody(createUserRequestBodySchema), createUser);

router.get("/:id", ValidateParams(getUserRequestParamsSchema), getAnUser);

router.patch(
  "/:id",
  ValidateParams(userUpdatePartiallyRequestParamsSchema),
  ValidateBody(userUpdatePartiallyRequestBodySchema),
  updateAnUserPartially,
);

router.delete(
  "/:id",
  ValidateParams(deleteUserRequestParamsSchema),
  deleteAnUser,
);

export default router;
