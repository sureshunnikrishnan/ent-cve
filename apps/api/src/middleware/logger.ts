import { Request, Response, NextFunction } from 'express';

/**
 * Custom request logger middleware
 */
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  console.error(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
};
