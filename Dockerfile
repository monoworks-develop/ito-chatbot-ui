# DockerImageサイズを小さくするため、マルチステージビルドかつslimイメージを使用
# Build
FROM node:22-bookworm-slim AS build

WORKDIR /app
RUN npm install -g bun
COPY . .
RUN bun install
RUN bun run build

# Dependencies
FROM node:22-bookworm-slim AS dependencies

WORKDIR /app
RUN npm install -g bun
COPY --from=build /app/package.json ./package.json
RUN bun install --production

# Production
FROM node:22-bookworm-slim AS production

WORKDIR /app
COPY --from=build /app/.next ./next
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/next.config.ts ./next.config.ts
COPY --from=dependencies /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "start"]