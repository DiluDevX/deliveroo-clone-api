'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = require('express');
const proxy_service_1 = require('../../services/proxy.service');
const constants_1 = require('../../utils/constants');
const router = (0, express_1.Router)();
router.use(
  '/',
  proxy_service_1.proxyService.createProxyHandler(constants_1.MICROSERVICE_NAMES.AUTH_SERVICE)
);
exports.default = router;
