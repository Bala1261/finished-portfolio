"use client";

import React from "react";
import { ReactLenis } from "@/lib/lenis";
import { useMediaQuery } from "@/hooks/use-media-query";

interface LenisProps {
  children: React.ReactNode;
  isInsideModal?: boolean;
}

function SmoothScroll({ children, isInsideModal = false }: LenisProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Disable Lenis on mobile — native scroll handles address bar,
  // momentum, and touch gestures correctly. Lenis fights all of these.
  if (isMobile && !isInsideModal) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root={!isInsideModal}
      options={{
        duration: 1.2,
        prevent: (node) => {
          if (isInsideModal) return true;
          const modalOpen = node.classList.contains("modall");
          return modalOpen;
        },
      }}
    >
      {children}
    </ReactLenis>
  );
}

export default SmoothScroll;

