"use client";

import { motion } from "framer-motion";

export default function BiophilicBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Enhanced Background pattern */}
      <div className="absolute inset-0 organic-pattern mix-blend-overlay opacity-40"></div>

      {/* Multiple Animated Gradient Blobs */}
      <motion.div 
        className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-to-b from-[#1EAEDB]/40 via-cyan-400/30 to-transparent blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div 
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-gradient-to-t from-purple-500/40 via-pink-400/30 to-transparent blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      
      <motion.div 
        className="absolute top-1/2 left-1/4 w-72 h-72 rounded-full bg-gradient-to-tr from-emerald-500/30 via-teal-400/25 to-transparent blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div 
        className="absolute top-1/4 right-1/3 w-64 h-64 rounded-full bg-gradient-to-bl from-yellow-400/30 via-orange-400/25 to-transparent blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.45, 0.3],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />

      {/* Enhanced Organic patterns with multiple colors */}
      <svg
        className="absolute top-0 left-0 w-full h-full opacity-10"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id="pattern-circles-cyan"
            x="0"
            y="0"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
            patternContentUnits="userSpaceOnUse"
          >
            <circle
              cx="10"
              cy="10"
              r="1.6"
              fill="none"
              stroke="#1EAEDB"
              strokeWidth="0.5"
            />
          </pattern>
          
          <pattern
            id="pattern-circles-purple"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
            patternContentUnits="userSpaceOnUse"
          >
            <circle
              cx="8"
              cy="8"
              r="1.2"
              fill="none"
              stroke="#8B5CF6"
              strokeWidth="0.4"
            />
          </pattern>

          <pattern
            id="pattern-circles-emerald"
            x="0"
            y="0"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
            patternContentUnits="userSpaceOnUse"
          >
            <circle
              cx="12"
              cy="12"
              r="2"
              fill="none"
              stroke="#10B981"
              strokeWidth="0.6"
            />
          </pattern>
        </defs>
        
        <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles-cyan)" />
        <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles-purple)" opacity="0.6" />
        <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles-emerald)" opacity="0.4" />
      </svg>

      {/* Enhanced Grid lines with color */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-8"></div>

      {/* More Animated floating particles with various colors */}
      <motion.div 
        className="absolute top-1/4 left-1/3 w-2 h-2 rounded-full bg-gradient-to-r from-[#1EAEDB] to-cyan-400"
        animate={{
          y: [0, -20, 0],
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute top-2/3 left-1/5 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
        animate={{
          y: [0, -15, 0],
          opacity: [0.4, 0.8, 0.4],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      
      <motion.div
        className="absolute top-1/2 left-3/4 w-2.5 h-2.5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400"
        animate={{
          y: [0, -25, 0],
          opacity: [0.6, 1, 0.6],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      
      <motion.div
        className="absolute top-1/3 left-2/3 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400"
        animate={{
          y: [0, -18, 0],
          opacity: [0.5, 0.9, 0.5],
          scale: [1, 1.4, 1],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
      
      <motion.div
        className="absolute top-3/4 right-1/4 w-2 h-2 rounded-full bg-gradient-to-r from-rose-400 to-pink-400"
        animate={{
          y: [0, -22, 0],
          opacity: [0.4, 0.8, 0.4],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />

      {/* Additional floating elements */}
      <motion.div
        className="absolute top-1/6 right-1/3 w-1 h-1 rounded-full bg-gradient-to-r from-indigo-400 to-blue-400"
        animate={{
          y: [0, -12, 0],
          x: [0, 5, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />

      <motion.div
        className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-400 to-purple-400"
        animate={{
          y: [0, -16, 0],
          x: [0, -8, 0],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 6.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.5,
        }}
      />

      {/* Enhanced Scrapbook texture overlay */}
      <div className="absolute inset-0 bg-scrapbook-texture opacity-8"></div>

      {/* Enhanced Radial gradient overlay with color */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#1EAEDB]/5 to-black/40 opacity-80"></div>
      
      {/* Additional color overlay for more vibrancy */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-cyan-900/10 opacity-60"></div>
    </div>
  );
}
