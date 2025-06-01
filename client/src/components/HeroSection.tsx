"use client";

import React, { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { ConnectButton } from "@mysten/dapp-kit";
import { Zap, Shield, TrendingUp, Users, Sparkles, Rocket, LucideIcon } from "lucide-react";

// Type definitions
interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  bgGradient: string;
  iconBg: string;
}

interface Stat {
  value: string;
  label: string;
  icon: string;
}

// Memoized feature data to prevent recreation on each render
const FEATURES: Feature[] = [
  {
    icon: TrendingUp,
    title: "Top dApps Ranking",
    description: "Real-time tracking of trending protocols with TVL, volume, and growth metrics",
    gradient: "from-yellow-400 via-orange-500 to-red-500",
    bgGradient: "from-yellow-500/20 via-orange-500/20 to-red-500/20",
    iconBg: "from-yellow-400 to-orange-500"
  },
  {
    icon: Shield,
    title: "Risk Analytics",
    description: "Advanced security scoring and audit status for all tracked protocols",
    gradient: "from-emerald-400 via-teal-500 to-cyan-500",
    bgGradient: "from-emerald-500/20 via-teal-500/20 to-cyan-500/20",
    iconBg: "from-emerald-400 to-teal-500"
  },
  {
    icon: Zap,
    title: "Performance Metrics",
    description: "24h volume, APY tracking, and yield farming opportunities across Sui",
    gradient: "from-purple-400 via-pink-500 to-rose-500",
    bgGradient: "from-purple-500/20 via-pink-500/20 to-rose-500/20",
    iconBg: "from-purple-400 to-pink-500"
  },
  {
    icon: Users,
    title: "Social Sentiment",
    description: "Community activity, developer commits, and social media buzz analysis",
    gradient: "from-blue-400 via-indigo-500 to-purple-500",
    bgGradient: "from-blue-500/20 via-indigo-500/20 to-purple-500/20",
    iconBg: "from-blue-400 to-indigo-500"
  }
];

const STATS: Stat[] = [
  { value: "150+", label: "Tracked dApps", icon: "📊" },
  { value: "25K+", label: "Daily Users", icon: "👥" },
  { value: "$1.2B+", label: "Total TVL", icon: "💰" },
  { value: "99.5%", label: "Data Accuracy", icon: "🎯" }
];

// Memoized animation variants
const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  },
  item: {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  },
  card: {
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  },
} as const;

