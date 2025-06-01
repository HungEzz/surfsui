import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import ClientProviders from "@/providers/ClientProviders";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "SurfSui | Ride the Waves of Innovation on Sui",
  description:
    "SurfSui is revolutionizing decentralized finance on the Sui blockchain. Experience seamless DeFi analytics, portfolio management, and access to cutting-edge protocols.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.svg", sizes: "16x16", type: "image/svg+xml" },
      { url: "/favicon-32x32.svg", sizes: "32x32", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.svg",
  },
  keywords:
    "DeFi, Sui blockchain, cryptocurrency, wallet, dApp, decentralized finance",
  authors: [{ name: "SurfSui Team" }],
  openGraph: {
    title: "SurfSui | Ride the Waves of Innovation on Sui",
    description:
      "SurfSui is revolutionizing decentralized finance on the Sui blockchain. Experience seamless DeFi analytics, portfolio management, and access to cutting-edge protocols.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SurfSui | Ride the Waves of Innovation on Sui",
    description:
      "SurfSui is revolutionizing decentralized finance on the Sui blockchain. Experience seamless DeFi analytics, portfolio management, and access to cutting-edge protocols.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* dark mode */}
      <body className={`${inter.variable} antialiased overflow-x-hidden dark`}>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
