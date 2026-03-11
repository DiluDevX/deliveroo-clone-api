'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = require('express');
const auth_routes_1 = __importDefault(require('./v1/auth.routes'));
const user_routes_1 = __importDefault(require('./v1/user.routes'));
const order_routes_1 = __importDefault(require('./v1/order.routes'));
const cart_routes_1 = __importDefault(require('./v1/cart.routes'));
const payment_routes_1 = __importDefault(require('./v1/payment.routes'));
const common_routes_1 = __importDefault(require('./common.routes'));
const restaurant_routes_1 = __importDefault(require('./v1/restaurant.routes'));
const dish_routes_1 = __importDefault(require('./v1/dish.routes'));
const category_routes_1 = __importDefault(require('./v1/category.routes'));
const api_key_middleware_1 = require('../middleware/api-key.middleware');
const environment_1 = require('../config/environment');
const router = (0, express_1.Router)();
router.use(
  '/v1/auth',
  (0, api_key_middleware_1.apiKeyMiddleware)([
    environment_1.environment.bffAPIKey,
    environment_1.environment.authService.apiKey,
  ]),
  auth_routes_1.default
);
router.use(
  '/v1/users',
  (0, api_key_middleware_1.apiKeyMiddleware)([
    environment_1.environment.bffAPIKey,
    environment_1.environment.authService.apiKey,
  ]),
  user_routes_1.default
);
router.use(
  '/v1/orders',
  (0, api_key_middleware_1.apiKeyMiddleware)([
    environment_1.environment.bffAPIKey,
    environment_1.environment.orderService.apiKey,
  ]),
  order_routes_1.default
);
router.use(
  '/v1/cart',
  (0, api_key_middleware_1.apiKeyMiddleware)([
    environment_1.environment.bffAPIKey,
    environment_1.environment.orderService.apiKey,
  ]),
  cart_routes_1.default
);
router.use(
  '/api/v1/payments',
  (0, api_key_middleware_1.apiKeyMiddleware)([
    environment_1.environment.bffAPIKey,
    environment_1.environment.paymentService.apiKey,
  ]),
  payment_routes_1.default
);
router.use(
  '/v1/restaurants',
  (0, api_key_middleware_1.apiKeyMiddleware)([environment_1.environment.bffAPIKey]),
  restaurant_routes_1.default
);
router.use(
  '/v1/dishes',
  (0, api_key_middleware_1.apiKeyMiddleware)([environment_1.environment.bffAPIKey]),
  dish_routes_1.default
);
router.use(
  '/v1/categories',
  (0, api_key_middleware_1.apiKeyMiddleware)([environment_1.environment.bffAPIKey]),
  category_routes_1.default
);
router.use(common_routes_1.default);
exports.default = router;
