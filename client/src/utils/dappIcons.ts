// DApp Icons utility for Sui ecosystem
export interface DAppIconData {
  name: string;
  icon: string; // Now contains image path instead of emoji
  fallbackColor: string;
  category: string;
  hasImage: boolean; // New field to indicate if real image exists
}

// Popular Sui DApps with their icons (using real images from public folder)
export const dappIconsData: { [key: string]: DAppIconData } = {
  // DApps with real images
  "Cetus AMM": {
    name: "Cetus AMM",
    icon: "/Cetus_AMM.png",
    fallbackColor: "from-blue-500 to-cyan-500",
    category: "DEX",
    hasImage: true
  },
  "Cetus Aggregator": {
    name: "Cetus Aggregator",
    icon: "/Cetus_Aggregator.jpeg",
    fallbackColor: "from-blue-400 to-cyan-500",
    category: "Aggregator",
    hasImage: true
  },
  "Turbos": {
    name: "Turbos",
    icon: "/Turbos.svg",
    fallbackColor: "from-orange-400 to-red-500",
    category: "DEX",
    hasImage: true
  },
  "Suilend": {
    name: "Suilend",
    icon: "/Suilend.png",
    fallbackColor: "from-blue-400 to-indigo-500",
    category: "Lending",
    hasImage: true
  },
  "Aftermath AMM": {
    name: "Aftermath AMM",
    icon: "/Aftermath_AMM.png",
    fallbackColor: "from-purple-500 to-pink-500",
    category: "DEX",
    hasImage: true
  },
  "Portal": {
    name: "Portal",
    icon: "/Portal.png",
    fallbackColor: "from-cyan-500 to-blue-500",
    category: "Bridge",
    hasImage: true
  },
  "Claynosaurz": {
    name: "Claynosaurz",
    icon: "/Claynosaurz.png",
    fallbackColor: "from-green-400 to-yellow-500",
    category: "Gaming",
    hasImage: true
  },
  "7K Aggregator": {
    name: "7K Aggregator",
    icon: "/7K_Aggregator.png",
    fallbackColor: "from-purple-400 to-indigo-500",
    category: "Aggregator",
    hasImage: true
  },
  "SpringSui": {
    name: "SpringSui",
    icon: "/SpringSui.png",
    fallbackColor: "from-green-400 to-teal-500",
    category: "DeFi",
    hasImage: true
  },
  "Wave": {
    name: "Wave",
    icon: "/Wave.png",
    fallbackColor: "from-blue-400 to-cyan-500",
    category: "DeFi",
    hasImage: true
  },
  "Ika": {
    name: "Ika",
    icon: "/Ika.png",
    fallbackColor: "from-purple-400 to-pink-500",
    category: "DeFi",
    hasImage: true
  },
  "Momentum": {
    name: "Momentum",
    icon: "/Momentum.svg",
    fallbackColor: "from-orange-400 to-red-500",
    category: "DeFi",
    hasImage: true
  },
  "Pyth": {
    name: "Pyth",
    icon: "/pyth.svg",
    fallbackColor: "from-purple-400 to-blue-500",
    category: "Infra",
    hasImage: true
  },
  "6degrees": {
    name: "6degrees",
    icon: "/6degrees.png",
    fallbackColor: "from-blue-400 to-indigo-500",
    category: "DeFi",
    hasImage: true
  },
  "FanTV AI": {
    name: "FanTV AI",
    icon: "/FanTV_AI.png",
    fallbackColor: "from-purple-400 to-pink-500",
    category: "AI",
    hasImage: true
  }
};

// Function to get DApp icon data
export const getDAppIconData = (name: string): DAppIconData => {
  return dappIconsData[name] || {
    name,
    icon: "🔷", // Default diamond icon
    fallbackColor: "from-gray-400 to-blue-500",
    category: "Unknown",
    hasImage: false
  };
};

// Function to generate initials as ultimate fallback
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
};

// Function to get category-based gradient
export const getCategoryGradient = (category: string): string => {
  const categoryGradients: { [key: string]: string } = {
    "DEX": "from-blue-400 to-cyan-500",
    "DeFi": "from-green-400 to-teal-500",
    "Gaming": "from-purple-400 to-pink-500",
    "NFT": "from-orange-400 to-red-500",
    "Bridge": "from-cyan-400 to-blue-500",
    "Wallet": "from-indigo-400 to-purple-500",
    "Infra": "from-gray-400 to-blue-500",
    "Lending": "from-yellow-400 to-orange-500",
    "Yield": "from-emerald-400 to-green-500",
    "Liquid Staking": "from-teal-400 to-cyan-500",
    "Aggregator": "from-indigo-400 to-purple-500",
    "AI": "from-purple-400 to-pink-500",
    "Unknown": "from-gray-400 to-blue-500"
  };
  
  return categoryGradients[category] || categoryGradients["Unknown"];
}; 