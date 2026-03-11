'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.apiKeyMiddleware = apiKeyMiddleware;
const errors_1 = require('../utils/errors');
function apiKeyMiddleware(allowedKeys) {
  return (req, _res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey) {
      next(new errors_1.UnauthorizedError('API key is required'));
      return;
    }
    if (!allowedKeys.includes(apiKey)) {
      next(new errors_1.UnauthorizedError('Invalid API key'));
      return;
    }
    next();
  };
}
