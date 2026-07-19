import { Router } from 'express';
import { requireRestaurantRoles } from '../../middleware/actor-authorization.middleware';
import { proxyService } from '../../services/proxy.service';
import { MICROSERVICE_NAMES } from '../../utils/constants';

const router = Router();
const authProxy = proxyService.createProxyHandler(MICROSERVICE_NAMES.AUTH_SERVICE);

router.get('/restaurant-team', requireRestaurantRoles('super_admin', 'admin'), authProxy);
router.post(
  '/restaurant-team/invitations',
  requireRestaurantRoles('super_admin', 'admin'),
  authProxy
);
router.delete(
  '/restaurant-team/invitations/:id',
  requireRestaurantRoles('super_admin', 'admin'),
  authProxy
);
router.patch(
  '/restaurant-team/members/:id/role',
  requireRestaurantRoles('super_admin', 'admin'),
  authProxy
);
router.delete(
  '/restaurant-team/members/:id',
  requireRestaurantRoles('super_admin', 'admin'),
  authProxy
);

router.use('/', authProxy);

export default router;
