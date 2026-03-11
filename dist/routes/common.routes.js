'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = require('express');
const common_controller_1 = require('../controllers/common.controller');
const router = (0, express_1.Router)();
router.get('/health', common_controller_1.healthCheck);
router.use(common_controller_1.fallback);
exports.default = router;
