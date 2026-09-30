import { Router } from 'express';
import { proxyService } from '../../services/proxy.service';
import { MICROSERVICE_NAMES } from '../../utils/constants';
import { requireSafeOrderRouteParams } from '../../middleware/order-route-params.middleware';

const router = Router();

const cartProxy = proxyService.createProxyHandler(MICROSERVICE_NAMES.ORDER_SERVICE);

router.get('/', cartProxy);
router.post('/', cartProxy);
router.post('/sync', cartProxy);
router.put('/items/:cartItemId', requireSafeOrderRouteParams, cartProxy);
router.delete('/items/:cartItemId', requireSafeOrderRouteParams, cartProxy);
router.delete('/', cartProxy);
router.post('/checkout', cartProxy);

export default router;
