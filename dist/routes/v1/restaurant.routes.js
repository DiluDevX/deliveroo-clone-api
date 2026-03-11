'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const router = express_1.default.Router();
const restaurant_controller_1 = require('../../controllers/v1/restaurant.controller');
const validate_body_middleware_1 = __importDefault(
  require('../../middleware/validate-body.middleware')
);
const restaurant_schema_1 = require('../../schema/restaurant.schema');
const common_schema_1 = require('../../schema/common.schema');
const validate_params_middleware_1 = __importDefault(
  require('../../middleware/validate-params.middleware')
);
const authorize_admin_middleware_1 = require('../../middleware/authorize-admin.middleware');
router.get('/', restaurant_controller_1.getAllRestaurants);
router.post(
  '/',
  (0, authorize_admin_middleware_1.authorizeRole)('admin'),
  (0, validate_body_middleware_1.default)(restaurant_schema_1.createRestaurantRequestBodySchema),
  restaurant_controller_1.createNewRestaurant
);
router.put(
  '/:id',
  (0, authorize_admin_middleware_1.authorizeRole)('admin'),
  (0, validate_params_middleware_1.default)(common_schema_1.objectIdPathParamsSchema),
  (0, validate_body_middleware_1.default)(
    restaurant_schema_1.updateRestaurantFullyRequestBodySchema
  ),
  restaurant_controller_1.updateARestaurantFully
);
router.get(
  '/:orgID',
  (0, validate_params_middleware_1.default)(restaurant_schema_1.restaurantPathParamsSchema),
  restaurant_controller_1.getARestaurant
);
router.patch(
  '/:id',
  (0, authorize_admin_middleware_1.authorizeRole)('admin'),
  (0, validate_params_middleware_1.default)(common_schema_1.objectIdPathParamsSchema),
  (0, validate_body_middleware_1.default)(
    restaurant_schema_1.updateRestaurantPartiallyRequestBodySchema
  ),
  restaurant_controller_1.updateARestaurantPartially
);
router.delete(
  '/:id',
  (0, authorize_admin_middleware_1.authorizeRole)('admin'),
  (0, validate_params_middleware_1.default)(common_schema_1.objectIdPathParamsSchema),
  restaurant_controller_1.deleteARestaurant
);
exports.default = router;
