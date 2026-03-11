'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const validate_body_middleware_1 = __importDefault(
  require('../../middleware/validate-body.middleware')
);
const dish_controller_1 = require('../../controllers/v1/dish.controller');
const dish_schema_1 = require('../../schema/dish.schema');
const validate_params_middleware_1 = __importDefault(
  require('../../middleware/validate-params.middleware')
);
const common_schema_1 = require('../../schema/common.schema');
const validate_query_middleware_1 = __importDefault(
  require('../../middleware/validate-query.middleware')
);
const authorize_admin_middleware_1 = require('../../middleware/authorize-admin.middleware');
const router = express_1.default.Router();
router.get(
  '/',
  (0, validate_query_middleware_1.default)(dish_schema_1.DishQueryParamsSchema),
  dish_controller_1.getAllDishes
);
router.post(
  '/',
  (0, authorize_admin_middleware_1.authorizeRole)('admin'),
  (0, validate_body_middleware_1.default)(dish_schema_1.CreateDishRequestBodySchema),
  dish_controller_1.createNewDish
);
router.put(
  '/:id',
  (0, authorize_admin_middleware_1.authorizeRole)('admin'),
  (0, validate_params_middleware_1.default)(common_schema_1.objectIdPathParamsSchema),
  (0, validate_body_middleware_1.default)(dish_schema_1.FullyUpdateDishRequestBodySchema),
  dish_controller_1.updateDishFully
);
router.get(
  '/:id',
  (0, validate_params_middleware_1.default)(common_schema_1.objectIdPathParamsSchema),
  dish_controller_1.getADish,
  (0, validate_query_middleware_1.default)(dish_schema_1.DishQueryParamsSchema)
);
router.patch(
  '/:id',
  (0, authorize_admin_middleware_1.authorizeRole)('admin'),
  (0, validate_params_middleware_1.default)(common_schema_1.objectIdPathParamsSchema),
  (0, validate_body_middleware_1.default)(dish_schema_1.PartiallyUpdateDishRequestBodySchema),
  dish_controller_1.updateDishPartially
);
router.delete(
  '/:id',
  (0, authorize_admin_middleware_1.authorizeRole)('admin'),
  (0, validate_params_middleware_1.default)(common_schema_1.objectIdPathParamsSchema),
  dish_controller_1.deleteDish
);
exports.default = router;
