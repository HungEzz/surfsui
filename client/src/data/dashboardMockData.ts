export interface Trader {
  id: string;
  address: string;
  pnl30d: number;
  winRate: number;
  avatar?: string;
  isWhale?: boolean;
}

export interface DApp {
  rank: number;
  name: string;
  account: number;
  type: "DEX" | "AI" | "Gaming" | "DeFi" | "NFT" | "Bridge" | "Lending" | "Yield" | "Infra" | "Aggregator" | "Marketing" | "Liquid Staking";
}

export const topTraders: Trader[] = [
  { id: "1", address: "0xabcd1234abcd1234abcd1234abcd1234abcd1234", pnl30d: 2140502, winRate: 67 },
  { id: "2", address: "0xdef45678def45678def45678def45678def45678", pnl30d: 1872345, winRate: 72 },
  { id: "3", address: "0xabc87654abc87654abc87654abc87654abc87654", pnl30d: 1456789, winRate: 58 },
  { id: "4", address: "0xdef98765def98765def98765def98765def98765", pnl30d: 2540123, winRate: 81 },
  { id: "5", address: "0x123abcde123abcde123abcde123abcde123abcde", pnl30d: 1925631, winRate: 64 },
  { id: "6", address: "0x456defgh456defgh456defgh456defgh456defgh", pnl30d: 3102458, winRate: 75 }
];

export const topWhales: Trader[] = [
  { id: "1", address: "0xffff1234ffff1234ffff1234ffff1234ffff1234", pnl30d: 15240502, winRate: 82, isWhale: true },
  { id: "2", address: "0xeeee5678eeee5678eeee5678eeee5678eeee5678", pnl30d: 9872345, winRate: 77, isWhale: true },
  { id: "3", address: "0xdddd7654dddd7654dddd7654dddd7654dddd7654", pnl30d: 7456789, winRate: 69, isWhale: true }
];

// Optimized DApps list - only essential ones
export const allDApps: DApp[] = [
  { rank: 1, name: "Cetus AMM", account: 2847592, type: "DEX" },
  { rank: 2, name: "Turbos", account: 1923847, type: "DEX" },
  { rank: 3, name: "Suilend", account: 1456789, type: "Lending" },
  { rank: 4, name: "Aftermath AMM", account: 1234567, type: "DEX" },
  { rank: 5, name: "Portal", account: 987654, type: "Bridge" },
  { rank: 6, name: "SpringSui", account: 654321, type: "DeFi" },
  { rank: 7, name: "Wave", account: 543210, type: "DeFi" },
  { rank: 8, name: "Ika", account: 432109, type: "DeFi" },
  { rank: 9, name: "FanTV AI", account: 3456789, type: "AI" },
  { rank: 10, name: "Pyth", account: 2987654, type: "Infra" },
  { rank: 11, name: "Claynosaurz", account: 2654321, type: "Gaming" },
  { rank: 12, name: "7K Aggregator", account: 2321098, type: "Aggregator" },
  { rank: 13, name: "6degrees", account: 1987654, type: "DeFi" },
  { rank: 14, name: "Momentum", account: 1654321, type: "DeFi" },
  { rank: 15, name: "Cetus Aggregator", account: 1321098, type: "Aggregator" },
  { rank: 16, name: "DeepBook", account: 987654, type: "DEX" },
  { rank: 17, name: "FlowX", account: 654321, type: "DEX" },
  { rank: 18, name: "Kriya", account: 321098, type: "DEX" },
  { rank: 19, name: "Scallop", account: 876543, type: "DeFi" },
  { rank: 20, name: "Navi", account: 765432, type: "DeFi" }
];

export const getDAppsForPage = (page: number, searchTerm: string = '') => {
  let filteredDApps = allDApps;
  
  if (searchTerm.trim()) {
    filteredDApps = allDApps.filter(dapp => 
      dapp.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  const itemsPerPage = 20;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  const pageData = filteredDApps.slice(startIndex, endIndex);
  
  const section1 = pageData.slice(0, 10);
  const section2 = pageData.slice(10, 20);
  
  return {
    section1,
    section2,
    totalPages: Math.ceil(filteredDApps.length / itemsPerPage),
    totalItems: filteredDApps.length,
    currentPage: page
  };
};

export const trendingDApps: DApp[] = allDApps.slice(0, 10);
export const topDeFiProtocols: DApp[] = allDApps.slice(10, 20);

export interface WalletInfo {
  address: string;
  balance: number;
  tier: "Basic" | "Pro" | "Elite";
}

export const userWallet: WalletInfo = {
  address: "0xabcd1234ef5678abcd1234ef5678abcd1234ef56",
  balance: 3.45,
  tier: "Basic"
};
