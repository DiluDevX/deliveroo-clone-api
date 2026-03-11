'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.MICROSERVICE_NAMES = exports.EnvironmentEnum = void 0;
var EnvironmentEnum;
(function (EnvironmentEnum) {
  EnvironmentEnum['Development'] = 'development';
  EnvironmentEnum['Production'] = 'production';
  EnvironmentEnum['Test'] = 'test';
})(EnvironmentEnum || (exports.EnvironmentEnum = EnvironmentEnum = {}));
exports.MICROSERVICE_NAMES = {
  AUTH_SERVICE: 'auth-service',
  ORDER_SERVICE: 'order-service',
  PAYMENT_SERVICE: 'payment-service',
};
