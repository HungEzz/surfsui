import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import { ApiResponse } from '../types';

export class AppError extends Error {
  public statusCode: number;
  public code: string;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500, code: string = 'INTERNAL_ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const createError = (message: string, statusCode: number = 500, code: string = 'INTERNAL_ERROR') => {
  return new AppError(message, statusCode, code);
};

export const errorHandler = (
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = 500;
  let code = 'INTERNAL_ERROR';
  let message = 'Internal server error';

  // Handle custom AppError
  if (error instanceof AppError) {
    statusCode = error.statusCode;
    code = error.code;
    message = error.message;
  }
  // Handle validation errors
  else if (error.message.includes('Validation error:')) {
    statusCode = 400;
    code = 'VALIDATION_ERROR';
    message = error.message.replace('Validation error: ', '');
  }
  // Handle database errors
  else if (error.message.includes('database') || error.message.includes('connection')) {
    statusCode = 503;
    code = 'DATABASE_ERROR';
    message = 'Database service unavailable';
  }
  // Handle other known errors
  else if (error.message) {
    message = error.message;
  }

  // Log error details
  logger.error('API Error', {
    statusCode,
    code,
    message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
  });

  // Send error response
  const errorResponse: ApiResponse<null> = {
    success: false,
    error: {
      code,
      message,
    },
    timestamp: new Date().toISOString(),
  };

  res.status(statusCode).json(errorResponse);
};

export const notFoundHandler = (req: Request, res: Response): void => {
  const errorResponse: ApiResponse<null> = {
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.method} ${req.path} not found`,
    },
    timestamp: new Date().toISOString(),
  };

  logger.warn('Route not found', {
    method: req.method,
    path: req.path,
    ip: req.ip,
  });

  res.status(404).json(errorResponse);
};

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}; 