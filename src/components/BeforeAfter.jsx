import { useState, useRef } from 'react';
import { Sparkles, SlidersHorizontal } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';
import { playTick } from '../utils/sound';

export default function BeforeAfter() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);

  const handleSliderChange = (newVal) => {
    setSliderPos(newVal);
    playTick(1000, 0.01);
  };

  const handlePointerMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleTouchMove = (e) => {
    handlePointerMove(e.touches[0].clientX);
  };

  return (
    <section className="py-20 lg:py-28 bg-transparent border-y border-[#EAE2D2]" id="transformation">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-[11px] font-semibold tracking-[0.28em] text-[#9E7728] uppercase inline-flex items-center gap-1.5 mb-3 font-mono px-3 py-1 rounded-full bg-white border border-[#C5A059]/40 shadow-xs">
            <Sparkles size={12} className="text-[#9E7728]" />
            <span>ТРАНСФОРМАЦИЯ: ДО ЖӘНЕ ПОСЛЕ</span>
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#1C1917] mb-4">
            Бөлменің өзгеру айырмашылығы
          </h2>
          <p className="text-[#5C554B] text-sm sm:text-base leading-relaxed">
            Жүгірткіні оңға-солға жылжытып, терезенің пердеге дейінгі суық көрінісі мен INTEKS сарайлық перделерінен кейінгі салтанатын салыстырыңыз:
          </p>

          {/* Quick Preset Buttons */}
          <div className="mt-5 flex items-center justify-center gap-2">
            <button
              onClick={() => handleSliderChange(0)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                sliderPos < 20
                  ? 'bg-[#1C1917] text-white border-[#1C1917] shadow-sm'
                  : 'bg-white text-[#6B6459] border-[#DFD3BF] hover:border-[#9E7728]'
              }`}
            >
              Пердесіз (ДО 100%)
            </button>
            <button
              onClick={() => handleSliderChange(50)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                sliderPos >= 20 && sliderPos <= 80
                  ? 'bg-[#C5A059] text-white border-[#C5A059] shadow-sm'
                  : 'bg-white text-[#6B6459] border-[#DFD3BF] hover:border-[#9E7728]'
              }`}
            >
              Ортасы (50 / 50)
            </button>
            <button
              onClick={() => handleSliderChange(100)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                sliderPos > 80
                  ? 'bg-[#0E8A42] text-white border-[#0E8A42] shadow-sm'
                  : 'bg-white text-[#6B6459] border-[#DFD3BF] hover:border-[#9E7728]'
              }`}
            >
              INTEKS Салтанаты (ПОСЛЕ 100%)
            </button>
          </div>
        </div>

        {/* Grand Interactive Before & After Showcase */}
        <div
          ref={containerRef}
          onTouchMove={handleTouchMove}
          className="relative max-w-5xl mx-auto h-[360px] sm:h-[480px] md:h-[560px] rounded-3xl overflow-hidden border-2 border-[#C5A059]/50 shadow-[0_25px_70px_rgba(180,150,110,0.22)] bg-[#FAF7F2] select-none group touch-pan-y"
        >
          {/* 1. BEFORE LAYER: Bare Empty Window (Underneath) */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <img 
              src={getAssetUrl('transformation-before-empty.jpg')} 
              alt="Пердеге дейін: жалаңаш суық терезе" 
              className="w-full h-full object-cover pointer-events-none"
            />
          </div>

          {/* 2. AFTER LAYER: Royal Bespoke Curtain Transformation (Clipped) */}
          <div 
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          >
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <img 
                src={getAssetUrl('transformation-after-royal.jpg')} 
                alt="INTEKS сарайлық авторлық ансамблі" 
                className="w-full h-full object-cover pointer-events-none"
              />
            </div>
          </div>

          {/* 3. Gold Dividing Bar with Luxury Glowing Handle */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-[#FFF0C8] via-[#C5A059] to-[#8C6418] shadow-[0_0_20px_rgba(197,160,89,0.9)] pointer-events-none z-20"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-white border-2 border-[#C5A059] flex items-center justify-center shadow-[0_4px_25px_rgba(0,0,0,0.3)] backdrop-blur-md">
              <span className="text-[#9E7728] text-sm font-mono font-bold tracking-widest">‹ ›</span>
            </div>
          </div>

          {/* 4. Glass Badges on Corners */}
          <div className="absolute top-5 left-5 z-20 pointer-events-none">
            <span className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-xs font-semibold text-[#5C554B] border border-[#DFD3BF] shadow-md flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#999999]" />
              <span>ДО: Пердесіз терезе</span>
            </span>
          </div>

          <div className="absolute top-5 right-5 z-20 pointer-events-none">
            <span className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold text-[#7A5714] border-2 border-[#C5A059] shadow-xl flex items-center gap-1.5">
              <Sparkles size={13} className="text-[#C5A059]" />
              <span>ПОСЛЕ: INTEKS Салтанаты ✦</span>
            </span>
          </div>

          {/* 5. Mobile Swipe Indicator */}
          <div className="sm:hidden absolute bottom-3 inset-x-0 flex justify-center z-20 pointer-events-none">
            <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] text-white font-medium shadow-sm">
              ↔ Жүгірткіні саусақпен жылжытыңыз
            </span>
          </div>

          {/* 6. Range Slider Native Control for Accessibility & Touch */}
          <input 
            type="range"
            min="0"
            max="100"
            value={sliderPos}
            onChange={(e) => handleSliderChange(Number(e.target.value))}
            aria-label="Бөлменің өзгеру айырмашылығын реттегіш"
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 touch-none"
          />

        </div>

      </div>
    </section>
  );
}
