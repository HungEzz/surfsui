import { Router } from 'express';
import dappRoutes from './dappRoutes';
import { dappController } from '../controllers/dappController';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

// Health check endpoint
router.get('/health', asyncHandler(dappController.healthCheck.bind(dappController)));

// DApp routes
router.use('/api/dapps', dappRoutes);

// API info endpoint
router.get('/api', (req, res) => {
  res.json({
    name: 'Tasmil DApp Rankings API',
    version: '1.0.0',
    description: 'REST API for DApp Rankings data from PostgreSQL database',
    endpoints: {
      health: 'GET /health',
      rankings: 'GET /api/dapps/rankings',
      topDApps: 'GET /api/dapps/top/:limit',
      byCategory: 'GET /api/dapps/by-category/:category',
      stats: 'GET /api/dapps/stats',
    },
    timestamp: new Date().toISOString(),
  });
});

export default router; 