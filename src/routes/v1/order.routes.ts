import { Router } from 'express';
import { proxyService } from '../../services/proxy.service';
import { MICROSERVICE_NAMES } from '../../utils/constants';
import { requireActorTypes } from '../../middleware/actor-authorization.middleware';

const router = Router();
const orderProxy = proxyService.createProxyHandler(MICROSERVICE_NAMES.ORDER_SERVICE);

router.post('/', requireActorTypes('PLATFORM_ADMIN'), orderProxy);
router.post('/:orderId/prepare-payment', requireActorTypes('USER'), orderProxy);
router.use('/', orderProxy);

export default router;
