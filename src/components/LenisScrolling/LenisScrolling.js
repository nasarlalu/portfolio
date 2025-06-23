"use client";
import React, { useEffect } from 'react'
import { ReactLenis } from "@studio-freight/react-lenis";

function LenisScrolling({ children }) {

  // useEffect(() => {
  //   const handleContextMenu = (e) => e.preventDefault();
  //   document.addEventListener("contextmenu", handleContextMenu);
  //   return () => document.removeEventListener("contextmenu", handleContextMenu);
  // }, []);

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothTouch: true }}>
      {children}
    </ReactLenis>
  );
}

export default LenisScrolling;