// Memoized floating orbs component
const FloatingOrbs = memo(() => (
  <div className="absolute inset-0 overflow-hidden">
    <motion.div
      className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-[#1EAEDB]/30 to-cyan-400/30 rounded-full blur-xl"
      animate={{
        y: [0, -20, 0],
        x: [0, 10, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    <motion.div
      className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-xl"
      animate={{
        y: [0, 15, 0],
        x: [0, -15, 0],
        scale: [1, 0.9, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    <motion.div
      className="absolute bottom-40 left-1/4 w-20 h-20 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-full blur-xl"
      animate={{
        y: [0, -25, 0],
        x: [0, 20, 0],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </div>
));

FloatingOrbs.displayName = "FloatingOrbs";

// Memoized feature card component
const FeatureCard = memo(({ feature }: { feature: Feature }) => {
  const IconComponent = feature.icon;
  
  return (
    <motion.div
      variants={ANIMATION_VARIANTS.card}
      whileHover={{ 
        scale: 1.05, 
        rotateY: 5,
        z: 50
      }}
      className="relative group perspective-1000"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} rounded-2xl blur-sm opacity-60 group-hover:opacity-80 transition-opacity duration-300`} />
      <div className="relative bg-gray-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-full transform-gpu transition-all duration-300 group-hover:border-white/20">
        <motion.div
          className={`w-16 h-16 bg-gradient-to-br ${feature.iconBg} rounded-xl flex items-center justify-center mb-4 mx-auto shadow-lg`}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <IconComponent className="w-8 h-8 text-white" />
        </motion.div>

        <h3 className={`text-xl font-bold mb-3 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
          {feature.title}
        </h3>

        <p className="text-gray-300 text-sm leading-relaxed">
          {feature.description}
        </p>

        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
      </div>
    </motion.div>
  );
});

FeatureCard.displayName = "FeatureCard";

// Memoized stat item component
const StatItem = memo(({ stat, index }: { stat: Stat; index: number }) => (
  <motion.div
    className="text-center group"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ delay: 1.2 + index * 0.1 }}
    whileHover={{ scale: 1.1 }}
  >
    <div className="text-3xl mb-2">{stat.icon}</div>
    <motion.div
      className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#1EAEDB] to-cyan-400 bg-clip-text text-transparent mb-2"
      animate={{ 
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {stat.value}
    </motion.div>
    <div className="text-gray-400 font-medium">{stat.label}</div>
  </motion.div>
));

StatItem.displayName = "StatItem";

const HeroSection = memo(() => {
  // Memoize expensive calculations
  const titleAnimations = useMemo(() => ({
    rideWaves: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    },
    sui: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    },
    sparkles: { rotate: [0, 10, -10, 0] },
    rocket: { 
      rotate: [0, 360],
      scale: [1, 1.2, 1]
    }
  }), []);

  const titleTransitions = useMemo(() => ({
    rideWaves: {
      duration: 3,
      repeat: Infinity,
      ease: "linear" as const,
    },
    sui: {
      duration: 4,
      repeat: Infinity,
      ease: "linear" as const,
    },
    sparkles: { duration: 2, repeat: Infinity },
    rocket: { duration: 3, repeat: Infinity }
  }), []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 relative overflow-hidden">
      <FloatingOrbs />

      <motion.div
        className="max-w-7xl mx-auto text-center relative z-10"
        variants={ANIMATION_VARIANTS.container}
        initial="hidden"
        animate="visible"
      >
        {/* Main Title with Enhanced Effects */}
        <motion.div variants={ANIMATION_VARIANTS.item} className="relative mb-8">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.span 
              className="bg-gradient-to-r from-[#1EAEDB] via-cyan-400 to-blue-500 bg-clip-text text-transparent relative"
              animate={titleAnimations.rideWaves}
              transition={titleTransitions.rideWaves}
            >
              Ride the Waves
              <motion.div
                className="absolute -top-2 -right-2"
                animate={titleAnimations.sparkles}
                transition={titleTransitions.sparkles}
              >
                <Sparkles className="w-8 h-8 text-yellow-400" />
              </motion.div>
            </motion.span>
            <br />
            <span className="text-white drop-shadow-lg">of Innovation on</span>
            <br />
            <motion.span 
              className="bg-gradient-to-r from-blue-400 via-[#1EAEDB] to-cyan-300 bg-clip-text text-transparent"
              animate={titleAnimations.sui}
              transition={titleTransitions.sui}
            >
              Sui
              <motion.div
                className="absolute -top-1 -right-1"
                animate={titleAnimations.rocket}
                transition={titleTransitions.rocket}
              >
                <Rocket className="w-6 h-6 text-[#1EAEDB]" />
              </motion.div>
            </motion.span>
          </motion.h1>
          
          <div className="absolute inset-0 bg-gradient-to-r from-[#1EAEDB]/20 via-transparent to-blue-500/20 blur-3xl -z-10" />
        </motion.div>

        {/* Enhanced Description */}
        <motion.p
          variants={ANIMATION_VARIANTS.item}
          className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed mb-12 max-w-4xl mx-auto relative"
        >
          <span className="bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
            Discover and analyze the hottest dApps on Sui blockchain. SurfSui provides comprehensive rankings, performance metrics, and risk analytics to help you make informed decisions in the rapidly evolving DeFi landscape with
          </span>
          <span className="text-[#1EAEDB] font-semibold"> real-time data</span>
          <span className="bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
            {" "}and{" "}
          </span>
          <span className="text-cyan-400 font-semibold">actionable insights</span>
          <span className="bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">.</span>
        </motion.p>

        {/* Enhanced CTA Button */}
        <motion.div
          variants={ANIMATION_VARIANTS.item}
          className="flex justify-center mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-[#1EAEDB] via-cyan-400 to-blue-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300" />
            <ConnectButton
              connectText="🚀 Launch App"
              className="relative group px-8 py-4 bg-gradient-to-r from-[#1EAEDB] to-blue-500 hover:from-[#1EAEDB]/90 hover:to-blue-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:shadow-2xl hover:shadow-[#1EAEDB]/50"
            />
          </motion.div>
        </motion.div>

        {/* Enhanced Feature Cards */}
        <motion.div
          variants={ANIMATION_VARIANTS.item}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </motion.div>

        {/* Enhanced Statistics Section */}
        <motion.div
          variants={ANIMATION_VARIANTS.item}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#1EAEDB]/10 via-purple-500/10 to-cyan-500/10 rounded-3xl blur-xl" />
          <div className="relative bg-gray-900/30 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
            <motion.h3
              className="text-2xl font-bold text-white mb-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Trusted by the Community
            </motion.h3>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {STATS.map((stat, index) => (
                <StatItem key={stat.label} stat={stat} index={index} />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
