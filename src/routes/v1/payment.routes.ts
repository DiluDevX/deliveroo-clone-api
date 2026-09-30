import { Router } from 'express';
import { createPaymentIntent } from '../../controllers/v1/payment.controller';
import { proxyService } from '../../services/proxy.service';
import { MICROSERVICE_NAMES } from '../../utils/constants';

const router = Router();

router.post('/create-intent', createPaymentIntent);

router.use('/', proxyService.createProxyHandler(MICROSERVICE_NAMES.PAYMENT_SERVICE));

export default router;
