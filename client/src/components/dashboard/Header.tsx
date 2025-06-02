import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import WalletButton from "./WalletButton";

const Header: React.FC = () => {
  const router = useRouter();

  const handleLogoClick = () => {
    // Set flag to indicate intentional navigation to landing page
    sessionStorage.setItem('intentional-landing-navigation', 'true');
    // Navigate to landing page
    router.push('/');
  };

  return (
    <motion.header
      className="relative w-full z-[70]"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Header Container with Beautiful Border */}
      <div className="relative bg-gradient-to-r from-gray-900/50 via-gray-800/30 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 mb-6 shadow-2xl">
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-teal-500/20 blur-sm -z-10"></div>
        
        {/* Top Border Accent */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
        
        {/* Header Content */}
        <div className="flex flex-row justify-between items-center gap-4">
          {/* Left Side - Project Title */}
          <div className="relative flex-1 min-w-0">
            <motion.div 
              className="flex items-center space-x-4 min-w-0 cursor-pointer" 
              onClick={handleLogoClick}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Project Logo/Icon */}
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-500 to-teal-500 flex items-center justify-center shadow-lg border border-white/10">
                  <span className="text-white font-bold text-2xl">🏄</span>
                </div>
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-500 to-teal-500 blur-lg opacity-30 -z-10"></div>
              </motion.div>

              {/* Project Name and Description */}
              <div className="flex flex-col min-w-0">
                <motion.h1 
                  className="text-4xl lg:text-5xl font-light text-white tracking-wide truncate"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  Surf
                  <span className="font-semibold bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent ml-2">
                    Sui
                  </span>
                </motion.h1>
                
                {/* Enhanced Tagline */}
                <motion.div
                  className="flex items-center space-x-3 mt-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-300 font-light tracking-wider truncate">
                      Ride the Waves of Innovation on Sui
                    </span>
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                  </div>
                </motion.div>

                {/* Status Indicator */}
                <motion.div
                  className="flex items-center space-x-2 mt-1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400 font-mono">
                    Sui Network Connected
                  </span>
                </motion.div>
              </div>
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
              className="absolute -bottom-3 left-0 h-px bg-gradient-to-r from-cyan-500/60 via-blue-500/60 to-transparent"
              style={{ width: "280px" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
            />
          </div>

          {/* Right Side - Wallet Button Only */}
          <motion.div
            className="relative flex-shrink-0 z-50"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <WalletButton />
          </motion.div>
        </div>

        {/* Bottom Decorative Border */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
        
        {/* Corner Accents */}
        <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyan-400/30 rounded-tl-lg"></div>
        <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-blue-400/30 rounded-tr-lg"></div>
        <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-blue-400/30 rounded-bl-lg"></div>
        <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-teal-400/30 rounded-br-lg"></div>
      </div>
    </motion.header>
  );
};

export default Header; 