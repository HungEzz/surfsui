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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md border-b border-[#1EAEDB]/20"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
            <div className="w-10 h-10 bg-gradient-to-r from-[#1EAEDB] to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">🏄</span>
            </div>
            <span className="text-white font-bold text-2xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              SurfSui
            </span>
          </motion.div>

     

          {/* Connect Wallet Button */}
          <motion.div
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <ConnectButton
              connectText="Connect Wallet"
              className="bg-gradient-to-r from-[#1EAEDB] to-blue-500 hover:from-[#1EAEDB]/90 hover:to-blue-600 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-[#1EAEDB]/25"
            />
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}
