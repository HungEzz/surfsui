import { database } from '../database/connection';
import { DAppRanking, DAppStats, DatabaseRow, DAppCategory } from '../types';
import { logger } from '../utils/logger';

export class DAppService {
  /**
   * Get all DApp rankings
   */
  async getAllRankings(): Promise<{ dapps: DAppRanking[]; total: number }> {
    const query = `
      SELECT rank_position as rank, package_id, dapp_name, dau_1h, dapp_type, last_update 
      FROM dapp_rankings 
      ORDER BY rank_position ASC
    `;

    try {
      const result = await database.query(query);
      const dapps = result.rows.map(this.mapDatabaseRowToRanking);
      
      logger.debug('Retrieved all DApp rankings', { count: dapps.length });
      return { dapps, total: dapps.length };
    } catch (error) {
      logger.error('Error getting all rankings:', error);
      throw new Error('Failed to retrieve DApp rankings');
    }
  }

  /**
   * Get top N DApps
   */
  async getTopDApps(limit: number = 10): Promise<{ dapps: DAppRanking[]; total: number }> {
    const query = `
      SELECT rank_position as rank, package_id, dapp_name, dau_1h, dapp_type, last_update 
      FROM dapp_rankings 
      ORDER BY rank_position ASC 
      LIMIT $1
    `;

    try {
      const result = await database.query(query, [limit]);
      const dapps = result.rows.map(this.mapDatabaseRowToRanking);
      
      logger.debug('Retrieved top DApps', { limit, count: dapps.length });
      return { dapps, total: dapps.length };
    } catch (error) {
      logger.error('Error getting top DApps:', error);
      throw new Error('Failed to retrieve top DApps');
    }
  }

  /**
   * Get DApps by category
   */
  async getDAppsByCategory(category: DAppCategory): Promise<{ dapps: DAppRanking[]; total: number }> {
    const query = `
      SELECT rank_position as rank, package_id, dapp_name, dau_1h, dapp_type, last_update 
      FROM dapp_rankings 
      WHERE dapp_type = $1 
      ORDER BY dau_1h DESC
    `;

    try {
      const result = await database.query(query, [category]);
      const dapps = result.rows.map(this.mapDatabaseRowToRanking);
      
      logger.debug('Retrieved DApps by category', { category, count: dapps.length });
      return { dapps, total: dapps.length };
    } catch (error) {
      logger.error('Error getting DApps by category:', error);
      throw new Error(`Failed to retrieve DApps for category: ${category}`);
    }
  }

  /**
   * Get DApp statistics
   */
  async getStats(): Promise<DAppStats> {
    try {
      // Get basic stats
      const statsQuery = `
        SELECT 
          COUNT(*) as total_dapps,
          SUM(dau_1h) as total_active_users_1h,
          MAX(last_update) as last_updated
        FROM dapp_rankings
      `;
      const statsResult = await database.query(statsQuery);
      const stats = statsResult.rows[0];

      // Get top DApp
      const topDAppQuery = `
        SELECT dapp_name, dau_1h, dapp_type 
        FROM dapp_rankings 
        ORDER BY rank_position ASC 
        LIMIT 1
      `;
      const topDAppResult = await database.query(topDAppQuery);
      const topDApp = topDAppResult.rows[0];

      // Get categories count
      const categoriesQuery = `
        SELECT dapp_type, COUNT(*) as count 
        FROM dapp_rankings 
        GROUP BY dapp_type 
        ORDER BY count DESC
      `;
      const categoriesResult = await database.query(categoriesQuery);
      const categories: Record<string, number> = {};
      categoriesResult.rows.forEach((row: any) => {
        categories[row.dapp_type] = parseInt(row.count);
      });

      const result: DAppStats = {
        total_dapps: parseInt(stats.total_dapps),
        total_active_users_1h: parseInt(stats.total_active_users_1h || '0'),
        top_dapp: {
          name: topDApp?.dapp_name || 'N/A',
          dau_1h: parseInt(topDApp?.dau_1h || '0'),
          type: topDApp?.dapp_type || 'Unknown',
        },
        categories,
        last_updated: stats.last_updated ? new Date(stats.last_updated).toISOString() : new Date().toISOString(),
      };

      logger.debug('Retrieved DApp stats', { 
        totalDApps: result.total_dapps, 
        totalUsers: result.total_active_users_1h 
      });
      
      return result;
    } catch (error) {
      logger.error('Error getting DApp stats:', error);
      throw new Error('Failed to retrieve DApp statistics');
    }
  }

  /**
   * Check if category exists
   */
  async categoryExists(category: string): Promise<boolean> {
    const query = `
      SELECT EXISTS(
        SELECT 1 FROM dapp_rankings WHERE dapp_type = $1
      ) as exists
    `;

    try {
      const result = await database.query(query, [category]);
      return result.rows[0].exists;
    } catch (error) {
      logger.error('Error checking category existence:', error);
      return false;
    }
  }

  /**
   * Map database row to DAppRanking interface
   */
  private mapDatabaseRowToRanking(row: DatabaseRow): DAppRanking {
    return {
      rank: row.rank_position,
      package_id: row.package_id,
      dapp_name: row.dapp_name,
      dau_1h: row.dau_1h,
      dapp_type: row.dapp_type,
      last_update: new Date(row.last_update).toISOString(),
    };
  }
}

export const dappService = new DAppService(); 