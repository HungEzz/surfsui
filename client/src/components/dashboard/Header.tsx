import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import WalletButton from "./WalletButton";

const Header: React.FC = () => {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = () => {
    // Set flag to indicate intentional navigation to landing page
    sessionStorage.setItem('intentional-landing-navigation', 'true');
    // Navigate to landing page
    router.push('/');
  };

  return (
    <motion.header
      className={`sticky top-0 w-full z-[70] transition-all duration-500 ${
        scrolled ? 'backdrop-blur-xl' : ''
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Beautiful background glow when scrolled */}
      {scrolled && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/10 to-purple-500/5 blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}

      {/* Header Container with Beautiful Border */}
      <div className={`relative transition-all duration-500 rounded-2xl shadow-2xl ${
        scrolled 
          ? 'bg-black/30 backdrop-blur-xl border border-cyan-400/20 shadow-xl shadow-cyan-500/10 p-4 mb-4'
          : 'bg-gradient-to-r from-gray-900/50 via-gray-800/30 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 p-6 mb-6'
      }`}>
        {/* Gradient Border Effect */}
        <motion.div 
          className="absolute inset-0 rounded-2xl blur-sm -z-10"
          animate={{
            background: scrolled 
              ? "linear-gradient(45deg, rgba(6, 182, 212, 0.15), rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.15))"
              : "linear-gradient(45deg, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.2), rgba(16, 185, 129, 0.2))"
          }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Top Border Accent */}
        <motion.div 
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-px"
          animate={{
            background: scrolled
              ? "linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.8), transparent)"
              : "linear-gradient(90deg, transparent, rgba(6, 182, 212, 1), transparent)"
          }}
          transition={{ duration: 0.5 }}
        />
        
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
                <motion.div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg border border-white/10"
                  animate={{
                    background: scrolled
                      ? "linear-gradient(135deg, rgba(6, 182, 212, 0.9), rgba(59, 130, 246, 0.9), rgba(139, 92, 246, 0.9))"
                      : "linear-gradient(135deg, #06b6d4, #3b82f6, #10b981)"
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-white font-bold text-2xl">🏄</span>
                </motion.div>
                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-xl blur-lg opacity-30 -z-10"
                  animate={{
                    background: scrolled
                      ? "linear-gradient(135deg, rgba(6, 182, 212, 0.5), rgba(59, 130, 246, 0.5), rgba(139, 92, 246, 0.5))"
                      : "linear-gradient(135deg, #06b6d4, #3b82f6, #10b981)"
                  }}
                  transition={{ duration: 0.5 }}
                />
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
                  <motion.span 
                    className="font-semibold bg-clip-text text-transparent ml-2"
                    animate={{
                      backgroundImage: scrolled
                        ? "linear-gradient(90deg, rgba(6, 182, 212, 1), rgba(59, 130, 246, 1), rgba(139, 92, 246, 1))"
                        : "linear-gradient(90deg, #06b6d4, #3b82f6, #10b981)"
                    }}
                    transition={{ duration: 0.5 }}
                    style={{ 
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    Sui
                  </motion.span>
                </motion.h1>
                
                {/* Enhanced Tagline - Hidden when scrolled */}
                {!scrolled && (
                  <motion.div
                    className="flex items-center space-x-3 mt-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <div className="flex items-center space-x-2">
                      <motion.div 
                        className="w-1.5 h-1.5 rounded-full animate-pulse bg-cyan-400"
                        transition={{ duration: 0.5 }}
                      />
                      <span className="text-sm font-light tracking-wider truncate text-gray-300">
                        Ride the Waves of Innovation on Sui
                      </span>
                      <motion.div 
                        className="w-1.5 h-1.5 rounded-full animate-pulse bg-blue-400"
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Status Indicator - Hidden when scrolled */}
                {!scrolled && (
                  <motion.div
                    className="flex items-center space-x-2 mt-1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs font-mono text-green-400">
                      Sui Network Connected
                    </span>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
              className="absolute -bottom-3 left-0 h-px"
              style={{ width: "280px" }}
              initial={{ scaleX: 0 }}
              animate={{ 
                scaleX: 1,
                background: scrolled
                  ? "linear-gradient(90deg, rgba(6, 182, 212, 0.7), rgba(59, 130, 246, 0.7), transparent)"
                  : "linear-gradient(90deg, rgba(6, 182, 212, 0.6), rgba(59, 130, 246, 0.6), transparent)"
              }}
              transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
            />
          </div>

          {/* Right Side - Wallet Button Only */}
          <motion.div
            className="relative flex-shrink-0 z-[100]"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <WalletButton />
          </motion.div>
        </div>

        {/* Bottom Decorative Border */}
        <motion.div 
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-px"
          animate={{
            background: scrolled
              ? "linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.6), transparent)"
              : "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent)"
          }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Corner Accents */}
        <motion.div 
          className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 rounded-tl-lg"
          animate={{
            borderColor: scrolled ? "rgba(6, 182, 212, 0.4)" : "rgba(6, 182, 212, 0.3)"
          }}
          transition={{ duration: 0.5 }}
        />
        <motion.div 
          className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 rounded-tr-lg"
          animate={{
            borderColor: scrolled ? "rgba(59, 130, 246, 0.4)" : "rgba(59, 130, 246, 0.3)"
          }}
          transition={{ duration: 0.5 }}
        />
        <motion.div 
          className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 rounded-bl-lg"
          animate={{
            borderColor: scrolled ? "rgba(139, 92, 246, 0.4)" : "rgba(59, 130, 246, 0.3)"
          }}
          transition={{ duration: 0.5 }}
        />
        <motion.div 
          className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 rounded-br-lg"
          animate={{
            borderColor: scrolled ? "rgba(16, 185, 129, 0.4)" : "rgba(16, 185, 129, 0.3)"
          }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.header>
  );
};

export default Header; 