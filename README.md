# Deliveroo Clone API

This is the backend API for the Deliveroo Clone project. It is built with Node.js, Express, TypeScript, and Prisma, and supports a microservices architecture with a dedicated Auth service.

## Features

- RESTful API for food delivery platform
- User authentication (via Auth microservice)
- PostgreSQL database (local or AWS RDS)
- Docker support for local and cloud deployment
- Environment-based configuration

## Getting Started

### Prerequisites

- Node.js (18+ recommended)
- Yarn or npm
- Docker (for containerization)
- PostgreSQL (local or cloud)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/DiluDevX/deliveroo-clone-api.git
   cd deliveroo-clone-api
   ```

2. Install dependencies:

   ```bash
   yarn install
   # or
   npm install
   ```

3. Set up environment variables:

   - Copy `.env.example` to `.env` and fill in your values.

4. Run database migrations:

   ```bash
   npx prisma migrate dev
   ```

5. Start the server:
   ```bash
   yarn dev
   # or
   npm run dev
   ```

### Docker

To run the backend in Docker:

```bash
docker build -t deliveroo-clone-api .
docker run -p 4000:4000 --env-file .env deliveroo-clone-api
```

Or use Docker Compose (if provided):

```bash
docker compose up --build
```

### Cloud Deployment

1. Build your image for the correct architecture:

   ```bash
   docker buildx build --platform=linux/amd64 -t <your-ecr-uri>/deliveroo-clone-api:latest . --push
   ```

2. Push to your container registry (e.g., AWS ECR).

3. Deploy using AWS ECS Fargate or your preferred cloud platform.

4. Update environment variables to point to your cloud Auth microservice and database.

## Environment Variables

- `PORT` - API server port (default: 4000)
- `DATABASE_URL` - PostgreSQL connection string
- `AUTH_SERVICE_URL` - URL of the Auth microservice

## Project Structure

```
src/
  controllers/
  routes/
  services/
  schema/
  middleware/
  config/
  prisma/
.env
Dockerfile
```

## Useful Commands

- `yarn dev` - Start development server
- `npx prisma studio` - Open Prisma database GUI
- `npx prisma migrate dev` - Run migrations

## References

- [Docker's Node.js guide](https://docs.docker.com/language/nodejs/)
- [Prisma documentation](https://www.prisma.io/docs/)
- [AWS ECS Fargate](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-fargate.html)

---

**Maintainer:** [DiluDevX](https://github.com/DiluDevX)

![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/DiluDevX/deliveroo-clone-api?utm_source=oss&utm_medium=github&utm_campaign=DiluDevX%2Fdeliveroo-clone-api&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)
