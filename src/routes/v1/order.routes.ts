import { Router } from 'express';
import { proxyService } from '../../services/proxy.service';
import { MICROSERVICE_NAMES } from '../../utils/constants';
import {
  requireActorTypes,
  requirePlatformAdminOrRestaurantRoles,
} from '../../middleware/actor-authorization.middleware';
import { requireSafeOrderRouteParams } from '../../middleware/order-route-params.middleware';

const router = Router();
const orderProxy = proxyService.createProxyHandler(MICROSERVICE_NAMES.ORDER_SERVICE);

router.post('/', requireActorTypes('PLATFORM_ADMIN'), orderProxy);
router.post(
  '/:orderId/prepare-payment',
  requireSafeOrderRouteParams,
  requireActorTypes('USER'),
  orderProxy
);
router.get(
  '/restaurant/:restaurantId/summary',
  requireSafeOrderRouteParams,
  requirePlatformAdminOrRestaurantRoles('employee', 'finance', 'admin', 'super_admin'),
  orderProxy
);
router.get(
  '/restaurant/:restaurantId/analytics',
  requireSafeOrderRouteParams,
  requirePlatformAdminOrRestaurantRoles('finance', 'admin', 'super_admin'),
  orderProxy
);
router.get(
  '/restaurant/:restaurantId',
  requireSafeOrderRouteParams,
  requirePlatformAdminOrRestaurantRoles('employee', 'admin', 'super_admin'),
  orderProxy
);
router.get('/driver/:driverId', requireSafeOrderRouteParams, orderProxy);
router.get('/', orderProxy);
router.get('/:orderId', requireSafeOrderRouteParams, orderProxy);
router.patch('/:orderId/cancel', requireSafeOrderRouteParams, orderProxy);
router.patch('/:orderId/status', requireSafeOrderRouteParams, orderProxy);
router.patch('/:orderId/assign-driver', requireSafeOrderRouteParams, orderProxy);

export default router;
