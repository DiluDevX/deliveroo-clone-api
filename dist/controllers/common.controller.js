'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.fallback = exports.healthCheck = void 0;
const environment_1 = require('../config/environment');
const healthCheck = (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is healthy',
    data: {
      service: environment_1.environment.serviceName,
      version: environment_1.environment.version,
      env: environment_1.environment.env,
    },
  });
};
exports.healthCheck = healthCheck;
const fallback = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.path} not found`,
  });
};
exports.fallback = fallback;
