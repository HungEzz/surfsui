import React from "react";
import { motion } from "framer-motion";
import BiophilicBackground from "./BiophilicBackground";
import Header from "./Header";
import SearchBar from "./SearchBar";
import Footer from "./Footer";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="min-h-screen bg-background overflow-auto relative">
      {/* Biophilic design elements */}
      <BiophilicBackground />

      {/* Main Content Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 relative z-10">
        <motion.div
          className="flex flex-col space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants}>
            <Header />
          </motion.div>

          {/* SearchBar Section - Right Aligned */}
          <motion.div 
            className="flex justify-end mb-4 relative z-10"
            variants={itemVariants}
          >
            <SearchBar />
          </motion.div>

          {/* Main Content */}
          <motion.div variants={itemVariants} className="flex-1 relative z-10">
            {children}
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Scroll to top indicator */}
      <motion.div
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default DashboardLayout; 