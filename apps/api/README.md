# API Server

This is a Node.js/Express API server built with TypeScript in a Turborepo monorepo structure.

## Features

- Express server with TypeScript
- Middleware for security (helmet, cors)
- Request logging
- Error handling
- Sample API routes

## Development

```bash
# Install dependencies from root of monorepo
pnpm install

# Start the API server in development mode
pnpm dev --filter=api
```

## API Endpoints

- `GET /` - API health check
- `GET /health` - Health check endpoint
- `GET /api/users` - Get list of users
- `GET /api/users/:id` - Get user by ID

## Building for Production

```bash
# Build the application
pnpm build --filter=api

# Start the production server
pnpm start --filter=api
```
