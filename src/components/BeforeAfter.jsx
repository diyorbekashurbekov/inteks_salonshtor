import { useState } from 'react';

export default function BeforeAfter() {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <section className="py-20 bg-transparent border-y border-[#EAE2D2]">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] font-semibold tracking-[0.28em] text-[#9E7728] uppercase block mb-3 font-mono">
            ТРАНСФОРМАЦИЯ & НӘТИЖЕ
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#1C1917] mb-4">
            Бөлменің өзгеру айырмашылығы
          </h2>
          <p className="text-[#5C554B] text-sm leading-relaxed">
            Жүгірткіні оңға-солға жылжытып, терезенің пердеге дейінгі және INTEKS ательесінен кейінгі сәнін салыстырыңыз:
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto h-[380px] sm:h-[480px] rounded-3xl overflow-hidden border border-[#C5A059]/50 shadow-[0_20px_60px_rgba(180,150,110,0.2)] bg-[#FAF7F2] group">
          
          {/* Before Image with Ambient Backdrop */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <img 
              src="/assets/img/curtain-bedroom-detail.jpg" 
              alt="" 
              className="absolute inset-0 w-full h-full object-cover blur-xl opacity-40 scale-125 pointer-events-none"
            />
            <img 
              src="/assets/img/curtain-bedroom-detail.jpg" 
              alt="Пердеге дейін" 
              className="relative z-10 w-auto h-full max-h-[480px] object-contain"
            />
          </div>

          {/* After Image Layer with Clip Path */}
          <div 
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          >
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#FAF7F2]">
              <img 
                src="/assets/img/curtain-bedroom-suite.jpg" 
                alt="" 
                className="absolute inset-0 w-full h-full object-cover blur-xl opacity-40 scale-125 pointer-events-none"
              />
              <img 
                src="/assets/img/curtain-bedroom-suite.jpg" 
                alt="INTEKS авторлық ансамблі" 
                className="relative z-10 w-auto h-full max-h-[480px] object-contain"
              />
            </div>
          </div>

          {/* Dividing Bar */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-[#EBD399] via-[#C5A059] to-[#987838] shadow-[0_0_15px_rgba(197,160,89,0.8)] pointer-events-none z-20"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white border-2 border-[#C5A059] flex items-center justify-center shadow-2xl">
              <span className="text-[#9E7728] text-xs font-mono font-bold">‹ ›</span>
            </div>
          </div>

          {/* Labels */}
          <span className="absolute bottom-6 left-6 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-xs font-medium text-[#5C554B] border border-[#EAE2D2] pointer-events-none shadow-md z-20">
            Қарапайым бөлме
          </span>
          <span className="absolute bottom-6 right-6 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold text-[#7A5714] border-2 border-[#C5A059] shadow-xl pointer-events-none z-20">
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
