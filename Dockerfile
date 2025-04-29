FROM --platform=linux/amd64 ubuntu:22.04

FROM node:20 as base
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    ca-certificates \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app
RUN mkdir -p /app/apps/api/data
# Install pnpm
RUN npm install -g pnpm@9.0.0

# Install dependencies only when needed
FROM base AS deps
# Copy all files needed for dependency installation
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/
COPY apps/docs/package.json ./apps/docs/
COPY packages/typescript-config/package.json ./packages/typescript-config/
COPY packages/ui/package.json ./packages/ui/
COPY packages/eslint-config/package.json ./packages/eslint-config/

# Install dependencies
RUN pnpm install --no-frozen-lockfile

# Development image
FROM base AS development
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Default command - will be overridden in docker-compose.yml
CMD ["pnpm", "dev"] 