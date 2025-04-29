import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { logger } from './logger';
import apiRoutes from './routes';
import { db } from './db';

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'API is running' });
});

// API routes
app.use('/api', apiRoutes);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

// Database status endpoint
app.get('/db/status', async (req: Request, res: Response) => {
  try {
    // Test database connection
    await db.query('RETURN 1');
    res.status(200).json({ status: 'connected' });
  } catch (error) {
    logger.error({ error }, 'Database connection error');
    res.status(500).json({ status: 'error', message: 'Database connection error' });
  }
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  logger.error(
    {
      err,
      method: req.method,
      url: req.url,
      ip: req.ip,
    },
    'Internal server error'
  );

  res.status(500).json({
    message: 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { error: err.message }),
  });
});

// Initialize database and start server
const startServer = async () => {
  try {
    // Initialize database
    await db.initialize();

    // Start the Express server
    app.listen(port, () => {
      logger.info(`⚡️ Server is running on port ${port}`);
      logger.info(`💾 Database connected at apps/api/data/cve.db`);
    });
  } catch (error) {
    logger.fatal({ error }, 'Failed to start server');
    process.exit(1);
  }
};

// Run the server
startServer();
