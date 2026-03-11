'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const category_controller_1 = __importDefault(require('../../controllers/v1/category.controller'));
const validate_body_middleware_1 = __importDefault(
  require('../../middleware/validate-body.middleware')
);
const category_schema_1 = require('../../schema/category.schema');
const validate_params_middleware_1 = __importDefault(
  require('../../middleware/validate-params.middleware')
);
const common_schema_1 = require('../../schema/common.schema');
const authorize_admin_middleware_1 = require('../../middleware/authorize-admin.middleware');
const {
  getAllCategories,
  createNewCategory,
  getCategory,
  updateCategoryPartially,
  updateCategoryFully,
  deleteCategory,
} = category_controller_1.default;
const router = express_1.default.Router();
router.get('/', getAllCategories);
router.post(
  '/',
  (0, authorize_admin_middleware_1.authorizeRole)('admin'),
  (0, validate_body_middleware_1.default)(category_schema_1.CreateCategoryRequestBodySchema),
  createNewCategory
);
router.put(
  '/:id',
  (0, authorize_admin_middleware_1.authorizeRole)('admin'),
  (0, validate_params_middleware_1.default)(common_schema_1.objectIdPathParamsSchema),
  (0, validate_body_middleware_1.default)(category_schema_1.FullyUpdateCategoryRequestBodySchema),
  updateCategoryFully
);
router.get(
  '/:id',
  (0, validate_params_middleware_1.default)(common_schema_1.objectIdPathParamsSchema),
  getCategory
);
router.patch(
  '/:id',
  (0, authorize_admin_middleware_1.authorizeRole)('admin'),
  (0, validate_params_middleware_1.default)(common_schema_1.objectIdPathParamsSchema),
  (0, validate_body_middleware_1.default)(
    category_schema_1.PartiallyUpdateCategoryRequestBodySchema
  ),
  updateCategoryPartially
);
router.delete(
  '/:id',
  (0, authorize_admin_middleware_1.authorizeRole)('admin'),
  (0, validate_params_middleware_1.default)(common_schema_1.objectIdPathParamsSchema),
  deleteCategory
);
exports.default = router;
