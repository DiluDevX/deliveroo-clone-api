import { createServer, request as httpRequest, Server } from 'node:http';
import express, { NextFunction, Request, Response } from 'express';
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { ActorContextDTO } from '../src/dtos/auth.dto';
import { AppError } from '../src/utils/errors';
import { requireActorTypes } from '../src/middleware/actor-authorization.middleware';

const { proxyHandler } = vi.hoisted(() => ({
  proxyHandler: vi.fn((_req: Request, res: Response) => res.status(204).end()),
}));

vi.mock('../src/services/proxy.service', () => ({
  proxyService: { createProxyHandler: () => proxyHandler },
}));

import orderRoutes from '../src/routes/v1/order.routes';
import cartRoutes from '../src/routes/v1/cart.routes';

const user: ActorContextDTO = {
  userId: 'user-1',
  actorId: 'user-1',
  actorUserId: 'user-1',
  actorType: 'USER',
  email: 'user@example.test',
  firstName: 'Test',
  lastName: 'User',
};
const admin: ActorContextDTO = { ...user, actorType: 'PLATFORM_ADMIN' };
const restaurant: ActorContextDTO = {
  ...user,
  actorType: 'RESTAURANT',
  restaurantId: 'restaurant-1',
  restaurantRole: 'finance',
};
const restaurantEmployee: ActorContextDTO = { ...restaurant, restaurantRole: 'employee' };

let actor: ActorContextDTO = user;
let server: Server;
let port: number;

async function request(method: string, path: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const outgoing = httpRequest(
      { hostname: '127.0.0.1', port, method, path },
      (incoming: { statusCode?: number; resume: () => void }) => {
        incoming.resume();
        resolve(incoming.statusCode ?? 0);
      }
    );
    outgoing.on('error', reject);
    outgoing.end();
  });
}

beforeAll(async () => {
  const app = express();
  app.use((req, _res, next) => {
    Object.assign(req, { actor });
    next();
  });
  app.use('/api/orders', orderRoutes);
  app.use('/api/cart', requireActorTypes('USER'), cartRoutes);
  app.use((_req, res) => res.sendStatus(404));
  app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
    void _next;
    res.sendStatus(error instanceof AppError ? error.statusCode : 500);
  });
  server = createServer(app);
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  if (!address || typeof address === 'string') throw new Error('Expected loopback listener');
  port = address.port;
});

describe('cart proxy routing boundary', () => {
  it.each([
    ['POST', '/api/cart/%2e%2e/orders/abc-123/payment-status'],
    ['POST', '/api/cart/%2E%2E/orders/abc-123/payment-status'],
    ['POST', '/api/cart/.%2e/orders/abc-123/payment-status'],
    ['POST', '/api/cart/../orders/abc-123/payment-status'],
    ['POST', '/api/cart/%252e%252e/orders/abc-123/payment-status'],
    ['POST', '/api/cart/unknown'],
    ['PUT', '/api/cart/checkout'],
    ['PATCH', '/api/cart/items/item-1'],
  ])('does not proxy %s %s', async (method, path) => {
    expect(await request(method, path)).toBe(404);
    expect(proxyHandler).not.toHaveBeenCalled();
  });

  it.each([
    ['GET', '/api/cart/'],
    ['POST', '/api/cart/'],
    ['POST', '/api/cart/sync'],
    ['POST', '/api/cart/checkout'],
    ['PUT', '/api/cart/items/item-1'],
    ['DELETE', '/api/cart/items/item-1'],
    ['DELETE', '/api/cart/'],
  ])('still proxies %s %s', async (method, path) => {
    expect(await request(method, path)).toBe(204);
    expect(proxyHandler).toHaveBeenCalledTimes(1);
  });

  it.each([
    '/api/cart/items/abc%2fdef',
    '/api/cart/items/abc%252fdef',
    '/api/cart/items/%2e%2e',
    `/api/cart/items/${'x'.repeat(65)}`,
  ])('rejects malformed cart item ID in %s', async (path) => {
    expect(await request('DELETE', path)).not.toBe(204);
    expect(proxyHandler).not.toHaveBeenCalled();
  });

  it('keeps the outer user actor guard', async () => {
    actor = admin;
    expect(await request('POST', '/api/cart/checkout')).toBe(403);
    expect(proxyHandler).not.toHaveBeenCalled();
  });
});

