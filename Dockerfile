
ARG NODE_VERSION=24.11.1

FROM node:${NODE_VERSION}-alpine as base
WORKDIR /app

FROM base as deps
COPY package.json ./
RUN npm install

FROM deps as build
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

FROM base as final
ENV NODE_ENV=production

# Install Doppler CLI as root
RUN apk add --no-cache curl gnupg \
    && curl -Ls https://cli.doppler.com/install.sh | sh

# Switch to non-root user after installing Doppler
USER node

COPY package.json ./
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

EXPOSE 4000

CMD ["doppler", "run", "--project", "deliveroo-clone-api", "--config", "dev", "--", "node", "dist/server.js"]
