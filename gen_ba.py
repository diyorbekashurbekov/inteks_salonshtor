code = """import { useState } from 'react';

export default function BeforeAfter() {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <section className="py-20 bg-[#070709] border-y border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] font-semibold tracking-[0.28em] text-[#C5A059] uppercase block mb-3">
            ТРАНСФОРМАЦИЯ & НӘТИЖЕ
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white mb-4">
            Бөлменің өзгеру айырмашылығы
          </h2>
          <p className="text-[#ABA69D] text-sm leading-relaxed">
            Жүгірткіні оңға-солға жылжытып, терезенің пердеге дейінгі және INTEKS ательесінен кейінгі сәнін салыстырыңыз:
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto h-[380px] sm:h-[480px] rounded-3xl overflow-hidden border border-[#C5A059]/40 shadow-2xl group">
          
          {/* Before Image */}
          <img 
            src="/assets/img/curtain-bedroom-detail.jpg" 
            alt="Пердеге дейін" 
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* After Image Layer with Clip Path */}
          <div 
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          >
            <img 
              src="/assets/img/curtain-bedroom-suite.jpg" 
              alt="INTEKS авторлық ансамблі" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Dividing Bar */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-[#EBD399] via-[#C5A059] to-[#987838] shadow-[0_0_15px_rgba(197,160,89,0.8)] pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#121117] border-2 border-[#EBD399] flex items-center justify-center shadow-2xl">
              <span className="text-white text-xs font-mono font-bold">‹ ›</span>
            </div>
          </div>

          {/* Labels */}
          <span className="absolute bottom-6 left-6 px-4 py-1.5 rounded-full bg-black/75 backdrop-blur-md text-xs font-medium text-[#ABA69D] border border-white/10 pointer-events-none">
            Қарапайым бөлме
          </span>
          <span className="absolute bottom-6 right-6 px-4 py-1.5 rounded-full bg-black/75 backdrop-blur-md text-xs font-semibold text-[#EBD399] border border-[#C5A059]/50 shadow-[0_0_15px_rgba(197,160,89,0.3)] pointer-events-none">
            INTEKS Салтанаты ✦
          </span>

          {/* Range Slider Invisible Handle */}
          <input 
            type="range"
            min="0"
            max="100"
            value={sliderPos}
            onChange={(e) => setSliderPos(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
          />

        </div>

      </div>
    </section>
  );
}
"""
with open(r"C:\Users\User\.gemini\antigravity\scratch\inteks-studio\src\components\BeforeAfter.jsx", "w", encoding="utf-8") as f:
    f.write(code)
print("Created BeforeAfter.jsx")
