"use client";

import React from "react";
import Lightfall from "./Lightfall";
import { useMediaQuery } from "@/hooks/use-media-query";

export const ResponsiveLightfall = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Desktop uses original clean settings; mobile uses higher visibility settings
  return (
    <div className="fixed inset-0 -z-30 w-full h-full pointer-events-none overflow-hidden">
      <Lightfall
        dpr={isMobile ? 0.75 : 1}
        colors={['#8A2BE2', '#5227FF', '#FF007F', '#A6C8FF', '#00F0FF']}
        backgroundColor="#030014"
        speed={isMobile ? 0.35 : 0.3}
        streakCount={2}
        streakWidth={isMobile ? 0.8 : 0.65}
        streakLength={isMobile ? 0.4 : 0.35}
        glow={isMobile ? 0.55 : 0.3}
        density={isMobile ? 0.95 : 0.75}
        twinkle={isMobile ? 0.25 : 0.2}
        zoom={isMobile ? 2.0 : 2.2}
        backgroundGlow={isMobile ? 0.35 : 0.25}
        opacity={isMobile ? 0.95 : 0.8}
        mouseInteraction={!isMobile}
        mouseStrength={0.5}
        mouseRadius={1.1}
      />
    </div>
  );
};

export default ResponsiveLightfall;
