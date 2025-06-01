import dotenv from 'dotenv';
import { AppConfig, DatabaseConfig } from '../types';

// Load environment variables
dotenv.config();

const parseConnectionString = (url: string): DatabaseConfig => {
  const urlObj = new URL(url);
  return {
    host: urlObj.hostname,
    port: parseInt(urlObj.port) || 5432,
    database: urlObj.pathname.slice(1),
    user: urlObj.username,
    password: urlObj.password,
    min: parseInt(process.env.DB_POOL_MIN || '2'),
    max: parseInt(process.env.DB_POOL_MAX || '10'),
    idleTimeoutMillis: parseInt(process.env.DB_POOL_IDLE_TIMEOUT || '30000'),
    connectionTimeoutMillis: parseInt(process.env.DB_POOL_CONNECTION_TIMEOUT || '2000'),
  };
};

export const config: AppConfig = {
  port: parseInt(process.env.PORT || '3001'),
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  database: parseConnectionString(process.env.DATABASE_URL || 'postgresql://manager1:manager1@localhost:5432/tasmil_custom_indexer'),
  logLevel: process.env.LOG_LEVEL || 'info',
  logFile: process.env.LOG_FILE || 'logs/app.log',
  apiRateLimit: parseInt(process.env.API_RATE_LIMIT || '100'),
  apiRateWindow: parseInt(process.env.API_RATE_WINDOW || '900000'),
};

export const isDevelopment = config.nodeEnv === 'development';
export const isProduction = config.nodeEnv === 'production'; 