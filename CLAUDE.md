# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Project Overview

Deliveroo Clone API - BFF Gateway that proxies requests to microservices (auth-service, order-service, payment-service) while serving restaurant, dish, and category endpoints locally.

- **Runtime:** Node.js >= 24
- **Package Manager:** npm (use `npm ci` in CI, `npm install` locally)
- **Language:** TypeScript 5.x (strict mode)
- **Framework:** Express.js 5.x
- **Validation:** Zod for schemas
- **Logging:** Pino (pretty in dev, JSON in production)
- **Auth:** JWT + timing-safe API key middleware
- **CI/CD:** GitHub Actions — PR quality checks, Semantic Release, EC2 deploy

## Common Commands

```bash
npm run dev                  # Start dev server with nodemon (hot reload via ts-node)
npm run build                # Compile TypeScript → dist/
npm run start:development    # Run compiled server (dev)
npm run start:production     # Run compiled server (prod)

npm run lint:check           # ESLint check
npm run lint:fix             # ESLint auto-fix
npm run format:check         # Prettier check
npm run format:fix           # Prettier auto-fix
npm run types:check          # Type-check without emitting

npm run release              # Run semantic-release
npm run release:dry-run      # Preview release without publishing
```

## Architecture

**BFF Gateway Pattern:** Routes → Proxy Middleware → Microservices

```text
src/
├── config/          # environment.ts (typed singleton)
├── middleware/      # validate, error-handler, rate-limiter, api-key
├── routes/          # index.ts + common.routes.ts + v1/<domain>.routes.ts
├── schema/          # Zod validation schemas (common + per-domain)
├── dtos/            # TypeScript interfaces inferred from Zod schemas
├── services/        # proxy.service.ts — handles microservice calls
├── utils/           # constants.ts, errors.ts, logger.ts
└── index.ts         # Entry point: start HTTP, graceful shutdown
```

### Key Patterns

- **Request flow:** Rate limiter → JSON body parser → routes → proxy to microservices → global error handler
- **Validation:** Zod schemas in `src/schema/`; applied via `validateBody`, `validateQuery`, `validateParams` middleware
- **Response envelope:** `{ success: boolean, message: string, data?: T }`
- **Error handling:** All errors forwarded via `next(error)`; custom `AppError` subclasses in `src/utils/errors.ts`
- **Environment:** Typed singleton in `src/config/environment.ts`, validated at startup — never `process.env` directly elsewhere
- **API versioning:** Routes under `/v1/` (add `/v2/` when breaking changes are needed)
- **Logging:** Pino only — never `console.log`; `service` and `env` injected on every log line
- **Microservices:** Auth, Order, Cart requests proxy to respective services; Restaurant, Dish, Category served locally

## Important Rules

- NEVER use `console.log` — always use `logger` from `src/utils/logger.ts`
- NEVER access `process.env` directly — use the `environment` singleton from `src/config/environment.ts`
- NEVER commit `.env` files — they contain secrets
- NEVER use `any` type — find or define the correct TypeScript type
- NEVER bypass ESLint, Prettier, or TypeScript errors with suppression comments
- NEVER use `npm install` in CI — use `npm ci` for reproducible builds
- All microservice proxy logic belongs in `src/services/proxy.service.ts`
