code = """import { useState } from 'react';
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
    <section className="py-24 lg:py-32 relative bg-gradient-to-b from-[#070709] via-[#0E0D12] to-[#070709]" id="simulator">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-semibold tracking-[0.28em] text-[#C5A059] uppercase block mb-3">
            ИНТЕРАКТИВТІ СИМУЛЯТОР
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white mb-4">
            Ақылды Электрокарниздер жүйесі
          </h2>
          <p className="text-[#ABA69D] text-sm sm:text-base leading-relaxed">
            «Алиса, пердені аш!» — дауыспен немесе смартфоннан басқарылатын ультра-тыныш 24dB неміс механизмі. Төмендегі түймелерді басып немесе жүгірткіні жылжытып, перденің қалай қозғалатынын тікелей көріңіз:
          </p>
        </div>

        {/* Simulator Container */}
        <div className="max-w-4xl mx-auto rounded-3xl p-6 sm:p-10 bg-[#121117] border border-[#C5A059]/40 shadow-[0_25px_80px_rgba(0,0,0,0.8),0_0_30px_rgba(197,160,89,0.15)] relative">
          
          {/* Architectural Window Viewport */}
          <div className="relative w-full h-[320px] sm:h-[420px] rounded-2xl overflow-hidden bg-[#15161E] border-8 border-[#222126] shadow-inner">
            
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
              <div className="border-r-[4px] border-[#222126]" />
              <div className="border-l-[4px] border-[#222126]" />
              <div className="absolute top-1/2 left-0 right-0 h-[8px] bg-[#222126] -translate-y-1/2" />
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
            <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-[#444] to-[#1E1E1E] border-b border-black z-20" />

            {/* Left Fabric Curtain Panel (Framer Motion spring feel) */}
            <motion.div 
              className="absolute top-4 bottom-0 left-0 z-10 shadow-[5px_0_30px_rgba(0,0,0,0.8)] border-r-2 border-[#987838]"
              style={{
                width: `${curtainWidthPercent}%`,
                background: 'repeating-linear-gradient(90deg, #181513 0px, #2A2420 18px, #181513 36px), linear-gradient(180deg, rgba(197, 160, 89, 0.2) 0%, rgba(0, 0, 0, 0.7) 100%)',
              }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            />

            {/* Right Fabric Curtain Panel */}
            <motion.div 
              className="absolute top-4 bottom-0 right-0 z-10 shadow-[-5px_0_30px_rgba(0,0,0,0.8)] border-l-2 border-[#987838]"
              style={{
                width: `${curtainWidthPercent}%`,
                background: 'repeating-linear-gradient(90deg, #181513 0px, #2A2420 18px, #181513 36px), linear-gradient(180deg, rgba(197, 160, 89, 0.2) 0%, rgba(0, 0, 0, 0.7) 100%)',
              }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            />

            {/* Ambient Label Badge */}
            <div className="absolute top-7 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono tracking-widest text-[#EBD399] z-20">
              INTEKS SMART MOTOR // {openPercent}% АШЫҚ
            </div>

          </div>

          {/* Interactive Controls Bar */}
          <div className="mt-8">
            
            {/* Alice Presets */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 mb-7">
              <button 
                onClick={() => handlePreset(100, '100')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-all ${activePreset === '100' ? 'bg-[#C5A059] text-black border-[#C5A059]' : 'bg-white/[0.03] text-white/80 border-white/[0.1] hover:border-[#C5A059]'}`}
              >
                <Sun size={14} /> 100% Күндізгі жарық
              </button>

              <button 
                onClick={() => handlePreset(65, '65')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-all ${activePreset === '65' ? 'bg-[#C5A059] text-black border-[#C5A059]' : 'bg-white/[0.03] text-white/80 border-white/[0.1] hover:border-[#C5A059]'}`}
              >
                🌓 65% Жайлы күн сәулесі
              </button>

              <button 
                onClick={() => handlePreset(0, '0')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-all ${activePreset === '0' ? 'bg-[#C5A059] text-black border-[#C5A059]' : 'bg-white/[0.03] text-white/80 border-white/[0.1] hover:border-[#C5A059]'}`}
              >
                <Moon size={14} /> 0% Блэкаут (Ұйқы)
              </button>

              <button 
                onClick={() => handlePreset(50, 'alice')}
                className="flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold border border-[#C5A059] bg-[#C5A059]/10 text-[#EBD399] hover:bg-[#C5A059]/20 shadow-[0_0_15px_rgba(197,160,89,0.2)]"
              >
                <Mic size={14} className="text-[#C5A059] animate-pulse" />
                «Алиса, пердені 50%-ға аш»
              </button>
            </div>

            {/* Slider */}
            <div className="flex items-center gap-4">
              <span className="text-xs text-[#736E66] uppercase tracking-wider font-mono">ЖАБЫҚ</span>
              <input 
                type="range"
                min="0"
                max="100"
                value={openPercent}
                onChange={(e) => handleSliderChange(parseInt(e.target.value, 10))}
                className="w-full accent-[#C5A059] h-2 bg-white/10 rounded-lg cursor-pointer"
              />
              <span className="text-xs text-[#EBD399] font-mono font-bold min-w-[50px] text-right">
                {openPercent}%
              </span>
            </div>

            {/* Status Footer */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-5 border-t border-white/[0.08] text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#38ef7d] animate-ping" />
                <span className="text-[#ABA69D]">
                  Режим: <strong className="text-white">{openPercent >= 95 ? 'Толық күн сәулесі' : openPercent <= 5 ? '100% Блэкаут' : `Көлеңке (${openPercent}%)`}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2 text-[#736E66]">
                <Activity size={14} className={isHumming ? 'text-[#38ef7d] animate-spin' : ''} />
                <span>Неміс қозғалтқышы (24 dB тыныш)</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
"""
with open(r"C:\Users\User\.gemini\antigravity\scratch\inteks-studio\src\components\SmartSimulator.jsx", "w", encoding="utf-8") as f:
    f.write(code)
print("Created SmartSimulator.jsx")
