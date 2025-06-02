"use client";

import React from "react";
import Image from 'next/image';

interface GlassmorphismCreditCardProps {
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  className?: string;
  logoSrc?: string;
}

const GlassmorphismCreditCard: React.FC<GlassmorphismCreditCardProps> = ({
  cardholderName,
  cardNumber,
  expiryDate,
  className = "",
  logoSrc = "/visa-logo.svg"
}) => {
  // Format card number with spaces
  const formattedCardNumber = cardNumber
    .replace(/\s/g, '')
    .match(/.{1,4}/g)
    ?.join(' ') || cardNumber;

  return (
    <div 
      className={`relative w-full max-w-md mx-auto rounded-2xl overflow-hidden ${className}`}
      style={{ aspectRatio: '1.6/1' }}
    >
      <div 
        className="absolute inset-0 rounded-2xl backdrop-blur-md bg-gradient-to-br from-purple-400/30 to-pink-500/30 border border-white/20"
        style={{
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          backdropFilter: "blur(16px)",
        }}
      />
      
      {/* Card content */}
      <div className="relative z-10 h-full p-6 flex flex-col justify-between">
        {/* Card logo and chip */}
        <div className="flex justify-between items-start">
          <div className="w-12 h-8 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-md" />
          <Image 
            src={logoSrc} 
            alt="Card logo" 
            width={80}
            height={24}
            className="h-6 object-contain opacity-90"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
        
        {/* Card number */}
        <div className="mt-auto">
          <div className="mt-4">
            <p className="text-lg font-light text-white/70 uppercase tracking-wide mb-1">
              {cardholderName}
            </p>
            <h2 className="text-2xl md:text-3xl text-white font-mono tracking-wider">
              {formattedCardNumber}
            </h2>
          </div>
          
          {/* Expiry */}
          <div className="mt-4">
            <p className="text-sm text-white/70">
              {expiryDate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlassmorphismCreditCard; 