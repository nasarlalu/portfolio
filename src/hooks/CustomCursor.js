"use client"
import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', moveCursor);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <div
      style={{
        width: '20px',
        height: '20px',
        border: '2px solid #222',
        borderRadius: '50%',
        position: 'absolute',
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: 'transform 0.05s ease-out', // Faster transition
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
}
