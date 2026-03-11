'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.errorHandler = errorHandler;
const http_status_codes_1 = require('http-status-codes');
const errors_1 = require('../utils/errors');
const logger_1 = require('../utils/logger');
const environment_1 = require('../config/environment');
const constants_1 = require('../utils/constants');
function handleAppError(err, res) {
  const response = {
    success: false,
    message: err.message,
    code: err.code,
  };
  if (environment_1.environment.env !== constants_1.EnvironmentEnum.Production) {
    response.stack = err.stack;
  }
  res.status(err.statusCode).json(response);
}
function handleAxiosError(err, res) {
  if (err && typeof err === 'object' && 'isAxiosError' in err) {
    const axiosError = err;
    if (axiosError.response) {
      res.status(axiosError.response.status).json(axiosError.response.data);
      return true;
    }
  }
  return false;
}
function errorHandler(
  err,
  _req,
  res,
  _next // eslint-disable-line @typescript-eslint/no-unused-vars
) {
  var _a;
  logger_1.logger.error({
    message: err.message,
    stack: err.stack,
    name: err.name,
  });
  if (err instanceof errors_1.AppError) {
    handleAppError(err, res);
    return;
  }
  if (handleAxiosError(err, res)) {
    return;
  }
  const response = {
    success: false,
    message:
      environment_1.environment.env === constants_1.EnvironmentEnum.Production
        ? 'Internal Server Error'
        : (_a = err.message) !== null && _a !== void 0
          ? _a
          : 'Internal Server Error',
  };
  if (environment_1.environment.env !== constants_1.EnvironmentEnum.Production) {
    response.stack = err.stack;
  }
  res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
}
