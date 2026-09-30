import { Router } from 'express';
import { proxyService } from '../../services/proxy.service';
import { MICROSERVICE_NAMES } from '../../utils/constants';
import { authContextMiddleware } from '../../middleware/auth-context.middleware';

const router = Router();

const restaurantProxy = proxyService.createProxyHandler(MICROSERVICE_NAMES.RESTAURANT_SERVICE);

router.get('/', restaurantProxy);
router.get('/:restaurantId', restaurantProxy);

router.post('/', authContextMiddleware, restaurantProxy);
router.patch('/:restaurantId', authContextMiddleware, restaurantProxy);
router.delete('/:restaurantId', authContextMiddleware, restaurantProxy);

export default router;
