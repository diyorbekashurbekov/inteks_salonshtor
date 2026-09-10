import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { playTick } from '../utils/sound';
import { useSiteData } from '../context/SiteDataContext';
import FastImage from './common/FastImage';
import { getAssetUrl } from '../utils/assets';

export default function Hero() {
  const { data } = useSiteData();
  const { siteSettings, projects } = data;
  const topProject = projects[0] || {
    filename: 'curtain-palace-peacock-hall.jpg',
    num: '01',
    title: 'Сарайлық Қонақ Бөлме: Павлинді Кестелі Тюль',
    desc: 'Алтын-қола барқыты мен қолдан қадалған моншақты бахрома',
    badge: 'ТОП ЖОБА №01',
  };
  return (
    <section className="relative pt-8 pb-16 sm:pt-12 sm:pb-24 lg:pt-20 lg:pb-36 overflow-hidden bg-ambient-mesh" id="hero">
      
      {/* Background radiant orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#C5A059]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left Column: Kinetic Editorial Statement */}
          <div className="lg:col-span-7">
            
            {/* 21st.dev Style Glowing Border Beam Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/90 border border-[#C5A059]/50 backdrop-blur-md mb-6 sm:mb-8 shadow-[0_4px_20px_rgba(197,160,89,0.18)]"
            >
              <Sparkles size={13} className="text-[#9E7728] animate-spin-slow" />
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] sm:tracking-[0.22em] uppercase text-[#8B6520] font-mono">
                HAUTE COUTURE ATELIER • 15 ЖЫЛДЫҚ ТӘЖІРИБЕ
              </span>
            </motion.div>

            {/* Giant Luxury Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-editorial text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal leading-[1.14] sm:leading-[1.12] tracking-tight text-[#1C1917] mb-6 sm:mb-8"
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
              className="text-[#5C554B] text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mb-8 sm:mb-10 font-normal"
            >
              Шымкент қаласы, Түркістан және Қызылорда облыстарының элиталық резиденциялары мен премиум пәтерлеріне арналған жеке өлшемдегі авторлық перделер. Өлшеуден бастап, неміс бу генераторымен үтіктеп ілуге дейін толық 100% «кілтке тапсыру».
            </motion.p>

            {/* Dual CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10 sm:mb-14"
            >
              <a 
                href={`https://wa.me/${siteSettings.whatsappNumber}?text=Сәлеметсіз%20бе!%20Шеберді%20маталар%20чемоданымен%20тегін%20замерге%20шақырғым%20келеді.`}
                target="_blank"
                rel="noreferrer"
                onClick={() => playTick()}
                className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#987838] text-white font-bold text-xs uppercase tracking-wider sm:tracking-widest shadow-[0_10px_35px_rgba(197,160,89,0.35)] hover:shadow-[0_15px_45px_rgba(197,160,89,0.5)] hover:-translate-y-0.5 active:scale-95 transition-all"
              >
                <span>Тегін замерге шақыру</span>
                <ArrowRight size={16} />
              </a>

              <a 
                href="#catalog"
                onClick={() => playTick()}
                className="inline-flex items-center gap-2 px-5 sm:px-7 py-3.5 sm:py-4 rounded-full bg-white hover:bg-[#F6F1E8] border border-[#DFD3BF] hover:border-[#9E7728] text-[#2C2723] text-xs font-semibold tracking-wider uppercase transition-all shadow-sm active:scale-95"
              >
                <span>{projects.length} жобаны қарау ↓</span>
              </a>
            </motion.div>

            {/* Key Metrics */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-[#EAE2D2]"
            >
              <div>
                <div className="font-editorial text-2xl sm:text-4xl text-[#1C1917] font-normal">{projects.length}+</div>
                <div className="text-[11px] sm:text-xs text-[#787168] mt-0.5 sm:mt-1 font-medium">Орындалған жоба</div>
              </div>
              <div>
                <div className="font-editorial text-2xl sm:text-4xl text-[#9E7728] font-normal">1 500+</div>
                <div className="text-[11px] sm:text-xs text-[#787168] mt-0.5 sm:mt-1 font-medium">Мата үлгілері</div>
              </div>
              <div>
                <div className="font-editorial text-2xl sm:text-4xl text-[#7A5714] font-normal">100%</div>
                <div className="text-[11px] sm:text-xs text-[#787168] mt-0.5 sm:mt-1 font-medium">Тегін лазер замер</div>
              </div>
              <div>
                <div className="font-editorial text-2xl sm:text-4xl text-[#0E8A42] font-normal">5.0 ★</div>
                <div className="text-[11px] sm:text-xs text-[#787168] mt-0.5 sm:mt-1 font-medium">Мінсіз тұтынушы пікірі</div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: 3D Showcase Frame with Parallax Floating Card */}
          <div className="lg:col-span-5 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden border border-[#C5A059]/50 shadow-[0_25px_70px_rgba(180,150,110,0.2)] group bg-[#FAF7F2] h-[380px] sm:h-[460px] lg:h-[530px] flex items-center justify-center p-3 sm:p-4"
            >
              {/* Ambient backdrop */}
              <div className="md:hidden absolute inset-0 bg-gradient-to-b from-[#F5ECDC]/60 via-transparent to-[#F2E8D7]/40 pointer-events-none" />
              <img 
                src={getAssetUrl(topProject.filename)} 
                alt=""
                aria-hidden="true"
                className="hidden md:block absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-125 pointer-events-none"
                onError={(e) => { e.target.src = getAssetUrl('curtain-palace-peacock-hall.jpg'); }}
              />

              {/* FastImage for 100% full uncropped curtain photo */}
              <FastImage 
                src={topProject.filename} 
                alt={topProject.title}
                priority={true}
                className="relative z-10 w-auto h-full max-h-[510px] max-w-full rounded-2xl group-hover:scale-[1.01] transition-transform duration-500 ease-out"
                imgClassName="drop-shadow-2xl object-contain"
              />

              {/* Top Badges (floating cleanly at top) */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20 pointer-events-none">
                <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#C5A059]/50 text-[10px] sm:text-xs uppercase tracking-wider text-[#9E7728] font-bold font-mono shadow-xs">
                  {topProject.badge || `ТОП ЖОБА №${topProject.num}`}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#EAE2D2] text-[10px] sm:text-xs text-[#0E8A42] font-mono font-semibold flex items-center gap-1 shadow-xs">
                  <ShieldCheck size={13} /> Тікелей Зауыт
                </span>
              </div>
            </motion.div>

            {/* Bottom Action Card (Directly Below Image - 0% curtain covered) */}
            <div className="mt-3 p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-[#C5A059]/40 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h4 className="font-editorial text-lg text-[#1C1917] font-semibold">{topProject.title}</h4>
                <p className="text-xs text-[#6B6459] line-clamp-1">{topProject.desc}</p>
              </div>
              <a 
                href={`https://wa.me/${siteSettings.whatsappNumber}?text=Сәлеметсіз%20бе!%20№${topProject.num}%20перде%20туралы%20бағасын%20білгім%20келеді.`} 
                target="_blank" 
                rel="noreferrer" 
                className="px-4 py-2 rounded-full bg-[#FAF5EB] hover:bg-[#C5A059] text-[#7A5714] hover:text-white border border-[#C5A059]/40 font-bold text-xs flex items-center gap-1 transition-all whitespace-nowrap shadow-xs"
              >
                Бағасын білу →
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
