import express from 'express';
import ValidateBody from '../../middleware/validate-body.middleware';
import {
  CreateCategoryRequestBodySchema,
  FullyUpdateCategoryRequestBodySchema,
  PartiallyUpdateCategoryRequestBodySchema,
} from '../../schema/category.schema';
import ValidateParams from '../../middleware/validate-params.middleware';
import { objectIdPathParamsSchema } from '../../schema/common.schema';
import { authorizeRole } from '../../middleware/authorize-admin.middleware';
import {
  getAllCategories,
  createNewCategory,
  updateCategoryFully,
  getCategory,
  updateCategoryPartially,
  deleteCategory,
} from '../../controllers/v1/category.controller';

const router = express.Router();

router.get('/', getAllCategories);

router.post(
  '/',
  authorizeRole('admin'),
  ValidateBody(CreateCategoryRequestBodySchema),
  createNewCategory
);

router.put(
  '/:id',
  authorizeRole('admin'),
  ValidateParams(objectIdPathParamsSchema),
  ValidateBody(FullyUpdateCategoryRequestBodySchema),
  updateCategoryFully
);

router.get('/:id', ValidateParams(objectIdPathParamsSchema), getCategory);

router.patch(
  '/:id',
  authorizeRole('admin'),
  ValidateParams(objectIdPathParamsSchema),
  ValidateBody(PartiallyUpdateCategoryRequestBodySchema),
  updateCategoryPartially
);

router.delete(
  '/:id',
  authorizeRole('admin'),
  ValidateParams(objectIdPathParamsSchema),
  deleteCategory
);

export default router;
