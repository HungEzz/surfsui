export interface DAppRanking {
  rank: number;
  package_id: string;
  dapp_name: string;
  dau_1h: number;
  dapp_type: string;
  last_update: string;
}

export interface DAppStats {
  total_dapps: number;
  total_active_users_1h: number;
  top_dapp: {
    name: string;
    dau_1h: number;
    type: string;
  };
  categories: Record<string, number>;
  last_updated: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  total?: number;
  timestamp: string;
}

export interface HealthCheck {
  status: 'healthy' | 'unhealthy';
  database: 'connected' | 'disconnected';
  timestamp: string;
}

export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
  min: number;
  max: number;
  idleTimeoutMillis: number;
  connectionTimeoutMillis: number;
}

export interface AppConfig {
  port: number;
  nodeEnv: string;
  corsOrigin: string;
  database: DatabaseConfig;
  logLevel: string;
  logFile: string;
  apiRateLimit: number;
  apiRateWindow: number;
}

export type DAppCategory = 
  | 'AI' 
  | 'DEX' 
  | 'NFT' 
  | 'Lending' 
  | 'Bridge' 
  | 'Infra' 
  | 'Aggregator' 
  | 'Marketing'
  | 'Unknown';

export interface DatabaseRow {
  rank_position: number;
  package_id: string;
  dapp_name: string;
  dau_1h: number;
  dapp_type: string;
  last_update: Date;
} 