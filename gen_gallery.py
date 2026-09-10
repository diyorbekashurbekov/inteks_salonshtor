code = """import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowUpRight, Maximize2 } from 'lucide-react';
import { GALLERY_DATA } from '../data/gallery';
import { playTick, playChime } from '../utils/sound';

const CATEGORIES = [
  { id: 'all', label: 'Барлығы (60)' },
  { id: 'living', label: 'Сарайлық Зал & Барокко' },
  { id: 'bedroom', label: 'Мастер-Спальня' },
  { id: 'kitchen', label: 'Асүй & Асхана' },
  { id: 'minimal', label: 'Минимализм & Блэкаут' },
  { id: 'erker', label: 'Эркер & Панорама' },
  { id: 'atelier', label: 'Ателье Детальдары' }
];

export default function Gallery({ onSelectProject }) {
  const [activeCat, setActiveCat] = useState('all');
  const [search, setSearch] = useState('');

  const filteredProjects = useMemo(() => {
    return GALLERY_DATA.filter(item => {
      const matchCat = activeCat === 'all' || item.category === activeCat;
      const q = search.toLowerCase().trim();
      const matchSearch = !q ||
        item.title.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.badge.toLowerCase().includes(q) ||
        item.num.includes(q);

      return matchCat && matchSearch;
    });
  }, [activeCat, search]);

  return (
    <section className="py-24 lg:py-36 bg-[#0A090E] relative" id="catalog">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] font-semibold tracking-[0.28em] text-[#C5A059] uppercase block mb-3">
            АВТОРЛЫҚ КАТАЛОГ (60 ЖОБА)
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white mb-4">
            Біздің нақты жұмыстар
          </h2>
          <p className="text-[#ABA69D] text-sm sm:text-base leading-relaxed">
            Шымкент, Түркістан және Қызылорданың жеке резиденцияларына тігілген нақты жобалар галереясы. Кез келген үлгі бойынша тікелей баға біліп, өлшеуге тапсырыс бере аласыз:
          </p>
        </div>

        {/* Filter Pills with Motion layout */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCat(cat.id);
                playTick(950, 0.02);
              }}
              className={`relative px-5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all ${activeCat === cat.id ? 'text-black font-bold' : 'text-[#ABA69D] hover:text-white bg-white/[0.03] border border-white/[0.08]'}`}
            >
              {activeCat === cat.id && (
                <motion.span
                  layoutId="activeFilterPill"
                  className="absolute inset-0 bg-gradient-to-r from-[#EBD399] to-[#C5A059] rounded-full shadow-[0_0_15px_rgba(197,160,89,0.4)]"
                  transition={{ type: 'spring', damping: 22, stiffness: 280 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto relative mb-6">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#736E66] pointer-events-none" />
          <input 
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Жоба атауын, матасын немесе нөмірін іздеу..."
            className="w-full bg-[#141318] border border-white/[0.1] focus:border-[#C5A059] rounded-full py-3.5 pl-11 pr-5 text-sm text-white placeholder-[#736E66] outline-none shadow-inner transition-colors"
          />
        </div>

        <div className="text-center text-xs text-[#736E66] font-mono mb-12">
          60 жобаның {filteredProjects.length}-і көрсетілуде
        </div>

        {/* Bento Cards Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          <AnimatePresence>
            {filteredProjects.map((item) => {
              const waText = encodeURIComponent(`Сәлеметсіз бе! «INTEKS» сайтынан №${item.num} «${item.title}» перде үлгісі ұнады. Бағасын нақтылап, тегін замерге жазылғым келеді.`);

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  key={item.index}
                  className="group rounded-2xl bg-[#131217] border border-white/[0.08] hover:border-[#C5A059]/60 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(197,160,89,0.18)] hover:-translate-y-1.5"
                >
                  {/* Media */}
                  <div 
                    className="relative h-64 overflow-hidden cursor-pointer bg-black"
                    onClick={() => {
                      onSelectProject(item);
                      playChime(850, 0.08);
                    }}
                  >
                    <img 
                      src={`/assets/img/${item.filename}`}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-[#C5A059]/40 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xl">
                        <Maximize2 size={13} className="text-[#C5A059]" /> Үлкейтіп көру
                      </span>
                    </div>

                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-wider text-[#EBD399]">
                      {item.badge}
                    </span>
                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/80 text-[11px] font-mono text-[#736E66]">
                      №{item.num}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="font-serif text-xl font-normal text-white group-hover:text-[#EBD399] transition-colors mb-2">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#ABA69D] line-clamp-2 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <div className="pt-5 mt-4 border-t border-white/[0.06] flex items-center justify-between">
                      <button 
                        onClick={() => {
                          onSelectProject(item);
                          playChime(850, 0.08);
                        }}
                        className="text-xs text-[#736E66] hover:text-white transition-colors"
                      >
                        Толығырақ
                      </button>

                      <a 
                        href={`https://wa.me/77011291570?text=${waText}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/40 hover:bg-[#C5A059] text-[#EBD399] hover:text-black text-xs font-semibold tracking-wider transition-all"
                      >
                        <span>Тапсырыс</span>
                        <ArrowUpRight size={13} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
"""
with open(r"C:\Users\User\.gemini\antigravity\scratch\inteks-studio\src\components\Gallery.jsx", "w", encoding="utf-8") as f:
    f.write(code)
print("Created Gallery.jsx")
