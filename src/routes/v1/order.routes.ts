import { Router } from 'express';
import { proxyService } from '../../services/proxy.service';
import { MICROSERVICE_NAMES } from '../../utils/constants';
import {
  requireActorTypes,
  requirePlatformAdminOrRestaurantRoles,
} from '../../middleware/actor-authorization.middleware';

const router = Router();
const orderProxy = proxyService.createProxyHandler(MICROSERVICE_NAMES.ORDER_SERVICE);

router.post('/', requireActorTypes('PLATFORM_ADMIN'), orderProxy);
router.post('/:orderId/prepare-payment', requireActorTypes('USER'), orderProxy);
router.get(
  '/restaurant/:restaurantId/summary',
  requirePlatformAdminOrRestaurantRoles('employee', 'finance', 'admin', 'super_admin'),
  orderProxy
);
router.get(
  '/restaurant/:restaurantId/analytics',
  requirePlatformAdminOrRestaurantRoles('finance', 'admin', 'super_admin'),
  orderProxy
);
router.get(
  '/restaurant/:restaurantId',
  requirePlatformAdminOrRestaurantRoles('employee', 'admin', 'super_admin'),
  orderProxy
);
router.use('/', orderProxy);

export default router;
