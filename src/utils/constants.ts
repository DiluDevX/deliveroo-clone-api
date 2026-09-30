export enum EnvironmentEnum {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export const MICROSERVICE_NAMES = {
  AUTH_SERVICE: 'auth-service',
  ORDER_SERVICE: 'order-service',
  PAYMENT_SERVICE: 'payment-service',
  RESTAURANT_SERVICE: 'restaurant-service',
} as const;
