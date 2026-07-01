import { Router } from 'express';
import { authContextMiddleware } from '../../middleware/auth-context.middleware';
import { proxyService } from '../../services/proxy.service';
import { MICROSERVICE_NAMES } from '../../utils/constants';

const router = Router();
const restaurantProxy = proxyService.createProxyHandler(MICROSERVICE_NAMES.RESTAURANT_SERVICE);

router.get('/', restaurantProxy);
router.get('/:dishId', restaurantProxy);

router.post('/', authContextMiddleware, restaurantProxy);
router.patch('/:dishId', authContextMiddleware, restaurantProxy);
router.delete('/:dishId', authContextMiddleware, restaurantProxy);

export default router;