afterAll(async () => {
  await new Promise<void>((resolve, reject) =>
    server.close((error) => (error ? reject(error) : resolve()))
  );
});

beforeEach(() => {
  actor = user;
  proxyHandler.mockClear();
});

describe('order proxy routing boundary', () => {
  it.each([
    ['POST', '/api/orders/abc-123/payment-status'],
    ['POST', '/api/orders/abc-123/payment-status/'],
    ['POST', '/api/orders/abc-123/PAYMENT-STATUS'],
    ['POST', '/api/orders/abc-123/payment%2dstatus'],
    ['POST', '/api/orders/abc-123/payment%252dstatus'],
    ['GET', '/api/orders/abc-123/payment-status'],
    ['PATCH', '/api/orders/abc-123/payment-status'],
    ['POST', '/api/orders/abc-123/unknown'],
    ['GET', '/api/orders/abc-123/unknown'],
    ['DELETE', '/api/orders/abc-123'],
    ['PUT', '/api/orders/abc-123/status'],
    ['HEAD', '/api/orders/abc-123/payment-status'],
  ])('does not proxy %s %s', async (method, path) => {
    expect(await request(method, path)).toBe(404);
    expect(proxyHandler).not.toHaveBeenCalled();
  });

  it.each([
    '/api/orders/abc%2fdef',
    '/api/orders/abc%252fdef',
    '/api/orders/%2e%2e',
    '/api/orders/abc.def',
    `/api/orders/${'x'.repeat(65)}`,
    '/api/orders/abc%2fdef/prepare-payment',
    '/api/orders/restaurant/abc%2fdef',
    '/api/orders/driver/abc%2fdef',
  ])('rejects malformed path parameter in %s', async (path) => {
    const method = path.endsWith('/prepare-payment') ? 'POST' : 'GET';
    actor = method === 'POST' ? user : admin;
    expect(await request(method, path)).not.toBe(204);
    expect(proxyHandler).not.toHaveBeenCalled();
  });

  it.each([
    ['GET', '/api/orders/', user],
    ['GET', '/api/orders/abc-123', user],
    ['HEAD', '/api/orders/abc-123', user],
    ['GET', '/api/orders/restaurant/restaurant-1', restaurantEmployee],
    ['GET', '/api/orders/restaurant/restaurant-1/summary', restaurantEmployee],
    ['GET', '/api/orders/restaurant/restaurant-1/analytics', restaurant],
    ['GET', '/api/orders/driver/driver-1', user],
    ['POST', '/api/orders/', admin],
    ['POST', '/api/orders/abc-123/prepare-payment', user],
    ['PATCH', '/api/orders/abc-123/cancel', user],
    ['PATCH', '/api/orders/abc-123/status', user],
    ['PATCH', '/api/orders/abc-123/assign-driver', user],
  ])('still proxies %s %s', async (method, path, requestActor) => {
    actor = requestActor;
    expect(await request(method, path)).toBe(204);
    expect(proxyHandler).toHaveBeenCalledTimes(1);
  });

  it.each([
    ['POST', '/api/orders/', user],
    ['POST', '/api/orders/abc-123/prepare-payment', admin],
    ['GET', '/api/orders/restaurant/restaurant-1/summary', user],
    ['GET', '/api/orders/restaurant/restaurant-1/analytics', user],
    ['GET', '/api/orders/restaurant/restaurant-2', restaurant],
  ])('keeps actor guard on %s %s', async (method, path, requestActor) => {
    actor = requestActor;
    expect(await request(method, path)).toBe(403);
    expect(proxyHandler).not.toHaveBeenCalled();
  });

  it.each([user, admin, restaurant])('blocks payment status for %s', async (requestActor) => {
    actor = requestActor;
    expect(await request('POST', '/api/orders/abc-123/payment-status')).toBe(404);
    expect(proxyHandler).not.toHaveBeenCalled();
  });
});
