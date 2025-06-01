"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BiophilicBackground from "@/components/dashboard/BiophilicBackground";
import SplashCursor from '@/components/SplashCursor'
import Footer from "@/components/Footer";

export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-white">
      <SplashCursor />
      <BiophilicBackground />
      <div className="relative z-10">
        <Navbar />
        <main>
          <HeroSection />
        </main>
        <Footer />
      </div>
    </div>
  );
} 