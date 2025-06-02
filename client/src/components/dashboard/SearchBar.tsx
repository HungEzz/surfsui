'use client';

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Sparkles, Zap } from "lucide-react";
import { useDashboard } from "@/contexts/DashboardContext";

const SearchBar: React.FC = () => {
  const { searchTerm, handleSearch, isSearching, setIsSearching } = useDashboard();
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync local search term with global search term
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  // Optimized debounce with better state management
  useEffect(() => {
    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Only proceed if there's actually a change
    if (localSearchTerm !== searchTerm) {
      setIsSearching(true);
      
      debounceTimerRef.current = setTimeout(() => {
        handleSearch(localSearchTerm);
        setIsSearching(false);
      }, 500); // Increased debounce time to reduce API calls
    }

    // Cleanup timer on unmount
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [localSearchTerm, searchTerm, handleSearch, setIsSearching]);

  const handleClear = () => {
    setLocalSearchTerm("");
    handleSearch("");
    setIsSearching(false);
    inputRef.current?.focus();
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsFocused(false);
      inputRef.current?.blur();
    }
    // Immediate search on Enter
    if (e.key === 'Enter' && localSearchTerm !== searchTerm) {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      handleSearch(localSearchTerm);
      setIsSearching(false);
    }
  };

  return (
    <div className="relative w-full max-w-md z-50">
      {/* Main Search Container */}
      <motion.div
        className="relative"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Animated Background Glow */}
        <motion.div
          className="absolute -inset-1 rounded-2xl opacity-40 blur-lg"
          animate={{
            background: isFocused 
              ? "linear-gradient(45deg, #3b82f6, #8b5cf6, #06b6d4, #10b981, #f59e0b, #ef4444)"
              : "linear-gradient(45deg, #1e293b, #374151, #4b5563, #6b7280)",
            scale: isFocused ? 1.03 : 1,
            opacity: isFocused ? 0.7 : 0.4,
          }}
          transition={{ duration: 0.4 }}
          style={{
            backgroundSize: "400% 400%",
            animation: isFocused ? "gradientShift 4s ease infinite" : "none",
          }}
        />

        {/* Search Input Container */}
        <motion.div
          className={`relative backdrop-blur-xl border-2 rounded-2xl transition-all duration-500 overflow-hidden ${
            isFocused 
              ? 'border-blue-400/70 shadow-2xl shadow-blue-500/30 bg-gray-900/95' 
              : 'border-gray-600/50 hover:border-gray-500/70 bg-gray-900/80'
          }`}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          {/* Beautiful Animated Background Pattern */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: isFocused 
                ? "linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.15) 20%, rgba(6, 182, 212, 0.15) 40%, rgba(16, 185, 129, 0.15) 60%, rgba(245, 158, 11, 0.15) 80%, rgba(239, 68, 68, 0.15) 100%)"
                : "linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(139, 92, 246, 0.08) 33%, rgba(6, 182, 212, 0.08) 66%, rgba(16, 185, 129, 0.08) 100%)"
            }}
            transition={{ duration: 0.5 }}
            style={{
              backgroundSize: "300% 300%",
              animation: isFocused ? "gradientMove 6s ease infinite" : "none",
            }}
          />

          {/* Mesh Pattern Overlay */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
          </div>

          {/* Input Field Container */}
          <div className="relative flex items-center px-4 py-3">
            {/* Search Icon with Animation */}
            <motion.div
              className="flex-shrink-0 mr-3"
              animate={{
                rotate: isSearching ? 360 : 0,
                scale: isFocused ? 1.1 : 1,
                x: isFocused ? 1 : 0,
              }}
              transition={{ 
                rotate: { duration: 1, repeat: isSearching ? Infinity : 0, ease: "linear" },
                scale: { duration: 0.3 },
                x: { duration: 0.3 }
              }}
            >
              <Search className={`w-5 h-5 transition-all duration-300 ${
                isFocused ? 'text-blue-400 drop-shadow-lg' : 'text-gray-400'
              }`} />
            </motion.div>

            {/* Magic Sparkle Icons */}
            <AnimatePresence>
              {isFocused && (
                <>
                  <motion.div
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0, rotate: 180 }}
                    className="flex-shrink-0 mr-2"
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    <Sparkles className="w-3 h-3 text-yellow-400 animate-pulse" />
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* Input Field */}
            <input
              ref={inputRef}
              type="text"
              value={localSearchTerm}
              onChange={(e) => setLocalSearchTerm(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              placeholder="Search DApps..."
              className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm font-medium tracking-wide"
            />

            {/* Right Side Icons */}
            <div className="flex items-center space-x-2 ml-3">
              {/* Search Status Indicator */}
              <AnimatePresence>
                {isSearching && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
                    className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                  />
                )}
              </AnimatePresence>

              {/* Magic Zap Icon */}
              <AnimatePresence>
                {isFocused && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0, rotate: 180 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0, rotate: -180 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <Zap className="w-3 h-3 text-purple-400 animate-bounce" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Clear Button */}
              <AnimatePresence>
                {localSearchTerm && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
                    onClick={handleClear}
                    className="p-1.5 rounded-full bg-gray-600/50 hover:bg-gray-500/60 transition-all duration-200 group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-3 h-3 text-gray-300 group-hover:text-white transition-colors" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Animated Border Effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 opacity-0 pointer-events-none"
            animate={{
              borderColor: isFocused 
                ? ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#3b82f6"]
                : "#3b82f6",
              opacity: isFocused ? 1 : 0,
              scale: isFocused ? 1 : 0.98,
            }}
            transition={{ 
              borderColor: { duration: 4, repeat: Infinity, ease: "linear" },
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 }
            }}
          />

          {/* Inner Glow Effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-0 pointer-events-none"
            animate={{
              background: isFocused 
                ? "radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%)"
                : "transparent",
              opacity: isFocused ? 1 : 0,
            }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>
      </motion.div>

      {/* Search Status */}
      <AnimatePresence>
        {localSearchTerm && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute top-full left-0 right-0 mt-3 z-[55]"
          >
            <div className="bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-cyan-500/15 border border-blue-400/30 rounded-xl px-4 py-3 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <motion.div 
                    className="w-1.5 h-1.5 bg-blue-400 rounded-full"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  />
                  <p className="text-xs text-blue-300 font-medium">
                    Searching for &quot;{localSearchTerm}&quot;
                  </p>
                </div>
                {isSearching && (
                  <motion.div 
                    className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          25% { background-position: 100% 50%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes gradientMove {
          0% { background-position: 0% 0%; }
          33% { background-position: 100% 0%; }
          66% { background-position: 100% 100%; }
          100% { background-position: 0% 100%; }
        }
      `}</style>
    </div>
  );
};

export default SearchBar;
