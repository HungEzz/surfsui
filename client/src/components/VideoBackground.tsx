"use client";

import React from "react";

const VideoBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <video
        className="absolute min-w-full min-h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/video-background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoBackground;
