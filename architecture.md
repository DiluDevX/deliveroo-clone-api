# BFF Gateway Architecture

## Purpose

The BFF gateway is the single HTTP entry point used by the React frontend. It validates the frontend-facing API key, applies CORS/rate limiting/error handling, and proxies requests to the underlying microservices.

This service currently behaves mostly as a pass-through proxy. It does not yet fully own session authentication or actor-context injection, which is the main integration gap to fix before the whole system is reliable.

## Runtime

- Runtime: Node.js >= 24
- Framework: Express 5
- Language: TypeScript
- Default local port: 3000
- Entry point: src/index.ts
- Build output: dist/index.js

## Install and Run

```bash
npm install
cp .env.example .env
npm run dev
```

Production-style local run:

```bash
npm run build
npm run start:development
```

Useful checks:

```bash
npm run types:check
npm run lint:check
npm run format:check
```

## Required Environment

From .env.example and src/config/environment.ts:

```env
NODE_ENV=development
PORT=3000
APP_VERSION=1.0.0
SERVICE_NAME=deliveroo-clone-api
BFF_API_KEY=your-bff-api-key-here

AUTH_SERVICE_URL=http://localhost:4001
AUTH_API_KEY=your-auth-api-key-here

ORDER_SERVICE_URL=http://localhost:4002
ORDER_SERVICE_API_KEY=your-order-api-key-here

PAYMENT_SERVICE_URL=http://localhost:4003
PAYMENT_SERVICE_API_KEY=your-payment-api-key-here

RESTAURANT_SERVICE_URL=http://localhost:4004
RESTAURANT_SERVICE_API_KEY=your-restaurant-api-key-here

JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=15m

LOG_LEVEL=info
BASE_URL=http://localhost:5173
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=1000
```

Important: `BASE_URL` is used as the allowed CORS origin. For the Vite frontend it should normally be `http://localhost:5173`, not the BFF URL.

## Frontend Contract

The frontend calls the BFF under these paths:

| Frontend path       | BFF target service | Downstream path mapping |
| ------------------- | ------------------ | ----------------------- |
| /api/auth/\*        | auth-service       | /v1/auth/\*             |
| /api/users/\*       | auth-service       | /v1/users/\*            |
| /api/cart/\*        | order-service      | /v1/cart/\*             |
| /api/orders/\*      | order-service      | /v1/orders/\*           |
| /api/payments/\*    | payment-service    | /v1/payments/\*         |
| /api/restaurants/\* | restaurant-service | /v1/restaurants/\*      |

All frontend requests are checked by `apiKeyMiddleware([BFF_API_KEY])`, so frontend requests must include:

```http
x-api-key: <BFF_API_KEY>
```

If you do not want to expose the BFF API key in browser code, put the frontend and BFF behind the same trusted edge or replace this browser-facing API key check with session/CORS protection. Browser-shipped API keys are not secrets.

## Proxy Behavior

The proxy is implemented in src/services/proxy.service.ts.

It forwards a curated set of headers:

- accept
- content-type
- authorization
- user-agent
- accept-encoding
- x-forwarded-for
- x-api-key, replaced with the downstream service key
- x-actor-type
- x-actor-id
- x-actor-user-id
- x-actor-restaurant-id
- x-actor-restaurant-role
- x-user-id
- x-user-email
- x-user-first-name
- x-user-last-name

The BFF removes caller-supplied actor/user headers before routing. For protected routes it verifies
the access token through auth-service and constructs downstream identity headers only from that
verified actor context.

## Authenticated Actor Propagation

Order service cart/checkout requires `x-user-id`. The BFF derives it through this flow:

1. Read access token from Authorization header or cookie.
2. Verify token using JWT_SECRET or call auth-service /me.
3. Inject headers before proxying to order-service:

```http
x-user-id: <authenticated user id>
x-actor-id: <authenticated user id>
x-actor-user-id: <authenticated user id>
x-actor-type: USER
```

For restaurant admin/platform admin flows, actor context is derived from auth-service and translated
per downstream service. Restaurant users are forwarded as a `RESTAURANT` actor with their verified
restaurant id and role. Order-service receives the authenticated staff user as `x-actor-id` for audit
history and the assigned restaurant separately as `x-actor-restaurant-id`. Restaurant-service still
receives the assigned restaurant as `x-actor-id` to match its ownership contract. Platform admins are
mapped to each service's platform-level actor type.

Incoming `x-actor-*` and `x-user-*` headers are removed before routing. Internal identity headers are
constructed only from the verified auth-service actor context. Restaurant reads remain public, while
restaurant, category, and dish mutations require authentication before proxying.

Cart and payment routes accept customer (`USER`) actors only. Restaurant users operate through the
restaurant order/menu routes and cannot create customer carts or payments. Direct order creation is
restricted to platform administrators at the BFF boundary.

## Path Prefix Notes

The proxy adds `/v1` for auth, order, payment, and restaurant services.

Check downstream route registrations carefully:

- auth-service registers /v1/auth and /v1/users, so BFF /api/auth -> /v1/auth is correct.
- order-service registers /v1/cart and /v1/orders, so BFF /api/cart -> /v1/cart is correct.
- payment-service registers /v1/payments, so BFF /api/payments -> /v1/payments is correct.
- restaurant-service registers /v1/restaurants, /v1/categories, and /v1/dishes. BFF /api/restaurants maps to /v1/restaurants.

Do not leave this implicit. Pick one path convention for every service.

## Recommended Local Ports

| Component          | URL                           |
| ------------------ | ----------------------------- |
| Frontend           | http://localhost:5173         |
| BFF gateway        | http://localhost:4000 or 3000 |
| Auth service       | http://localhost:4001         |
| Order service      | http://localhost:4002         |
| Payment service    | http://localhost:4003         |
| Restaurant service | http://localhost:4004         |

Update the .env files so they agree. The checked-in examples currently have several default ports that do not match this table.

## Smoke Test

After all services are running:

```bash
curl http://localhost:4000/health
curl -H 'x-api-key: your-bff-api-key-here' http://localhost:4000/api/restaurants
```

Login flow:

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H 'content-type: application/json' \
  -H 'x-api-key: your-bff-api-key-here' \
  -d '{"email":"user@example.com","password":"password"}'
```

Then use the returned access token for authenticated routes until cookie/session handling is implemented in the BFF.

## Merge-Readiness Checklist

- [ ] One port map exists and every .env follows it.
- [ ] Payment and restaurant downstream route prefixes are fixed.
- [ ] BFF authenticates users and injects actor headers.
- [ ] Browser does not send trusted x-user-id directly.
- [ ] API error shape is consistent across proxied services.
- [ ] Frontend payment method values are mapped once in the BFF or shared DTO layer.
