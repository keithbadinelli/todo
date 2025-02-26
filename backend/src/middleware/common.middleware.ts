import { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { config } from '../config/app.config';

export const corsMiddleware = cors({
  origin: config.frontendUrl,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Cache-Control', 'Pragma'],
  credentials: true
});

export const cacheControlMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
}; 