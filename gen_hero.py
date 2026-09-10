code = """import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { playTick } from '../utils/sound';

export default function Hero() {
  return (
    <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-36 overflow-hidden bg-ambient-mesh" id="hero">
      
      {/* Background radiant orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#C5A059]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Kinetic Editorial Statement */}
          <div className="lg:col-span-7">
            
            {/* 21st.dev Style Glowing Border Beam Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#16151A]/80 border border-[#C5A059]/40 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(197,160,89,0.2)]"
            >
              <Sparkles size={13} className="text-[#C5A059] animate-spin-slow" />
              <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#EBD399]">
                HAUTE COUTURE ATELIER • 15 ЖЫЛДЫҚ ТӘЖІРИБЕ
              </span>
            </motion.div>

            {/* Giant Luxury Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-4xl sm:text-6xl xl:text-7xl font-normal leading-[1.12] tracking-tight text-white mb-8"
            >
              Әр терезеге — <br />
              <span className="text-gold-gradient italic font-normal">сарайлық сән мен</span> <br />
              авторлық дәлдік.
            </motion.h1>

            {/* Subtext */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-[#ABA69D] text-base sm:text-lg leading-relaxed max-w-2xl mb-10 font-light"
            >
              Шымкент қаласы, Түркістан және Қызылорда облыстарының элиталық резиденциялары мен премиум пәтерлеріне арналған жеке өлшемдегі авторлық перделер. Өлшеуден бастап, неміс бу генераторымен үтіктеп ілуге дейін толық 100% «кілтке тапсыру».
            </motion.p>

            {/* Dual CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 mb-14"
            >
              <a 
                href="https://wa.me/77011291570?text=Сәлеметсіз%20бе!%20Шеберді%20маталар%20чемоданымен%20тегін%20замерге%20шақырғым%20келеді."
                target="_blank"
                rel="noreferrer"
                onClick={() => playTick()}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#EBD399] via-[#C5A059] to-[#987838] text-[#0A0908] font-bold text-xs uppercase tracking-widest shadow-[0_10px_35px_rgba(197,160,89,0.35)] hover:shadow-[0_15px_45px_rgba(197,160,89,0.5)] hover:-translate-y-0.5 transition-all"
              >
                <span>Тегін замерге шақыру</span>
                <ArrowRight size={16} />
              </a>

              <a 
                href="#catalog"
                onClick={() => playTick()}
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.12] hover:border-[#C5A059] text-white text-xs font-semibold tracking-wider uppercase transition-all"
              >
                <span>60 жобаны қарау ↓</span>
              </a>
            </motion.div>

            {/* Key Metrics */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/[0.08]"
            >
              <div>
                <div className="font-serif text-3xl sm:text-4xl text-white font-light">60+</div>
                <div className="text-xs text-[#736E66] mt-1 font-medium">Орындалған жоба</div>
              </div>
              <div>
                <div className="font-serif text-3xl sm:text-4xl text-[#EBD399] font-light">1 500+</div>
                <div className="text-xs text-[#736E66] mt-1 font-medium">Түркия & Италия матасы</div>
              </div>
              <div>
                <div className="font-serif text-3xl sm:text-4xl text-white font-light">15 жыл</div>
                <div className="text-xs text-[#736E66] mt-1 font-medium">Кәсіби ателье</div>
              </div>
              <div>
                <div className="font-serif text-3xl sm:text-4xl text-[#38ef7d] font-light">5.0 ★</div>
                <div className="text-xs text-[#736E66] mt-1 font-medium">Мінсіз тұтынушы пікірі</div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: 3D Showcase Frame with Parallax Floating Card */}
          <div className="lg:col-span-5 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden border border-[#C5A059]/40 shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(197,160,89,0.2)] group"
            >
              <img 
                src="/assets/img/curtain-palace-peacock-hall.jpg" 
                alt="INTEKS Ресми Жобасы"
                className="w-full h-[520px] object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              {/* Floating Glass Label */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-xl bg-[#0D0C10]/85 backdrop-blur-xl border border-[#C5A059]/40 shadow-2xl">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] uppercase tracking-[0.24em] text-[#C5A059] font-bold">ТОП ЖОБА №01</span>
                  <span className="flex items-center gap-1 text-[11px] text-[#38ef7d] font-mono"><ShieldCheck size={13} /> Тікелей Зауыт</span>
                </div>
                <h4 className="font-serif text-lg text-white font-medium">Сарайлық Қонақ Бөлме: Павлинді Кестелі Тюль</h4>
                <p className="text-xs text-[#ABA69D] mt-1 line-clamp-1">Алтын-қола барқыты мен қолдан қадалған моншақты бахрома</p>
                <div className="mt-3 pt-3 border-t border-white/[0.08] flex justify-between items-center text-xs">
                  <span className="text-[#EBD399]">Текстиль + Бумен ілу</span>
                  <a href="https://wa.me/77011291570?text=Сәлеметсіз%20бе!%20№01%20перде%20туралы%20бағасын%20білгім%20келеді." target="_blank" rel="noreferrer" className="text-white hover:text-[#C5A059] font-semibold flex items-center gap-1">
                    Бағасын білу →
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
"""
with open(r"C:\Users\User\.gemini\antigravity\scratch\inteks-studio\src\components\Hero.jsx", "w", encoding="utf-8") as f:
    f.write(code)
print("Created Hero.jsx")
