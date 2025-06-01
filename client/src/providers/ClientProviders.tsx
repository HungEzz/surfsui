"use client";

import React from "react";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import RouteGuard from "@/providers/RouteGuard";
import { DashboardProvider } from "@/contexts/DashboardContext";
import { createNetworkConfig, SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Import dApp Kit CSS
import '@mysten/dapp-kit/dist/index.css';

const queryClient = new QueryClient();

// Config options for the networks you want to connect to
const { networkConfig } = createNetworkConfig({
  localnet: { url: getFullnodeUrl('localnet') },
  testnet: { url: getFullnodeUrl('testnet') },
  mainnet: { url: getFullnodeUrl('mainnet') },
});

interface ClientProvidersProps {
  children: React.ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
        <WalletProvider>
          <ReactQueryProvider>
            <DashboardProvider>
              <RouteGuard>{children}</RouteGuard>
            </DashboardProvider>
          </ReactQueryProvider>
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
} 