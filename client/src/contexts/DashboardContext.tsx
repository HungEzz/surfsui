'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface DashboardContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  isSearching: boolean;
  setIsSearching: (searching: boolean) => void;
  handleSearch: (term: string) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    if (term !== searchTerm) {
      setCurrentPage(1);
    }
  }, [searchTerm]);

  const value = {
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    isSearching,
    setIsSearching,
    handleSearch,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}; 