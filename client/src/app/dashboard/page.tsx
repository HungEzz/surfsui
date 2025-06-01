"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Header from "@/components/dashboard/Header";
import SearchBar from "@/components/dashboard/SearchBar";
import DAppSection from "@/components/dashboard/DAppSection";
import Pagination from "@/components/dashboard/Pagination";
import Footer from "@/components/Footer";
import { useDashboard } from "@/contexts/DashboardContext";
import { apiService, transformBackendDApp, BackendDApp } from "@/services/api";
import { DApp } from "@/data/dashboardMockData";

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <Navbar />
      <Header />
      <DashboardContent />
      <Footer />
    </div>
  );
};

const DashboardContent = () => {
  const { currentPage, searchTerm } = useDashboard();
  const [trendingDApps, setTrendingDApps] = useState<DApp[]>([]);
  const [topDeFiProtocols, setTopDeFiProtocols] = useState<DApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchDApps = async () => {
      try {
        setLoading(true);
        setError(null);

        let backendDApps: BackendDApp[] = [];

        if (searchTerm.trim()) {
          // If there's a search term, get all DApps and filter client-side
          const allDApps = await apiService.getAllDApps();
          backendDApps = allDApps.filter(dapp => 
            dapp.dapp_name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        } else {
          // Get all DApps for pagination
          backendDApps = await apiService.getAllDApps();
        }

        // Transform backend data to frontend format
        const transformedDApps = backendDApps.map((dapp, index) => 
          transformBackendDApp(dapp, index)
        );

        // Implement pagination client-side - 10 DApps per page (5 per section)
        const itemsPerPage = 10; // 5 DApps per section, 2 sections
        const totalItems = transformedDApps.length;
        const totalPagesCount = Math.ceil(totalItems / itemsPerPage);
        
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageData = transformedDApps.slice(startIndex, endIndex);

        // Split into two sections - each gets up to 5 DApps
        const trending = pageData.slice(0, 5);
        const defiProtocols = pageData.slice(5, 10);

        setTrendingDApps(trending);
        setTopDeFiProtocols(defiProtocols);
        setTotalPages(totalPagesCount);
      } catch (err) {
        console.error('Error fetching DApps:', err);
        setError('Failed to fetch DApp data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchDApps();
  }, [currentPage, searchTerm]);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <motion.div
            className="flex flex-col items-center space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white text-lg">Loading DApp rankings...</p>
          </motion.div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <motion.div
            className="flex flex-col items-center space-y-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
              <span className="text-red-400 text-2xl">⚠️</span>
            </div>
            <div>
              <p className="text-red-400 text-lg font-semibold">Error Loading Data</p>
              <p className="text-gray-300 mt-2">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Retry
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Search Bar - Positioned at top right */}
      <div className="flex justify-end mb-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SearchBar />
        </motion.div>
      </div>

      {/* DApp Sections - Side by Side Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Left Section - Trending DApps */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <DAppSection
            title="Trending DApps"
            dapps={trendingDApps}
          />
        </motion.div>
        
        {/* Right Section - Top DeFi Protocols */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <DAppSection
            title="^_^"
            dapps={topDeFiProtocols}
          />
        </motion.div>
      </div>

      {/* Shared Pagination */}
      {totalPages > 1 && (
        <motion.div 
          className="flex justify-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Pagination
            totalPages={totalPages}
            totalItems={trendingDApps.length + topDeFiProtocols.length}
          />
        </motion.div>
      )}

      {/* No results message */}
      {trendingDApps.length === 0 && topDeFiProtocols.length === 0 && !loading && (
        <div className="flex items-center justify-center min-h-[300px]">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-16 h-16 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-gray-400 text-2xl">🔍</span>
            </div>
            <p className="text-gray-300 text-lg">No DApps found</p>
            <p className="text-gray-500 mt-2">
              {searchTerm ? `No results for "${searchTerm}"` : 'No DApps available'}
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage; 