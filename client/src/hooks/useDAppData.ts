import { useState, useEffect, useCallback } from 'react';
import { apiService, transformBackendDApp, BackendDApp } from '@/services/api';
import { DApp } from '@/data/dashboardMockData';

interface UseDAppDataResult {
  allDApps: DApp[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  isInitialLoad: boolean;
}

export const useDAppData = (): UseDAppDataResult => {
  const [allDApps, setAllDApps] = useState<DApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const fetchDApps = useCallback(async (isRefetch = false) => {
    try {
      if (!isRefetch) {
        setLoading(true);
      }
      setError(null);

      const backendDApps: BackendDApp[] = await apiService.getAllDApps();
      const transformedDApps = backendDApps.map((dapp, index) => 
        transformBackendDApp(dapp, index)
      );

      setAllDApps(transformedDApps);
      setIsInitialLoad(false);
    } catch (err) {
      console.error('Error fetching DApps:', err);
      setError('Failed to fetch DApp data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch data only once on mount
  useEffect(() => {
    if (isInitialLoad) {
      fetchDApps();
    }
  }, [fetchDApps, isInitialLoad]);

  const refetch = useCallback(() => {
    fetchDApps(true);
  }, [fetchDApps]);

  return {
    allDApps,
    loading,
    error,
    refetch,
    isInitialLoad,
  };
}; 