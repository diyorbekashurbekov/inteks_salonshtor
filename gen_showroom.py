code = """import { MapPin, Phone, Instagram, Clock, ExternalLink, MessageCircle } from 'lucide-react';
import { playTick } from '../utils/sound';

export default function Showroom() {
  return (
    <section className="py-24 bg-[#0A090E]" id="contacts">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-semibold tracking-[0.28em] text-[#C5A059] uppercase block mb-3">
            РЕСМИ ШОУРУМ & БАЙЛАНЫС
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white mb-4">
            Бізге қонаққа келіңіз
          </h2>
          <p className="text-[#ABA69D] text-sm sm:text-base leading-relaxed">
            Шымкент қаласындағы ресми салонымызда 1 500+ мата үлгілері мен дайын перде композициялары күтуде:
          </p>
        </div>

        <div className="max-w-4xl mx-auto rounded-3xl bg-[#121117] border border-[#C5A059]/40 p-8 sm:p-12 shadow-[0_20px_70px_rgba(0,0,0,0.8)] grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Address */}
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C5A059] font-mono block mb-2">МЕКЕНЖАЙ:</span>
            <h3 className="font-serif text-2xl text-white font-normal mb-3">Шымкент, Арғынбеков көшесі, 23/22</h3>
            <p className="text-xs text-[#ABA69D] leading-relaxed mb-6">
              «Inteks Salon Shtor» салоны. Күн сайын 10:00 - 20:00 (Демалыссыз, үзіліссіз жұмыс істейміз).
            </p>

            <div className="flex flex-col gap-3">
              <a 
                href="https://maps.google.com/?q=42.362045,69.605225" 
                target="_blank" 
                rel="noreferrer"
                onClick={() => playTick()}
                className="flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/40 hover:bg-[#C5A059] text-[#EBD399] hover:text-black font-semibold text-xs uppercase tracking-wider transition-all"
              >
                <MapPin size={15} />
                <span>Google Maps навигаторымен ашу</span>
                <ExternalLink size={13} />
              </a>

              <a 
                href="https://wa.me/77011291570?text=Сәлеметсіз%20бе!%20Шоурумға%20баруға%20бағыт%20сұрағым%20келеді." 
                target="_blank" 
                rel="noreferrer"
                onClick={() => playTick()}
                className="flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-white/[0.04] border border-white/[0.1] hover:border-white text-white font-medium text-xs tracking-wider transition-all"
              >
                <MessageCircle size={15} className="text-[#38ef7d]" />
                <span>Шоурумға бағыт сұрау (WhatsApp)</span>
              </a>
            </div>
          </div>

          {/* Direct Info */}
          <div className="md:border-l md:border-white/[0.08] md:pl-10 flex flex-col justify-between gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#C5A059] font-mono block mb-2">БАЙЛАНЫС ОРТАЛЫҒЫ:</span>
              <a 
                href="https://wa.me/77011291570" 
                className="font-serif text-2xl sm:text-3xl text-white hover:text-[#EBD399] font-normal block transition-colors mb-4"
              >
                +7 (701) 129-15-70
              </a>

              <div className="flex flex-col gap-3 text-xs text-[#ABA69D]">
                <div className="flex items-center gap-2.5">
                  <Clock size={15} className="text-[#C5A059]" />
                  <span>Күн сайын 10:00 – 20:00 (демалыссыз)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Instagram size={15} className="text-[#C5A059]" />
                  <a href="https://www.instagram.com/inteks_salonshtor" target="_blank" rel="noreferrer" className="hover:text-white underline">
                    @inteks_salonshtor (49 000 оқырман)
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin size={15} className="text-[#C5A059]" />
                  <span>Шымкент • Түркістан • Қызылорда облыстары</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] text-xs text-[#736E66]">
              * Шеберлеріміз 500+ мата чемоданымен үйіңізге кез келген уақытта тегін келуге дайын.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
"""
with open(r"C:\Users\User\.gemini\antigravity\scratch\inteks-studio\src\components\Showroom.jsx", "w", encoding="utf-8") as f:
    f.write(code)
print("Created Showroom.jsx")
