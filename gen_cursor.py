code = """import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Cursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('button, a, input, [role="button"], .interactive-element')) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      {/* Center dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#C5A059] pointer-events-none z-[999999]"
        animate={{
          x: mousePos.x - 4,
          y: mousePos.y - 4,
          scale: isHovered ? 0 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 450, mass: 0.1 }}
      />
      {/* Outer aura ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-[#C5A059]/50 pointer-events-none z-[999998]"
        animate={{
          x: mousePos.x - (isHovered ? 24 : 16),
          y: mousePos.y - (isHovered ? 24 : 16),
          width: isHovered ? 48 : 32,
          height: isHovered ? 48 : 32,
          backgroundColor: isHovered ? 'rgba(197, 160, 89, 0.12)' : 'transparent',
          borderColor: isHovered ? 'rgba(235, 211, 153, 0.8)' : 'rgba(197, 160, 89, 0.4)',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 300, mass: 0.2 }}
      />
    </>
  );
}
"""
import os
os.makedirs(r"C:\Users\User\.gemini\antigravity\scratch\inteks-studio\src\components", exist_ok=True)
with open(r"C:\Users\User\.gemini\antigravity\scratch\inteks-studio\src\components\Cursor.jsx", "w", encoding="utf-8") as f:
    f.write(code)
print("Created Cursor.jsx")
