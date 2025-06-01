import React from "react";
import { motion } from "framer-motion";
import { DApp } from "@/data/dashboardMockData";
import DAppCard from "./DAppCard";

interface DAppSectionProps {
  title: string;
  dapps: DApp[];
}

const DAppSection: React.FC<DAppSectionProps> = ({ title, dapps }) => {
  return (
    <motion.div
      className="bg-black/20 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 rounded-xl"></div>
      
      {/* Header */}
      <div className="relative z-10 mb-8">
        {/* Main title with gradient and effects */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Icon and title container */}
            <div className="flex items-center space-x-3">
              {/* Trending icon with animation */}
              <motion.div 
                className="relative"
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
                  <span className="text-white text-xl">🔥</span>
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 blur-md opacity-30 -z-10"></div>
              </motion.div>
              
              {/* Title text */}
              <div className="flex flex-col">
                <motion.h2 
                  className="text-3xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {title}
                </motion.h2>
                <motion.p 
                  className="text-sm text-gray-400 font-medium"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Most popular decentralized applications
                </motion.p>
              </div>
            </div>
          </div>
          
          {/* Live indicator with enhanced design */}
          <motion.div 
            className="flex items-center space-x-3 bg-black/30 backdrop-blur-sm border border-green-500/30 rounded-full px-4 py-2"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
              <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-400 animate-ping opacity-75"></div>
            </div>
            <span className="text-sm text-green-400 font-semibold">LIVE</span>
            <div className="w-px h-4 bg-green-500/30"></div>
            <span className="text-xs text-gray-300 font-mono">{dapps.length} DApps</span>
          </motion.div>
        </div>
        
        {/* Decorative line with gradient */}
        <motion.div 
          className="mt-6 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
        ></motion.div>
      </div>

      {/* DApp Grid */}
      <div className="relative z-10">
        <div className="flex flex-col gap-3">
          {dapps.map((dapp, index) => (
            <motion.div
              key={dapp.rank}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <DAppCard dapp={dapp} />
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {dapps.length === 0 && (
          <motion.div
            className="flex flex-col items-center justify-center py-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
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
      <div className="absolute bottom-8 left-20 w-1 h-1 bg-pink-400 rounded-full animate-pulse opacity-50" style={{ animationDelay: '2s' }}></div>
    </motion.div>
  );
};

export default DAppSection;