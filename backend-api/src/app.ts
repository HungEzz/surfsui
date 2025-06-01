import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import { config, isDevelopment } from './utils/config';
import { logger, loggerStream } from './utils/logger';
import { database } from './database/connection';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import routes from './routes';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    // Security middleware
    this.app.use(helmet({
      contentSecurityPolicy: isDevelopment ? false : undefined,
    }));

    // CORS configuration
    this.app.use(cors({
      origin: config.corsOrigin,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }));

    // Compression middleware
    this.app.use(compression());

    // Body parsing middleware
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Logging middleware
    const morganFormat = isDevelopment ? 'dev' : 'combined';
    this.app.use(morgan(morganFormat, { stream: loggerStream }));

    // Trust proxy for accurate IP addresses
    this.app.set('trust proxy', 1);

    // Add request timestamp
    this.app.use((req, res, next) => {
      req.requestTime = new Date().toISOString();
      next();
    });
  }

  private initializeRoutes(): void {
    // Mount all routes
    this.app.use('/', routes);
  }

  private initializeErrorHandling(): void {
    // 404 handler
    this.app.use(notFoundHandler);

    // Global error handler
    this.app.use(errorHandler);
  }

  public async start(): Promise<void> {
    try {
      // Test database connection
      const isDbConnected = await database.testConnection();
      if (!isDbConnected) {
        throw new Error('Failed to connect to database');
      }

      // Start server
      this.app.listen(config.port, () => {
        logger.info(`🚀 Server started successfully`, {
          port: config.port,
          environment: config.nodeEnv,
          corsOrigin: config.corsOrigin,
          database: `${config.database.host}:${config.database.port}/${config.database.database}`,
        });

        if (isDevelopment) {
          logger.info(`📖 API Documentation available at: http://localhost:${config.port}/api`);
          logger.info(`🏥 Health check available at: http://localhost:${config.port}/health`);
        }
      });

      // Graceful shutdown handling
      this.setupGracefulShutdown();

    } catch (error) {
      logger.error('Failed to start server:', error);
      process.exit(1);
    }
  }

  private setupGracefulShutdown(): void {
    const gracefulShutdown = async (signal: string) => {
      logger.info(`Received ${signal}. Starting graceful shutdown...`);

      try {
        // Close database connections
        await database.close();
        logger.info('Database connections closed');

        logger.info('Graceful shutdown completed');
        process.exit(0);
      } catch (error) {
        logger.error('Error during graceful shutdown:', error);
        process.exit(1);
      }
    };

    // Handle shutdown signals
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // Handle uncaught exceptions
    process.on('uncaughtException', (error) => {
      logger.error('Uncaught Exception:', error);
      process.exit(1);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason, promise) => {
      logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
      process.exit(1);
    });
  }
}

// Extend Express Request interface
declare global {
  namespace Express {
    interface Request {
      requestTime?: string;
    }
  }
}

// Create and start the application
const app = new App();
app.start();

export default app; 