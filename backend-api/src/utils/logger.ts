import winston from 'winston';
import { config, isDevelopment } from './config';

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    let log = `${timestamp} [${level}]: ${message}`;
    if (Object.keys(meta).length > 0) {
      log += ` ${JSON.stringify(meta)}`;
    }
    return log;
  })
);

const transports: winston.transport[] = [
  new winston.transports.Console({
    format: consoleFormat,
    level: isDevelopment ? 'debug' : config.logLevel,
  }),
];

// Add file transport in production
if (!isDevelopment) {
  transports.push(
    new winston.transports.File({
      filename: config.logFile,
      format: logFormat,
      level: config.logLevel,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    })
  );
}

export const logger = winston.createLogger({
  level: config.logLevel,
  format: logFormat,
  transports,
  exitOnError: false,
});

// Create a stream object for Morgan
export const loggerStream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
}; 