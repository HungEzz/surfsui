"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hasRedirected, setHasRedirected] = useState(false);
  const router = useRouter();
  const currentAccount = useCurrentAccount();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Only redirect to dashboard when wallet is newly connected, not when already connected
  useEffect(() => {
    if (currentAccount && !hasRedirected) {
      // Check if user intentionally navigated to landing page
      const intentionalNavigation = sessionStorage.getItem('intentional-landing-navigation');
      
      // Check if we're currently on the landing page
      if (window.location.pathname === "/" && !intentionalNavigation) {
        console.log("Wallet connected, redirecting to dashboard...", currentAccount.address);
        setHasRedirected(true);
        router.push("/dashboard");
      }
    }
  }, [currentAccount, router, hasRedirected]);

  // Clear the intentional navigation flag after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      sessionStorage.removeItem('intentional-landing-navigation');
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-gradient-to-r from-black/70 via-gray-900/80 to-black/70 backdrop-blur-xl border-b border-gradient-to-r border-cyan-400/30"
          : "bg-transparent"
      }`}
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
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            onClick={() => {
              if (currentAccount) {
                // If wallet is connected, go to dashboard
                router.push("/dashboard");
              } else {
                // If no wallet connected, stay on landing page (refresh)
                router.push("/");
              }
            }}
          >
            {/* Enhanced Logo with better gradients */}
            <motion.div 
              className="relative"
              whileHover={{ rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25 border border-white/10">
                <span className="text-white font-bold text-lg">🏄</span>
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-xl blur-md opacity-30 -z-10"></div>
            </motion.div>
            
            {/* Enhanced text with better gradient */}
            <motion.span 
              className="text-2xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent tracking-wide"
              whileHover={{ 
                background: "linear-gradient(90deg, #67e8f9, #60a5fa, #a78bfa, #f472b6)",
                transition: { duration: 0.3 } 
              }}
            >
              SurfSui
            </motion.span>
          </motion.div>

          {/* Connect Wallet Button */}
          <motion.div
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-lg blur-md opacity-50 -z-10"></div>
              
              <ConnectButton
                connectText="Connect Wallet"
                className="relative bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-500 px-6 py-2.5 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-cyan-500/25 border border-white/10 backdrop-blur-sm"
                style={{ 
                  color: '#ffffff !important',
                  '--dapp-kit-button-text-color': '#ffffff',
                  '--dapp-kit-connect-button-text-color': '#ffffff'
                } as React.CSSProperties}
              />
            </motion.div>
          </motion.div>
        </div>
        
        {/* Decorative border line */}
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
          style={{ width: scrolled ? "60%" : "40%" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
    </motion.nav>
  );
}
