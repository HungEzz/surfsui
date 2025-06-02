"use client";

import React, { useRef, useState } from "react";
import Image from 'next/image';

interface GlassmorphismCardProps {
  title: string;
  description: string;
  buttonText?: string;
  onClick?: () => void;
  className?: string;
  titleGradient?: string;
  descriptionGradient?: string;
  buttonGradient?: string;
  imageSrc?: string;
  tiltEffect?: boolean;
  hue?: number;
}

const GlassmorphismCard: React.FC<GlassmorphismCardProps> = ({
  title,
  description,
  buttonText = "Try it",
  onClick,
  className = "",
  titleGradient,
  descriptionGradient,
  buttonGradient = "",
  imageSrc = "/debt.png",
  tiltEffect = true,
  hue = 240,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltValues, setTiltValues] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Generate gradients based on hue
  const dynamicTitleGradient = titleGradient || `from-[hsl(${hue},70%,70%)] to-[hsl(${(hue + 30) % 360},70%,80%)]`;
  const dynamicDescriptionGradient = descriptionGradient || `from-[hsl(${hue},50%,85%)] to-[hsl(${(hue + 30) % 360},50%,90%)]`;

  // Handle mouse movement for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !tiltEffect) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Calculate the mouse position relative to the center of the card
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate the tilt values, max +/- 15 degrees
    const maxTilt = 12;
    const tiltX = ((e.clientY - centerY) / (rect.height / 2)) * maxTilt;
    const tiltY = ((centerX - e.clientX) / (rect.width / 2)) * maxTilt;
    
    setTiltValues({ x: tiltX, y: tiltY });
  };

  // Reset tilt when mouse leaves
  const handleMouseLeave = () => {
    setIsHovering(false);
    // Smoothly reset the tilt
    setTiltValues({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  return (
    <div 
      ref={cardRef}
      className={`relative rounded-3xl overflow-hidden ${className} perspective-1000`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: tiltEffect && isHovering 
          ? `rotateX(${tiltValues.x}deg) rotateY(${tiltValues.y}deg) scale(1.02)`
          : 'rotateX(0) rotateY(0) scale(1)',
        transition: isHovering ? 'transform 0.1s ease-out' : 'transform 0.5s ease',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Glass card with transparency to match screenshot */}
      <div 
        className="rounded-3xl p-6 flex flex-col items-center text-center h-full bg-white/10"
        style={{
          border: "1px solid rgba(255, 255, 255, 0.08)",
          transform: 'translateZ(10px)',
        }}
      >
        <div 
          className="mb-6 flex justify-center"
          style={{
            transform: tiltEffect && isHovering ? 'translateZ(25px)' : 'translateZ(0)',
            transition: isHovering ? 'transform 0.1s ease-out' : 'transform 0.5s ease',
          }}
        >
          <Image 
            src={imageSrc} 
            alt={title} 
            width={56}
            height={56}
            className="w-14 h-14" 
          />
        </div>
        
        <h2 
          className={`text-3xl font-bold mb-3 bg-gradient-to-r ${dynamicTitleGradient} bg-clip-text text-transparent`}
          style={{
            transform: tiltEffect && isHovering ? 'translateZ(20px)' : 'translateZ(0)',
            transition: isHovering ? 'transform 0.1s ease-out' : 'transform 0.5s ease',
          }}
        >
          {title}
        </h2>
        
        <p 
          className={`mb-6 bg-gradient-to-r ${dynamicDescriptionGradient} bg-clip-text text-transparent font-medium`}
          style={{
            transform: tiltEffect && isHovering ? 'translateZ(15px)' : 'translateZ(0)',
            transition: isHovering ? 'transform 0.1s ease-out' : 'transform 0.5s ease',
          }}
        >
          {description}
        </p>
        
        {buttonText && (
          <div 
            className="relative mt-auto"
            style={{
              transform: tiltEffect && isHovering ? 'translateZ(30px)' : 'translateZ(0)',
              transition: isHovering ? 'transform 0.1s ease-out' : 'transform 0.5s ease',
            }}
          >
            {/* Button glow effect */}
            {buttonGradient && (
              <div 
                className={`absolute inset-0 blur-md bg-gradient-to-r ${buttonGradient} opacity-70 animate-pulse-slow rounded-xl`}
                style={{
                  transform: 'scale(1.05)',
                }}
              />
            )}
            
            {/* Actual button */}
            <button 
              className={`py-2 px-6 rounded-xl relative group overflow-hidden ${
                buttonGradient ? `bg-gradient-to-r ${buttonGradient}` : 'bg-white/10'
              }`}
              onClick={onClick}
              style={{
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                transition: "all 0.3s ease",
              }}
            >
              {/* Button hover effect */}
              <span className="absolute inset-0 w-full h-full bg-white/0 group-hover:bg-white/10 transition-all duration-300 ease-out"></span>
              
              {/* Button text */}
              <span className="relative z-10 text-white font-medium">{buttonText}</span>
            </button>
          </div>
        )}
      </div>
      
      {/* Highlight effect when tilting */}
      {tiltEffect && (
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isHovering ? 
              `radial-gradient(circle at ${tiltValues.y * -8 + 50}% ${tiltValues.x * 8 + 50}%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 60%)` : 
              'none',
            transition: isHovering ? 'none' : 'background 0.5s ease',
          }}
        />
      )}
    </div>
  );
};

export default GlassmorphismCard;