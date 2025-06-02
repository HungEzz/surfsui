import React from "react";
import { motion } from "framer-motion";
import { DApp } from "@/data/dashboardMockData";
import { Users, ExternalLink } from "lucide-react";
import { getDAppIconData, getInitials } from "@/utils/dappIcons";
import Image from "next/image";

interface DAppCardProps {
  dapp: DApp;
}

const DAppCard: React.FC<DAppCardProps> = ({ dapp }) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  };

  const generateGradient = (name: string) => {
    const gradients = [
      "from-blue-500/10 via-purple-500/10 to-pink-500/10",
      "from-cyan-500/10 via-blue-500/10 to-purple-500/10", 
      "from-green-500/10 via-teal-500/10 to-cyan-500/10",
      "from-orange-500/10 via-red-500/10 to-pink-500/10",
      "from-purple-500/10 via-indigo-500/10 to-blue-500/10",
    ];
    return gradients[name.length % gradients.length];
  };

  const getTypeStyle = (type: string) => {
    const styles = {
      "DEX": { color: "text-blue-400", bg: "bg-blue-500/15", border: "border-blue-400/40", icon: "⚡", glow: "shadow-blue-500/20" },
      "AI": { color: "text-purple-400", bg: "bg-purple-500/15", border: "border-purple-400/40", icon: "🤖", glow: "shadow-purple-500/20" },
      "Gaming": { color: "text-pink-400", bg: "bg-pink-500/15", border: "border-pink-400/40", icon: "🎮", glow: "shadow-pink-500/20" },
      "DeFi": { color: "text-green-400", bg: "bg-green-500/15", border: "border-green-400/40", icon: "💰", glow: "shadow-green-500/20" },
      "NFT": { color: "text-orange-400", bg: "bg-orange-500/15", border: "border-orange-400/40", icon: "🎨", glow: "shadow-orange-500/20" },
      "Bridge": { color: "text-cyan-400", bg: "bg-cyan-500/15", border: "border-cyan-400/40", icon: "🌉", glow: "shadow-cyan-500/20" },
      "Lending": { color: "text-yellow-400", bg: "bg-yellow-500/15", border: "border-yellow-400/40", icon: "🏦", glow: "shadow-yellow-500/20" },
      "Yield": { color: "text-emerald-400", bg: "bg-emerald-500/15", border: "border-emerald-400/40", icon: "📈", glow: "shadow-emerald-500/20" },
      "Infra": { color: "text-slate-400", bg: "bg-slate-500/15", border: "border-slate-400/40", icon: "🔧", glow: "shadow-slate-500/20" },
      "Aggregator": { color: "text-indigo-400", bg: "bg-indigo-500/15", border: "border-indigo-400/40", icon: "🔄", glow: "shadow-indigo-500/20" },
      "Marketing": { color: "text-rose-400", bg: "bg-rose-500/15", border: "border-rose-400/40", icon: "📢", glow: "shadow-rose-500/20" },
      "Liquid Staking": { color: "text-teal-400", bg: "bg-teal-500/15", border: "border-teal-400/40", icon: "💧", glow: "shadow-teal-500/20" },
    };
    return styles[type as keyof typeof styles] || styles["DeFi"];
  };

  const typeStyle = getTypeStyle(dapp.type);
  const dappIconData = getDAppIconData(dapp.name);

  const renderIcon = () => {
    if (dappIconData.hasImage) {
      return (
        <Image
          src={dappIconData.icon}
          alt={`${dapp.name} logo`}
          width={56}
          height={56}
          className="w-14 h-14 object-contain rounded-2xl"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = `<span class="text-white text-2xl font-bold">${getInitials(dapp.name)}</span>`;
            }
          }}
        />
      );
    } else {
      return (
        <span className="text-white text-2xl" role="img" aria-label={`${dapp.name} icon`}>
          {dappIconData.icon.startsWith('/') ? getInitials(dapp.name) : dappIconData.icon}
        </span>
      );
    }
  };

  return (
    <motion.div
      className="relative w-full group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className={`relative bg-gradient-to-r ${generateGradient(dapp.name)} backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-300 group-hover:border-white/25 hover:shadow-2xl ${typeStyle.glow}`}>
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm rounded-2xl"></div>
        
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1 min-w-0">
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400/20 to-orange-500/20 border border-yellow-400/30 flex items-center justify-center backdrop-blur-sm">
                  <span className="text-yellow-400 font-bold text-lg">#{dapp.rank}</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse opacity-60"></div>
              </div>
            </div>

            <div className="flex-shrink-0">
              <div className="relative">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${dappIconData.fallbackColor} flex items-center justify-center border-2 border-white/20 shadow-lg overflow-hidden`}>
                  {renderIcon()}
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gray-900 rounded-full border-2 border-white/20 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center space-x-3 mb-1">
                <h3 className="text-white font-bold text-xl leading-tight truncate">{dapp.name}</h3>
                <ExternalLink className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="flex items-center space-x-2">
                <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg ${typeStyle.bg} ${typeStyle.border} border backdrop-blur-sm`}>
                  <span className="text-sm">{typeStyle.icon}</span>
                  <span className={`${typeStyle.color} font-semibold text-sm`}>{dapp.type}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-8 flex-shrink-0">
            <div className="text-center">
              <div className="flex items-center space-x-2 mb-1">
                <Users className="w-4 h-4 text-cyan-400" />
                <span className="text-gray-300 text-sm font-medium">Accounts</span>
              </div>
              <div className="text-cyan-400 font-bold text-xl font-mono">
                {formatNumber(dapp.account)}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute top-4 right-4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse opacity-40" style={{ animationDelay: '1s' }}></div>
      </div>
    </motion.div>
  );
};

export default DAppCard; 