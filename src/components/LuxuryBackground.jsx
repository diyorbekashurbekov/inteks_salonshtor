import { motion } from 'framer-motion';

export default function LuxuryBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 1. Base Royal Alabaster & Warm Ivory Gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-[#FCFAF6] via-[#F6F2EA] to-[#EEE8DC]"
      />

      {/* 2. Top Golden Sunlight Chandelier Radiance */}
      <div 
        className="absolute -top-[160px] left-1/2 -translate-x-1/2 w-[700px] md:w-[1200px] h-[400px] md:h-[700px] rounded-full bg-gradient-to-b from-[#E8D19F]/30 via-[#D4B574]/15 to-transparent blur-[50px] md:blur-[120px]"
      />

      {/* 3. Left Ambient Warm Champagne Glow Orb (Animated on desktop, static on mobile for 60fps) */}
      <div className="md:hidden absolute top-[20%] -left-[60px] w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-[#E6CA85]/20 via-[#DFC17B]/15 to-transparent blur-[40px]" />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.45, 0.7, 0.45],
          x: [-20, 25, -20],
          y: [-25, 20, -25],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="hidden md:block absolute top-[25%] -left-[100px] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#E6CA85]/25 via-[#DFC17B]/18 to-transparent blur-[140px] will-change-transform"
      />

      {/* 4. Right Side Warm Golden Honey Glow (Animated on desktop, static on mobile for 60fps) */}
      <div className="md:hidden absolute top-[45%] -right-[60px] w-[320px] h-[320px] rounded-full bg-gradient-to-bl from-[#ECD8A5]/20 via-[#D6B265]/15 to-transparent blur-[45px]" />
      <motion.div
        animate={{
          scale: [1.1, 0.95, 1.1],
          opacity: [0.4, 0.65, 0.4],
          x: [20, -25, 20],
          y: [20, -20, 20],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="hidden md:block absolute top-[50%] -right-[120px] w-[650px] h-[650px] rounded-full bg-gradient-to-bl from-[#ECD8A5]/25 via-[#D6B265]/18 to-transparent blur-[150px] will-change-transform"
      />

      {/* 5. Bottom Warm Pearl Glow */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] md:w-[1100px] h-[250px] md:h-[450px] rounded-full bg-gradient-to-t from-[#E2CE9B]/20 via-transparent to-transparent blur-[40px] md:blur-[130px]"
      />

      {/* 6. Delicate Architectural Drafting Grid (Champagne Gold) */}
      <div 
        className="absolute inset-0 opacity-[0.05] md:opacity-[0.065] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #B89047 1px, transparent 1px),
            linear-gradient(to bottom, #B89047 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 40%, transparent 95%)',
          WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 40%, transparent 95%)',
        }}
      />

      {/* 7. Fine Silk Canvas Grain Texture (Desktop only for max mobile performance) */}
      <div 
        className="hidden md:block absolute inset-0 opacity-[0.025] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}