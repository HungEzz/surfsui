import React from "react";
import { motion } from "framer-motion";
import { DApp } from "@/data/dashboardMockData";
import DAppCard from "./DAppCard";

interface DAppSectionProps {
  title: string;
  dapps: DApp[];
}

const DAppSection: React.FC<DAppSectionProps> = React.memo(({ title, dapps }) => {
  return (
    <motion.div
      className="bg-black/20 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      layout // Add layout animation for smooth transitions
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 rounded-xl"></div>
      
      {/* Header */}
      <div className="relative z-10 mb-8">
        {/* Main title with gradient and effects */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Icon and title container */}
            <div className="relative">
              <motion.div
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border border-cyan-400/30 flex items-center justify-center backdrop-blur-sm"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-cyan-400 text-xl">📱</span>
              </motion.div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full animate-pulse opacity-60"></div>
            </div>

            <div>
              <motion.h2 
                className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent tracking-wide"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                {title}
              </motion.h2>
              <motion.p 
                className="text-gray-400 text-sm mt-1 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {dapps.length} {dapps.length === 1 ? 'DApp' : 'DApps'} found
              </motion.p>
            </div>
          </div>

          {/* Stats badge */}
          <motion.div
            className="flex items-center space-x-3 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-400/20 rounded-xl px-4 py-2 backdrop-blur-sm"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-center">
              <p className="text-purple-400 text-xs font-semibold uppercase tracking-wider">Total Users</p>
              <p className="text-white text-lg font-bold font-mono">
                {dapps.reduce((total, dapp) => total + dapp.account, 0).toLocaleString()}
              </p>
            </div>
            <div className="w-px h-8 bg-gradient-to-b from-transparent via-purple-400/50 to-transparent"></div>
            <div className="text-center">
              <p className="text-cyan-400 text-xs font-semibold uppercase tracking-wider">Active</p>
              <p className="text-white text-lg font-bold font-mono">{dapps.length}</p>
            </div>
          </motion.div>
        </div>

        {/* Animated underline */}
        <motion.div 
          className="mt-4 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </div>

      {/* DApp Cards Container */}
      <div className="relative z-10">
        <motion.div 
          className="flex flex-col gap-3"
          layout
          transition={{ duration: 0.3 }}
        >
          {dapps.map((dapp, index) => (
            <motion.div
              key={`${dapp.rank}-${dapp.name}`} // More stable key
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              layout
            >
              <DAppCard dapp={dapp} />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty state */}
        {dapps.length === 0 && (
          <motion.div
            className="flex flex-col items-center justify-center py-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            layout
          >
            <div className="w-16 h-16 bg-gray-500/20 rounded-full flex items-center justify-center mb-4">
              <span className="text-gray-400 text-2xl">📱</span>
            </div>
            <p className="text-gray-300 text-lg font-medium">No DApps found</p>
            <p className="text-gray-500 text-sm mt-1">Check back later for updates</p>
          </motion.div>
        )}
      </div>

      {/* Enhanced decorative elements */}
      <div className="absolute -top-2 -right-2 w-16 h-16 border-t-2 border-r-2 border-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-tr-2xl opacity-60"></div>
      <div className="absolute -bottom-2 -left-2 w-16 h-16 border-b-2 border-l-2 border-gradient-to-tr from-purple-400/30 to-pink-500/30 rounded-bl-2xl opacity-60"></div>
      
      {/* Floating particles effect */}
      <div className="absolute top-4 right-20 w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute top-12 right-32 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse opacity-40" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-8 left-20 w-1 h-1 bg-blue-400 rounded-full animate-pulse opacity-50" style={{ animationDelay: '2s' }}></div>
    </motion.div>
  );
});

// Add display name for debugging
DAppSection.displayName = 'DAppSection';

export default DAppSection;