import { Pool, PoolClient } from 'pg';
import { config } from '../utils/config';
import { logger } from '../utils/logger';

class Database {
  private pool: Pool;
  private static instance: Database;

  private constructor() {
    this.pool = new Pool({
      host: config.database.host,
      port: config.database.port,
      database: config.database.database,
      user: config.database.user,
      password: config.database.password,
      min: config.database.min,
      max: config.database.max,
      idleTimeoutMillis: config.database.idleTimeoutMillis,
      connectionTimeoutMillis: config.database.connectionTimeoutMillis,
    });

    // Handle pool events
    this.pool.on('connect', (client: PoolClient) => {
      logger.debug('New database client connected');
    });

    this.pool.on('error', (err: Error) => {
      logger.error('Database pool error:', err);
    });

    this.pool.on('remove', () => {
      logger.debug('Database client removed from pool');
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public getPool(): Pool {
    return this.pool;
  }

  public async query(text: string, params?: any[]): Promise<any> {
    const start = Date.now();
    try {
      const result = await this.pool.query(text, params);
      const duration = Date.now() - start;
      logger.debug('Query executed', { 
        query: text, 
        duration: `${duration}ms`, 
        rows: result.rowCount 
      });
      return result;
    } catch (error) {
      const duration = Date.now() - start;
      logger.error('Query error', { 
        query: text, 
        duration: `${duration}ms`, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
      throw error;
    }
  }

  public async getClient(): Promise<PoolClient> {
    return await this.pool.connect();
  }

  public async testConnection(): Promise<boolean> {
    try {
      const result = await this.query('SELECT NOW() as current_time');
      logger.info('Database connection test successful', { 
        timestamp: result.rows[0].current_time 
      });
      return true;
    } catch (error) {
      logger.error('Database connection test failed:', error);
      return false;
    }
  }

  public async close(): Promise<void> {
    try {
      await this.pool.end();
      logger.info('Database pool closed');
    } catch (error) {
      logger.error('Error closing database pool:', error);
      throw error;
    }
  }

  public async getPoolStatus() {
    return {
      totalCount: this.pool.totalCount,
      idleCount: this.pool.idleCount,
      waitingCount: this.pool.waitingCount,
    };
  }
}

export const database = Database.getInstance(); 