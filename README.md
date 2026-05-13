<div>
  <img src="https://assets.dilum.me/deliveroo-clone/svgs/deliveroo-logo.svg" alt="Deliveroo Clone Logo" width="200"/>

# Deliveroo Clone API

Node.js BFF (Backend for Frontend) Gateway for Deliveroo clone application with microservice architecture.

</div>

## Tech Stack

- **Runtime:** Node.js 24+ with TypeScript
- **Framework:** Express.js 5
- **Database:** MongoDB (Mongoose ODM)
- **Validation:** Zod schemas
- **Logging:** Pino
- **Package Manager:** npm

## Architecture

This API follows a **BFF Gateway** pattern:

- **Main API (BFF)** - Gateway service handling:
  - **Proxied**: Auth, Users → Auth Service
  - **Proxied**: Orders, Cart → Order Service
  - **Proxied**: Payments → Payment Service
  - **Proxied**: Restaurants, Dishes, Categories → Restaurant Service

### Microservices

- **Auth Service** (`deliveroo-clone-auth-service`) - Authentication, authorization, user management
- **Order Service** (`deliveroo-clone-order-service`) - Orders, cart management
- **Payment Service** (`deliveroo-clone-payment-service`) - Payment processing
- **Restaurant Service** (`deliveroo-clone-restaurant-service`) - Restaurants, dishes, categories management

## Project Structure

```text
src/
├── config/           # Environment configuration
├── controllers/      # Request handlers
│   └── v1/          # Local business logic
├── dto/             # Data Transfer Objects
├── middleware/      # Express middleware
├── models/          # Mongoose models
├── routes/          # Express route definitions
│   └── v1/          # API v1 routes (local + proxied)
├── schema/          # Zod validation schemas
├── services/       # Business logic & proxy service
└── index.ts         # Application entry point
```

## Prerequisites

- Node.js 24+
- MongoDB instance
- npm
- Access to microservices (auth, order, payment)

## Environment Variables

Required environment variables:

```env
NODE_ENV=development
PORT=3000
SERVICE_NAME=deliveroo-clone-api
BFF_API_KEY=your-bff-api-key

# JWT
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRES_IN=1h

# Microservices
AUTH_SERVICE_URL=http://localhost:4001
AUTH_API_KEY=your-auth-api-key
ORDER_SERVICE_URL=http://localhost:4002
ORDER_SERVICE_API_KEY=your-order-api-key
PAYMENT_SERVICE_URL=http://localhost:4003
PAYMENT_SERVICE_API_KEY=your-payment-api-key
RESTAURANT_SERVICE_URL=http://localhost:4004
RESTAURANT_SERVICE_API_KEY=your-restaurant-api-key

# Database
DATABASE_URL=mongodb://localhost:27017/deliveroo-clone
```

## Installation

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build
```

## Development

```bash
# Run in development mode
npm run dev

# Or run compiled version
npm run start:development
```

The server runs on **http://localhost:3000**

## API Endpoints

### Proxied to Auth Service

- `POST /v1/auth/check-email` - Check if email exists
- `POST /v1/auth/signup` - Register new user
- `POST /v1/auth/login` - User login
- `POST /v1/auth/refresh` - Refresh access token
- `POST /v1/auth/forgot-password` - Request password reset
- `POST /v1/auth/reset-password` - Reset password with token

### Proxied to Auth Service (Users)

- `GET /v1/users` - Get all users (Admin)
- `GET /v1/users/:id` - Get user by ID
- `PUT /v1/users/:id` - Update user
- `DELETE /v1/users/:id` - Delete user

### Proxied to Order Service

- `GET /v1/orders` - Get orders
- `POST /v1/orders` - Create order
- `GET /v1/orders/:id` - Get order by ID
- `PUT /v1/orders/:id` - Update order

### Proxied to Order Service (Cart)

- `GET /v1/cart` - Get user's cart
- `POST /v1/cart` - Add item to cart
- `POST /v1/cart/sync` - Replace user's server cart with a client cart snapshot
- `PUT /v1/cart/:id` - Update cart item
- `DELETE /v1/cart/:id` - Remove cart item

### Proxied to Payment Service

- `POST /v1/payments` - Process payment
- `GET /v1/payments/:id` - Get payment status

### Proxied to Restaurant Service

#### Restaurants

- `GET /v1/restaurants` - Get all restaurants
- `GET /v1/restaurants/:id` - Get restaurant by ID
- `POST /v1/restaurants` - Create restaurant (Admin)
- `PUT /v1/restaurants/:id` - Update restaurant (Admin)
- `PATCH /v1/restaurants/:id` - Partially update restaurant (Admin)
- `DELETE /v1/restaurants/:id` - Delete restaurant (Admin)

#### Dishes

- `GET /v1/dishes` - Get all dishes (with filters)
- `GET /v1/dishes/:id` - Get dish by ID
- `POST /v1/dishes` - Create dish (Admin)
- `PUT /v1/dishes/:id` - Update dish (Admin)
- `PATCH /v1/dishes/:id` - Partially update dish (Admin)
- `DELETE /v1/dishes/:id` - Delete dish (Admin)

#### Categories

- `GET /v1/categories` - Get all categories
- `GET /v1/categories/:id` - Get category by ID
- `POST /v1/categories` - Create category (Admin)
- `PUT /v1/categories/:id` - Update category (Admin)
- `PATCH /v1/categories/:id` - Partially update category (Admin)
- `DELETE /v1/categories/:id` - Delete category (Admin)

## Authentication

All proxied routes require **API Key** authentication via `x-api-key` header.

Local admin routes require **JWT** authentication:

- Authorization header: `Bearer <token>`
- Token must include `role: "admin"`

## Rate Limiting

Built-in rate limiting via `express-rate-limit`:

- Production: 100 requests per 15 minutes
- Development: 1000 requests per 15 minutes

## Scripts

```bash
# Development
npm run dev              # Hot reload with nodemon

# Build
npm run build            # Compile TypeScript

# Start
npm run start:development
npm run start:production

# Code Quality
npm run lint:check      # Check ESLint
npm run lint:fix        # Fix ESLint issues
npm run format:check     # Check Prettier
npm run format:fix      # Fix Prettier issues
npm run types:check     # TypeScript type check

# Release
npm run release          # Semantic release
npm run release:dry-run  # Preview release
```

## Docker Support

See [README.Docker.md](./README.Docker.md) for Docker deployment instructions.

## CI/CD

- **GitHub Actions** for automated testing and deployment
- **Semantic Release** for version management
- **EC2 deployment** via Docker

## Contributing

1. Create a feature branch from `develop`
2. Make your changes
3. Run quality checks: `npm run lint:check && npm run format:check && npm run types:check`
4. Commit with conventional commits
5. Create a pull request to `develop`

## Branch Structure

- `main` - Production-ready code
- `develop` - Development branch
- `feature/*` - Feature branches

## License

MIT

## Author

DiluDevX

## Repository

https://github.com/DiluDevX/deliveroo-clone-api
