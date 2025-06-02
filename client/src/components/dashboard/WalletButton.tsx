import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Wallet, Copy, ExternalLink, ChevronDown } from "lucide-react";
import { useCurrentAccount, useDisconnectWallet } from "@mysten/dapp-kit";

const WalletButton: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const currentAccount = useCurrentAccount();
  const { mutate: disconnect } = useDisconnectWallet();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyAddress = () => {
    if (currentAccount?.address) {
      navigator.clipboard.writeText(currentAccount.address);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setIsDropdownOpen(false);
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // If no wallet is connected, show connect message
  if (!currentAccount) {
    return (
      <motion.div
        className="bg-gradient-to-r from-[#1EAEDB] to-blue-500 text-white px-6 py-2.5 rounded-lg font-medium opacity-50 cursor-not-allowed"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 0.5, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex items-center space-x-2">
          <Wallet className="w-4 h-4" />
          <span>No Wallet Connected</span>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="relative z-[90]" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="bg-gradient-to-r from-[#1EAEDB] to-blue-500 hover:from-[#1EAEDB]/90 hover:to-blue-600 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-[#1EAEDB]/25"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex items-center space-x-3">
          {/* Status indicator */}
          <motion.div
            className="w-2 h-2 bg-green-300 rounded-full"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [1, 0.7, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Wallet info */}
          <div className="flex items-center space-x-2">
            <Wallet className="w-4 h-4 text-white" />
            <span className="text-white font-medium">
              {truncateAddress(currentAccount.address)}
            </span>
          </div>

          <ChevronDown 
            className={`w-4 h-4 text-white transition-transform duration-200 ${
              isDropdownOpen ? 'rotate-180' : ''
            }`} 
          />
        </div>
      </motion.button>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <motion.div
          className="absolute top-full right-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-2xl z-[100]"
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          {/* Wallet info header */}
          <div className="p-4 border-b border-gray-700/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1EAEDB] to-blue-500 rounded-lg flex items-center justify-center">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-medium">Sui Wallet</span>
                <span className="text-green-400 text-sm flex items-center">
                  <motion.div
                    className="w-2 h-2 bg-green-400 rounded-full mr-2"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.7, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  Connected
                </span>
              </div>
            </div>
          </div>

          {/* Address section */}
          <div className="p-4 border-b border-gray-700/50">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs mb-1">Address</span>
                <span className="text-white font-mono text-sm">
                  {truncateAddress(currentAccount.address)}
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={copyAddress}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200"
                  title="Copy address"
                >
                  <Copy className="w-4 h-4 text-gray-400 hover:text-white" />
                </button>
                <button
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200"
                  title="View on explorer"
                  onClick={() => window.open(`https://suiscan.xyz/testnet/account/${currentAccount.address}`, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 text-gray-400 hover:text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="p-4">
            <button
              onClick={handleDisconnect}
              className="w-full px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 rounded-lg text-red-400 hover:text-red-300 transition-all duration-200"
            >
              Disconnect Wallet
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default WalletButton; 