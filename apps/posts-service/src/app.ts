import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import { Logger } from '../shared/utils/logger';
import { ApiResponse } from '../shared/utils/response';
import db from './models';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import postRoutes from './routes/post.routes';

const app = express();
const PORT = process.env.PORT || 3000;
const API_PREFIX = process.env.API_PREFIX || '/api/v1';

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP'
});
app.use('/api/', limiter);

// Auth specific rate limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 12,
  message: 'Too many authentication attempts'
});

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined', {
    stream: { write: message => Logger.info(message.trim()) }
  }));
}

// Health check
app.get('/health', (req: Request, res: Response) => {
  ApiResponse.success(res, { status: 'healthy', timestamp: new Date() });
});

// API routes
app.use(`${API_PREFIX}/auth`, authLimiter, authRoutes);
app.use(`${API_PREFIX}/users`, userRoutes);
app.use(`${API_PREFIX}/posts`, postRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  ApiResponse.error(res, 'Route not found', 404);
});

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  Logger.error('Unhandled error:', err);
  ApiResponse.error(res, 'Internal server error', 500);
});

// Database connection and server startup
const startServer = async (): Promise<void> => {
  try {
    await db.sequelize.authenticate();
    Logger.info('Database connection established successfully');

    // Use migrations instead: npm run migrate
    if (process.env.NODE_ENV === 'development') {
      // Only sync without alter to avoid column type conflicts
      await db.sequelize.sync({ force: false });
      Logger.info('Database synchronized');
    }

    app.listen(PORT, () => {
      Logger.info(`Server running on port ${PORT}`);
      Logger.info(`API available at http://localhost:${PORT}${API_PREFIX}`);
    });
  } catch (error) {
    Logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

if (process.env.NODE_ENV !== 'test') {
  startServer();
}

export default app;
