import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Mic, Activity, Check } from 'lucide-react';
import { playTick, playChime } from '../utils/sound';

export default function SmartSimulator() {
  const [openPercent, setOpenPercent] = useState(65);
  const [activePreset, setActivePreset] = useState('65');
  const [isHumming, setIsHumming] = useState(false);

  const handleSliderChange = (val) => {
    setOpenPercent(val);
    setActivePreset('');
    playTick(500 + val * 5, 0.015);
  };

  const handlePreset = (val, key) => {
    setActivePreset(key);
    setIsHumming(true);
    playChime(750, 0.12);

    let start = openPercent;
    const end = val;
    const step = end > start ? 2 : -2;

    const interval = setInterval(() => {
      start += step;
      if ((step > 0 && start >= end) || (step < 0 && start <= end)) {
        clearInterval(interval);
        setOpenPercent(end);
        setTimeout(() => setIsHumming(false), 500);
      } else {
        setOpenPercent(start);
      }
    }, 16);
  };

  // Curtains calculate: 50% down to 12% width
  const curtainWidthPercent = 50 - (openPercent * 0.38);
  const daylightOpacity = 0.2 + ((openPercent / 100) * 0.8);
  const warmGlowOpacity = (1 - (openPercent / 100)) * 0.45;

  return (
    <section className="py-24 lg:py-32 relative bg-transparent" id="simulator">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-semibold tracking-[0.28em] text-[#9E7728] uppercase block mb-3 font-mono">
            ИНТЕРАКТИВТІ СИМУЛЯТОР
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#1C1917] mb-4">
            Ақылды Электрокарниздер жүйесі
          </h2>
          <p className="text-[#5C554B] text-sm sm:text-base leading-relaxed">
            «Алиса, пердені аш!» — дауыспен немесе смартфоннан басқарылатын ультра-тыныш 24dB неміс механизмі. Төмендегі түймелерді басып немесе жүгірткіні жылжытып, перденің қалай қозғалатынын тікелей көріңіз:
          </p>
        </div>

        {/* Simulator Container */}
        <div className="max-w-4xl mx-auto rounded-3xl p-6 sm:p-10 bg-white/92 border border-[#C5A059]/40 shadow-[0_20px_60px_rgba(180,150,110,0.15)] backdrop-blur-xl relative">
          
          {/* Architectural Window Viewport */}
          <div className="relative w-full h-[320px] sm:h-[420px] rounded-2xl overflow-hidden bg-[#FAF8F5] border-8 border-[#EADFCB] shadow-inner">
            
            {/* Sky Horizon */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#4A7BD4] via-[#6FA3EF] to-[#E9F0FA]" />

            {/* Sunlight Beam */}
            <div 
              className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
              style={{
                opacity: daylightOpacity,
                background: 'radial-gradient(circle at 50% 25%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 220, 150, 0.4) 50%, transparent 80%)'
              }}
            />

            {/* Interior Window Frames */}
            <div className="absolute inset-0 grid grid-cols-2 pointer-events-none">
              <div className="border-r-[4px] border-[#3A3530]" />
              <div className="border-l-[4px] border-[#3A3530]" />
              <div className="absolute top-1/2 left-0 right-0 h-[8px] bg-[#3A3530] -translate-y-1/2" />
            </div>

            {/* Ambient Room Light (Dims when curtains close) */}
            <div 
              className="absolute inset-0 pointer-events-none transition-all duration-500"
              style={{
                backgroundColor: `rgba(197, 160, 89, ${warmGlowOpacity})`,
                boxShadow: `inset 0 0 100px rgba(0, 0, 0, ${1 - openPercent / 100})`
              }}
            />

            {/* Motorized Track Rail */}
            <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-[#555] to-[#2B2724] border-b border-black z-20" />

            {/* Left Fabric Curtain Panel (Framer Motion spring feel) */}
            <motion.div 
              className="absolute top-4 bottom-0 left-0 z-10 shadow-[5px_0_30px_rgba(0,0,0,0.5)] border-r-2 border-[#987838]"
              style={{
                width: `${curtainWidthPercent}%`,
                background: 'repeating-linear-gradient(90deg, #2B2520 0px, #423830 18px, #2B2520 36px), linear-gradient(180deg, rgba(197, 160, 89, 0.2) 0%, rgba(0, 0, 0, 0.6) 100%)',
              }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            />

            {/* Right Fabric Curtain Panel */}
            <motion.div 
              className="absolute top-4 bottom-0 right-0 z-10 shadow-[-5px_0_30px_rgba(0,0,0,0.5)] border-l-2 border-[#987838]"
              style={{
                width: `${curtainWidthPercent}%`,
                background: 'repeating-linear-gradient(90deg, #2B2520 0px, #423830 18px, #2B2520 36px), linear-gradient(180deg, rgba(197, 160, 89, 0.2) 0%, rgba(0, 0, 0, 0.6) 100%)',
              }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            />

            {/* Ambient Label Badge */}
            <div className="absolute top-7 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#C5A059]/50 text-[11px] font-mono tracking-widest text-[#7A5714] font-semibold z-20 shadow-md">
              INTEKS SMART MOTOR // {openPercent}% АШЫҚ
            </div>

          </div>

          {/* Interactive Controls Bar */}
          <div className="mt-8">
            
            {/* Alice Presets */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 mb-7">
              <button 
                onClick={() => handlePreset(100, '100')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-all ${activePreset === '100' ? 'bg-[#9E7728] text-white border-[#9E7728] shadow-md' : 'bg-[#F8F4EC] text-[#4A453D] border-[#DFD3BF] hover:border-[#9E7728]'}`}
              >
                <Sun size={14} /> 100% Күндізгі жарық
              </button>

              <button 
                onClick={() => handlePreset(65, '65')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-all ${activePreset === '65' ? 'bg-[#9E7728] text-white border-[#9E7728] shadow-md' : 'bg-[#F8F4EC] text-[#4A453D] border-[#DFD3BF] hover:border-[#9E7728]'}`}
              >
                🌓 65% Жайлы күн сәулесі
              </button>

              <button 
                onClick={() => handlePreset(0, '0')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-all ${activePreset === '0' ? 'bg-[#9E7728] text-white border-[#9E7728] shadow-md' : 'bg-[#F8F4EC] text-[#4A453D] border-[#DFD3BF] hover:border-[#9E7728]'}`}
              >
                <Moon size={14} /> 0% Блэкаут (Ұйқы)
              </button>

              <button 
                onClick={() => handlePreset(50, 'alice')}
                className="flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold border border-[#C5A059] bg-[#C5A059]/15 text-[#7A5714] hover:bg-[#C5A059]/25 shadow-sm"
              >
                <Mic size={14} className="text-[#9E7728] animate-pulse" />
                «Алиса, пердені 50%-ға аш»
              </button>
            </div>

            {/* Slider */}
            <div className="flex items-center gap-4">
              <span className="text-xs text-[#787168] uppercase tracking-wider font-mono font-semibold">ЖАБЫҚ</span>
              <input 
                type="range"
                min="0"
                max="100"
                value={openPercent}
                onChange={(e) => handleSliderChange(parseInt(e.target.value, 10))}
                className="w-full accent-[#9E7728] h-2 bg-[#EADFCB] rounded-lg cursor-pointer"
              />
              <span className="text-xs text-[#7A5714] font-mono font-bold min-w-[50px] text-right">
                {openPercent}%
              </span>
            </div>

            {/* Status Footer */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-5 border-t border-[#EAE2D2] text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0E8A42] animate-ping" />
                <span className="text-[#5C554B]">
                  Режим: <strong className="text-[#1C1917]">{openPercent >= 95 ? 'Толық күн сәулесі' : openPercent <= 5 ? '100% Блэкаут' : `Көлеңке (${openPercent}%)`}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2 text-[#787168]">
                <Activity size={14} className={isHumming ? 'text-[#0E8A42] animate-spin' : ''} />
                <span>Неміс қозғалтқышы (24 dB тыныш)</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
