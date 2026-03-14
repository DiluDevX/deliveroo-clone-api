import { Router } from 'express';
import authRoutes from './v1/auth.routes';
import userRoutes from './v1/user.routes';
import orderRoutes from './v1/order.routes';
import cartRoutes from './v1/cart.routes';
import paymentRoutes from './v1/payment.routes';
import commonRoutes from './common.routes';
import restaurantProxyRoutes from './v1/restaurant.proxy.routes';
import { apiKeyMiddleware } from '../middleware/api-key.middleware';
import { environment } from '../config/environment';

const router = Router();

router.use('/api/auth', apiKeyMiddleware([environment.bffAPIKey]), authRoutes);
router.use('/api/users', apiKeyMiddleware([environment.bffAPIKey]), userRoutes);
router.use('/api/orders', apiKeyMiddleware([environment.bffAPIKey]), orderRoutes);
router.use('/api/cart', apiKeyMiddleware([environment.bffAPIKey]), cartRoutes);
router.use('/api/payments', apiKeyMiddleware([environment.bffAPIKey]), paymentRoutes);

router.use('/api/restaurants', restaurantProxyRoutes);

router.use(commonRoutes);

export default router;
