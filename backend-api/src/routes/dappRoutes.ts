import { Router } from 'express';
import { dappController } from '../controllers/dappController';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

/**
 * @route   GET /api/dapps/rankings
 * @desc    Get all DApp rankings
 * @access  Public
 */
router.get('/rankings', asyncHandler(dappController.getAllRankings.bind(dappController)));

/**
 * @route   GET /api/dapps/top/:limit
 * @desc    Get top N DApps (default 10, max 50)
 * @access  Public
 * @param   {number} limit - Number of top DApps to retrieve
 */
router.get('/top/:limit', asyncHandler(dappController.getTopDApps.bind(dappController)));

/**
 * @route   GET /api/dapps/top
 * @desc    Get top 10 DApps (default)
 * @access  Public
 */
router.get('/top', asyncHandler(dappController.getTopDApps.bind(dappController)));

/**
 * @route   GET /api/dapps/by-category/:category
 * @desc    Get DApps by category
 * @access  Public
 * @param   {string} category - DApp category (AI, DEX, NFT, etc.)
 */
router.get('/by-category/:category', asyncHandler(dappController.getDAppsByCategory.bind(dappController)));

/**
 * @route   GET /api/dapps/stats
 * @desc    Get DApp statistics overview
 * @access  Public
 */
router.get('/stats', asyncHandler(dappController.getStats.bind(dappController)));

export default router; 