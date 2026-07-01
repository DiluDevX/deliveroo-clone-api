import { Router } from 'express';
import authRoutes from './v1/auth.routes';
import userRoutes from './v1/user.routes';
import orderRoutes from './v1/order.routes';
import cartRoutes from './v1/cart.routes';
import paymentRoutes from './v1/payment.routes';
import restaurantProxyRoutes from './v1/restaurant.proxy.routes';
import categoryProxyRoutes from './v1/category.proxy.routes';
import dishProxyRoutes from './v1/dish.proxy.routes';
import commonRoutes from './common.routes';
import { apiKeyMiddleware } from '../middleware/api-key.middleware';
import { authContextMiddleware } from '../middleware/auth-context.middleware';
import { environment } from '../config/environment';

const router = Router();

// Auth routes: Public, require API key only
router.use('/api/auth', apiKeyMiddleware([environment.bffAPIKey]), authRoutes);

// User routes: Protected, require both API key and valid access token
router.use(
  '/api/users',
  apiKeyMiddleware([environment.bffAPIKey]),
  authContextMiddleware,
  userRoutes
);

// Order routes: Protected, require both API key and valid access token
router.use(
  '/api/orders',
  apiKeyMiddleware([environment.bffAPIKey]),
  authContextMiddleware,
  orderRoutes
);

// Cart routes: Protected, require both API key and valid access token
router.use(
  '/api/cart',
  apiKeyMiddleware([environment.bffAPIKey]),
  authContextMiddleware,
  cartRoutes
);

// Payment routes: Protected, require both API key and valid access token
router.use(
  '/api/payments',
  apiKeyMiddleware([environment.bffAPIKey]),
  authContextMiddleware,
  paymentRoutes
);

// Restaurant routes: Public, require API key only
router.use('/api/restaurants', apiKeyMiddleware([environment.bffAPIKey]), restaurantProxyRoutes);

// Menu routes: Public reads, authenticated mutations handled in route modules
router.use('/api/categories', apiKeyMiddleware([environment.bffAPIKey]), categoryProxyRoutes);
router.use('/api/dishes', apiKeyMiddleware([environment.bffAPIKey]), dishProxyRoutes);

router.use(commonRoutes);

export default router;
