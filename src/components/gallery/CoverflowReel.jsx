import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, MessageCircle, Sparkles } from 'lucide-react';
import { playTick, playChime } from '../../utils/sound';

export default function CoverflowReel({ projects, onSelectProject }) {
  const [activeIndex, setActiveIndex] = useState(2);
  const items = projects.slice(0, 18); // Showcase curated 18 items in coverflow

  const handlePrev = () => {
    playTick(800, 0.02);
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
  };

  const handleNext = () => {
    playTick(800, 0.02);
    setActiveIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
  };

  const activeItem = items[activeIndex] || items[0];
  const waText = encodeURIComponent(
    `Сәлеметсіз бе! «INTEKS» 3D каруселінен №${activeItem.num} «${activeItem.title}» пердесі ұнады. Бағасын нақтылап беріңізші.`
  );

  return (
    <div className="relative py-8 overflow-hidden rounded-3xl bg-[#0B0A0F] border border-white/10 shadow-[0_20px_70px_rgba(0,0,0,0.9)]">
      
      {/* 3D Runway Reel Container */}
      <div className="relative h-[480px] sm:h-[540px] flex items-center justify-center perspective-[1000px] overflow-hidden">
        {items.map((item, idx) => {
          const offset = idx - activeIndex;
          const isCurrent = offset === 0;
          const absOffset = Math.abs(offset);

          // Only render visible adjacent cards (-2 to +2)
          if (absOffset > 2) return null;

          const x = offset * 220; // horizontal offset
          const z = -absOffset * 150; // depth
          const rotateY = offset * -25; // 3D angle
          const opacity = isCurrent ? 1 : 1 - absOffset * 0.35;
          const scale = isCurrent ? 1.05 : 1 - absOffset * 0.15;

          return (
            <motion.div
              key={item.index}
              animate={{
                x,
                z,
                rotateY,
                opacity,
                scale,
              }}
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
              onClick={() => {
                if (isCurrent) {
                  onSelectProject(item);
                  playChime(900, 0.1);
                } else {
                  playTick(900, 0.02);
                  setActiveIndex(idx);
                }
              }}
              className={`absolute w-64 sm:w-80 h-[440px] sm:h-[500px] rounded-2xl overflow-hidden cursor-pointer shadow-2xl transition-all ${
                isCurrent
                  ? 'border-2 border-[#C5A059] shadow-[0_0_50px_rgba(197,160,89,0.4)] z-30 bg-[#121117]'
                  : 'border border-white/10 z-10 bg-[#0c0b10]'
              }`}
            >
              {/* Ambient blurred backdrop */}
              <img
                src={`/assets/img/${item.filename}`}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover blur-xl opacity-40 scale-125 pointer-events-none"
              />
              {/* Full uncropped curtain photo */}
              <img
                src={`/assets/img/${item.filename}`}
                alt={item.title}
                className="relative z-10 w-full h-full object-contain p-2 drop-shadow-xl"
              />
              <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-5 flex flex-col justify-between pointer-events-none">
                <div className="flex justify-between items-center">
                  <span className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-[#C5A059]/40 text-[10px] text-[#EBD399] font-mono">
                    {item.badge}
                  </span>
                  <span className="text-xs font-mono text-white/70">
                    №{item.num}
                  </span>
                </div>

                {isCurrent && (
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl text-white font-normal mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#ABA69D] line-clamp-1 mb-3">
                      {item.desc}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-[#C5A059] font-semibold flex items-center gap-1">
                        <Maximize2 size={12} /> Ашу үшін басыңыз
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Reel Controls */}
      <div className="flex items-center justify-between px-6 sm:px-12 mt-4">
        <button
          onClick={handlePrev}
          aria-label="Алдыңғы үлгі"
          className="w-12 h-12 rounded-full bg-white/10 hover:bg-[#C5A059] text-white hover:text-black flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        >
          <ChevronLeft size={22} />
        </button>

        {/* WhatsApp direct order for current */}
        <a
          href={`https://wa.me/77011291570?text=${waText}`}
          target="_blank"
          rel="noreferrer"
          onClick={() => playChime(950, 0.1)}
          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-semibold text-xs flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
        >
          <MessageCircle size={15} />
          <span>№{activeItem.num} үлгісін WhatsApp-та сұрау</span>
        </a>

        <button
          onClick={handleNext}
          aria-label="Келесі үлгі"
          className="w-12 h-12 rounded-full bg-white/10 hover:bg-[#C5A059] text-white hover:text-black flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        >
          <ChevronRight size={22} />
        </button>
      </div>

    </div>
  );
}