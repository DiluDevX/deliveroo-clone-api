import { Router } from 'express';
import { proxyService } from '../../services/proxy.service';
import { MICROSERVICE_NAMES } from '../../utils/constants';

const router = Router();

router.use('/', proxyService.createProxyHandler(MICROSERVICE_NAMES.PAYMENT_SERVICE));

export default router;
