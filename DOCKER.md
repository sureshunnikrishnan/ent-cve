# Docker Development Environment

This repository includes Docker configuration for local development with NodeJS, NextJS, and Redis.

## Prerequisites

- Docker Engine 20.10.0+
- Docker Compose v2.0.0+

## Services

- **api**: API server (port 4000)
- **web**: NextJS web application (port 3000)
- **redis**: Redis 7 server for caching (port 6379)

## Getting Started

1. Start the entire development environment:

```bash
docker compose up
```

2. Access the services:

   - Web app: http://localhost:3000
   - API: http://localhost:4000
   - Redis: localhost:6379 (use a Redis client)

3. To run only specific services:

```bash
# Start only the web app and its dependencies
docker compose up web

# Start only the API and Redis
docker compose up api redis
```

4. To rebuild after changes to the Dockerfile:

```bash
docker compose up --build
```

5. To stop all services:

```bash
docker compose down
```

## Development Workflow

- Changes to your source code will be reflected immediately thanks to volume mounting
- The web application is configured to communicate with the API through the `API_URL` environment variable
- Both services can connect to Redis using the `REDIS_URL` environment variable

## Data Persistence

Data for Redis is stored in a Docker volume:

- redis-data

To reset the data, remove this volume:

```bash
docker compose down -v
```

## Running Commands

To run commands in a specific container:

```bash
# For web app
docker compose exec web pnpm <command>

# For API
docker compose exec api pnpm <command>
```

Examples:

```bash
# Run lint on the web app
docker compose exec web pnpm lint

# Run tests for the API
docker compose exec api pnpm test
```

## Troubleshooting

- If you encounter permission issues with mounted volumes, ensure your Docker daemon has appropriate permissions.
- For performance issues on macOS/Windows, consider adjusting the resources allocated to Docker Desktop.
- If you see dependency errors, you may need to run `pnpm install` locally first, then rebuild the containers.
