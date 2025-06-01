import React from "react";
import { motion } from "framer-motion";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, icon }) => {
  const isPositive = change.startsWith('+');
  const isRealTime = change === 'Real-time';

  return (
    <motion.div
      className="relative bg-gradient-to-br from-gray-800/50 via-gray-900/50 to-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-300 group hover:border-white/20 hover:shadow-xl hover:shadow-blue-500/10"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{
        y: -2,
        scale: 1.02,
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/20 rounded-2xl"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header with icon */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30 flex items-center justify-center">
              <span className="text-lg">{icon}</span>
            </div>
            <span className="text-gray-300 font-medium text-sm">
              {title}
            </span>
          </div>
        </div>

        {/* Value */}
        <div className="mb-3">
          <span className="text-white font-bold text-2xl font-mono">
            {value}
          </span>
        </div>

        {/* Change indicator */}
        <div className="flex items-center space-x-2">
          {isRealTime ? (
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-medium">
                {change}
              </span>
            </div>
          ) : (
            <div className="flex items-center space-x-1">
              <span className={`text-sm font-medium ${
                isPositive ? 'text-green-400' : 'text-red-400'
              }`}>
                {isPositive ? '↗' : '↘'} {change}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </motion.div>
  );
};

export default StatsCard; 