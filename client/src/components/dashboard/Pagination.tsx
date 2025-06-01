'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useDashboard } from '@/contexts/DashboardContext';

interface PaginationProps {
  totalPages: number;
  totalItems: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, totalItems }) => {
  const { currentPage, setCurrentPage } = useDashboard();

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Smooth scroll to top when changing pages
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getVisiblePages = () => {
    const delta = 1;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <motion.div
      className="flex flex-col items-center space-y-4 mt-8 mb-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Page Info with Enhanced Design - Compact */}
      <motion.div 
        className="relative px-4 py-2 bg-gradient-to-r from-gray-800/60 via-gray-700/60 to-gray-800/60 backdrop-blur-xl border border-gray-600/30 rounded-xl shadow-lg"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex items-center space-x-2 text-xs font-medium">
          <div className="flex items-center space-x-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse"></div>
            <span className="text-gray-300">Page</span>
            <span className="text-white font-bold text-sm">{currentPage}</span>
            <span className="text-gray-400">of</span>
            <span className="text-cyan-400 font-bold text-sm">{totalPages}</span>
          </div>
          <div className="w-px h-3 bg-gray-600"></div>
          <div className="flex items-center space-x-1.5">
            <span className="text-gray-400">Total:</span>
            <span className="text-white font-bold text-sm">{totalItems}</span>
            <span className="text-gray-400">DApps</span>
          </div>
        </div>
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 blur-lg -z-10"></div>
      </motion.div>

      {/* Main Pagination Controls - Compact */}
      <motion.div 
        className="flex items-center space-x-2 p-1.5 bg-black/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {/* Previous Button - Compact */}
        <motion.button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`group relative flex items-center justify-center w-8 h-8 rounded-xl font-medium transition-all duration-300 ${
            currentPage === 1
              ? 'bg-gray-800/50 text-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-gray-700 to-gray-600 text-white hover:from-cyan-600 hover:to-blue-600 hover:shadow-lg hover:shadow-cyan-500/25'
          }`}
          whileHover={currentPage !== 1 ? { scale: 1.1, rotate: -5 } : {}}
          whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
        >
          <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
          {currentPage !== 1 && (
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          )}
        </motion.button>

        {/* Page Numbers - Compact */}
        <div className="flex items-center space-x-1">
          {getVisiblePages().map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <motion.div 
                  className="flex items-center justify-center w-6 h-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="text-gray-500 text-sm font-bold">⋯</span>
                </motion.div>
              ) : (
                <motion.button
                  onClick={() => handlePageChange(page as number)}
                  className={`group relative flex items-center justify-center w-8 h-8 rounded-xl font-bold text-xs transition-all duration-300 ${
                    currentPage === page
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30 scale-105'
                      : 'bg-gray-700/60 text-gray-300 hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-500 hover:text-white hover:scale-105'
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: currentPage === page ? 1.05 : 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{ scale: currentPage === page ? 1.1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {page}
                  {currentPage === page && (
                    <>
                      {/* Active page glow */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-400 opacity-30 blur-sm -z-10"></div>
                      {/* Active page ring */}
                      <div className="absolute inset-0 rounded-xl border border-cyan-400/50 animate-pulse"></div>
                    </>
                  )}
                  {currentPage !== page && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-500/20 to-gray-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  )}
                </motion.button>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Next Button - Compact */}
        <motion.button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`group relative flex items-center justify-center w-8 h-8 rounded-xl font-medium transition-all duration-300 ${
            currentPage === totalPages
              ? 'bg-gray-800/50 text-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-gray-700 to-gray-600 text-white hover:from-cyan-600 hover:to-blue-600 hover:shadow-lg hover:shadow-cyan-500/25'
          }`}
          whileHover={currentPage !== totalPages ? { scale: 1.1, rotate: 5 } : {}}
          whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
        >
          <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
          {currentPage !== totalPages && (
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          )}
        </motion.button>
      </motion.div>

      {/* Quick Navigation - Compact */}
      <motion.div 
        className="flex items-center space-x-3 text-xs"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <span className="text-gray-400 font-medium">Quick:</span>
        <div className="flex space-x-1.5">
          {[
            { label: 'First', page: 1, icon: '⏮' },
            { label: 'Mid', page: Math.ceil(totalPages / 2), icon: '⏸' },
            { label: 'Last', page: totalPages, icon: '⏭' }
          ].filter(item => item.page !== currentPage && item.page <= totalPages).map((item) => (
            <motion.button
              key={item.label}
              onClick={() => handlePageChange(item.page)}
              className="group flex items-center space-x-1 px-2 py-1 bg-gray-800/40 hover:bg-gradient-to-r hover:from-gray-700/60 hover:to-gray-600/60 rounded-lg text-gray-300 hover:text-white transition-all duration-300 border border-gray-700/30 hover:border-gray-600/50"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-xs">{item.icon}</span>
              <span className="font-medium text-xs">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Pagination; 