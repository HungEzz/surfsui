// API service for fetching DApp data from backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export interface BackendDApp {
  rank?: number;
  package_id: string;
  dapp_name: string;
  dau_1h: number;
  dapp_type: string;
  last_update: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  total?: number;
  timestamp: string;
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

class ApiService {
  private async fetchApi<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`API Error for ${endpoint}:`, error);
      throw error;
    }
  }

  // Get all DApp rankings
  async getAllDApps(): Promise<BackendDApp[]> {
    const response = await this.fetchApi<BackendDApp[]>('/api/dapps/rankings');
    return response.data;
  }

  // Get top N DApps
  async getTopDApps(limit: number = 10): Promise<BackendDApp[]> {
    const response = await this.fetchApi<BackendDApp[]>(`/api/dapps/top/${limit}`);
    return response.data;
  }

  // Get DApps by category
  async getDAppsByCategory(category: string): Promise<BackendDApp[]> {
    const response = await this.fetchApi<BackendDApp[]>(`/api/dapps/by-category/${category}`);
    return response.data;
  }

  // Get DApp statistics
  async getDAppStats(): Promise<DAppStats> {
    const response = await this.fetchApi<DAppStats>('/api/dapps/stats');
    return response.data;
  }

  // Health check
  async healthCheck(): Promise<any> {
    const response = await this.fetchApi<any>('/health');
    return response;
  }
}

// Transform backend data to frontend format
export const transformBackendDApp = (backendDApp: BackendDApp, index?: number): import('@/data/dashboardMockData').DApp => {
  return {
    rank: backendDApp.rank || (index ? index + 1 : 1),
    name: backendDApp.dapp_name,
    account: backendDApp.dau_1h, // Using DAU as account count
    type: mapBackendTypeToFrontend(backendDApp.dapp_type)
  };
};

// Map backend types to frontend types - Updated to preserve backend types
const mapBackendTypeToFrontend = (backendType: string): "DEX" | "AI" | "Gaming" | "DeFi" | "NFT" | "Bridge" | "Lending" | "Yield" | "Infra" | "Aggregator" | "Marketing" | "Liquid Staking" => {
  const typeMap: Record<string, "DEX" | "AI" | "Gaming" | "DeFi" | "NFT" | "Bridge" | "Lending" | "Yield" | "Infra" | "Aggregator" | "Marketing" | "Liquid Staking"> = {
    'DEX': 'DEX',
    'AI': 'AI',
    'Gaming': 'Gaming',
    'DeFi': 'DeFi',
    'NFT': 'NFT',
    'Bridge': 'Bridge',
    'Lending': 'Lending',
    'Yield': 'Yield',
    'Infra': 'Infra',
    'Aggregator': 'Aggregator',
    'Marketing': 'Marketing',
    'Liquid Staking': 'Liquid Staking',
    'Unknown': 'DeFi'
  };
  
  return typeMap[backendType] || 'DeFi';
};

export const apiService = new ApiService(); 