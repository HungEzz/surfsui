import { Request, Response } from 'express';
import { dappService } from '../services/dappService';
import { database } from '../database/connection';
import { validateRequest, schemas } from '../utils/validation';
import { createError } from '../middleware/errorHandler';
import { ApiResponse, DAppRanking, DAppStats, HealthCheck } from '../types';
import { logger } from '../utils/logger';

export class DAppController {
  /**
   * GET /api/dapps/rankings
   * Get all DApp rankings
   */
  async getAllRankings(req: Request, res: Response): Promise<void> {
    try {
      const { dapps, total } = await dappService.getAllRankings();

      const response: ApiResponse<DAppRanking[]> = {
        success: true,
        data: dapps,
        total,
        timestamp: new Date().toISOString(),
      };

      logger.info('Retrieved all DApp rankings', { 
        count: total, 
        ip: req.ip 
      });

      res.status(200).json(response);
    } catch (error) {
      throw createError(
        error instanceof Error ? error.message : 'Failed to retrieve rankings',
        500,
        'RANKINGS_ERROR'
      );
    }
  }

  /**
   * GET /api/dapps/top/:limit
   * Get top N DApps
   */
  async getTopDApps(req: Request, res: Response): Promise<void> {
    try {
      // Validate limit parameter
      const { limit } = validateRequest(schemas.topDAppsParams, {
        limit: parseInt(req.params.limit) || 10,
      });

      const { dapps, total } = await dappService.getTopDApps(limit);

      const response: ApiResponse<DAppRanking[]> = {
        success: true,
        data: dapps,
        total,
        timestamp: new Date().toISOString(),
      };

      logger.info('Retrieved top DApps', { 
        limit, 
        count: total, 
        ip: req.ip 
      });

      res.status(200).json(response);
    } catch (error) {
      if (error instanceof Error && error.message.includes('Validation error:')) {
        throw createError(error.message, 400, 'INVALID_LIMIT');
      }
      throw createError(
        error instanceof Error ? error.message : 'Failed to retrieve top DApps',
        500,
        'TOP_DAPPS_ERROR'
      );
    }
  }

  /**
   * GET /api/dapps/by-category/:category
   * Get DApps by category
   */
  async getDAppsByCategory(req: Request, res: Response): Promise<void> {
    try {
      // Validate category parameter
      const { category } = validateRequest(schemas.categoryParams, {
        category: req.params.category,
      });

      // Check if category exists in database
      const categoryExists = await dappService.categoryExists(category);
      if (!categoryExists) {
        throw createError(
          `Category '${category}' not found`,
          404,
          'CATEGORY_NOT_FOUND'
        );
      }

      const { dapps, total } = await dappService.getDAppsByCategory(category);

      const response: ApiResponse<DAppRanking[]> = {
        success: true,
        data: dapps,
        total,
        timestamp: new Date().toISOString(),
      };

      logger.info('Retrieved DApps by category', { 
        category, 
        count: total, 
        ip: req.ip 
      });

      res.status(200).json(response);
    } catch (error) {
      if (error instanceof Error && error.message.includes('Validation error:')) {
        throw createError(error.message, 400, 'INVALID_CATEGORY');
      }
      throw error; // Re-throw AppError instances
    }
  }

  /**
   * GET /api/dapps/stats
   * Get DApp statistics
   */
  async getStats(req: Request, res: Response): Promise<void> {
    try {
      const stats = await dappService.getStats();

      const response: ApiResponse<DAppStats> = {
        success: true,
        data: stats,
        timestamp: new Date().toISOString(),
      };

      logger.info('Retrieved DApp stats', { 
        totalDApps: stats.total_dapps, 
        totalUsers: stats.total_active_users_1h,
        ip: req.ip 
      });

      res.status(200).json(response);
    } catch (error) {
      throw createError(
        error instanceof Error ? error.message : 'Failed to retrieve statistics',
        500,
        'STATS_ERROR'
      );
    }
  }

  /**
   * GET /health
   * Health check endpoint
   */
  async healthCheck(req: Request, res: Response): Promise<void> {
    try {
      const isDbConnected = await database.testConnection();
      const poolStatus = await database.getPoolStatus();

      const health: HealthCheck = {
        status: isDbConnected ? 'healthy' : 'unhealthy',
        database: isDbConnected ? 'connected' : 'disconnected',
        timestamp: new Date().toISOString(),
      };

      const statusCode = isDbConnected ? 200 : 503;

      logger.info('Health check performed', { 
        status: health.status, 
        database: health.database,
        poolStatus,
        ip: req.ip 
      });

      res.status(statusCode).json(health);
    } catch (error) {
      const health: HealthCheck = {
        status: 'unhealthy',
        database: 'disconnected',
        timestamp: new Date().toISOString(),
      };

      logger.error('Health check failed', { error, ip: req.ip });
      res.status(503).json(health);
    }
  }
}

export const dappController = new DAppController(); 