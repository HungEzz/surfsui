"use client";

import React from "react";
import GlassmorphismCard from "@/components/GlassmorphismCard";

const LendBorrowCards = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-10 mb-20">
      {/* Lend Card */}
      <GlassmorphismCard
        title="Lend"
        description="Lend assets and earn passive yield with ease!"
        titleGradient="from-pink-400 to-purple-500"
        descriptionGradient="from-pink-100 to-purple-100"
        buttonGradient="from-pink-500/40 to-purple-500/40"
        imageSrc="/debt.png"
      />
      
      {/* Borrow Card */}
      <GlassmorphismCard
        title="Borrow"
        description="Borrow smarter, lightning-fast approvals with low-interest rates!"
        titleGradient="from-blue-400 to-cyan-400"
        descriptionGradient="from-blue-100 to-cyan-100"
        buttonGradient="from-blue-500/40 to-cyan-500/40"
        imageSrc="/loan.png"
      />
    </div>
  );
};

export default LendBorrowCards; 