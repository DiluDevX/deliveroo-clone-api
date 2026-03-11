import { Router } from 'express';
import authRoutes from './v1/auth.routes';
import userRoutes from './v1/user.routes';
import orderRoutes from './v1/order.routes';
import cartRoutes from './v1/cart.routes';
import paymentRoutes from './v1/payment.routes';
import commonRoutes from './common.routes';
import restaurantRoutes from './v1/restaurant.routes';
import dishRoutes from './v1/dish.routes';
import categoryRoutes from './v1/category.routes';
import { apiKeyMiddleware } from '../middleware/api-key.middleware';
import { environment } from '../config/environment';

const router = Router();

router.use(
  '/v1/auth',
  apiKeyMiddleware([environment.bffAPIKey, environment.authService.apiKey]),
  authRoutes
);
router.use(
  '/v1/users',
  apiKeyMiddleware([environment.bffAPIKey, environment.authService.apiKey]),
  userRoutes
);
router.use(
  '/v1/orders',
  apiKeyMiddleware([environment.bffAPIKey, environment.orderService.apiKey]),
  orderRoutes
);
router.use(
  '/v1/cart',
  apiKeyMiddleware([environment.bffAPIKey, environment.orderService.apiKey]),
  cartRoutes
);
router.use(
  '/api/v1/payments',
  apiKeyMiddleware([environment.bffAPIKey, environment.paymentService.apiKey]),
  paymentRoutes
);

router.use('/v1/restaurants', apiKeyMiddleware([environment.bffAPIKey]), restaurantRoutes);
router.use('/v1/dishes', apiKeyMiddleware([environment.bffAPIKey]), dishRoutes);
router.use('/v1/categories', apiKeyMiddleware([environment.bffAPIKey]), categoryRoutes);

router.use(commonRoutes);

export default router;
