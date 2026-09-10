import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowUpRight, Maximize2, Sparkles, ChevronDown } from 'lucide-react';
import { playTick, playChime } from '../../utils/sound';

const CATEGORIES = [
  { id: 'all', label: 'Барлығы (60)' },
  { id: 'living', label: 'Сарайлық Зал' },
  { id: 'bedroom', label: 'Мастер-Спальня' },
  { id: 'kitchen', label: 'Асүй & Асхана' },
  { id: 'minimal', label: 'Минимализм' },
  { id: 'erker', label: 'Эркер & Панорама' },
  { id: 'atelier', label: 'Ателье Қолөнері' },
];

export default function EditorialBento({ allProjects, onSelectProject }) {
  const [activeCat, setActiveCat] = useState('all');
  const [search, setSearch] = useState('');
  const [visibleCount, setVisibleCount] = useState(15);

  const filteredProjects = useMemo(() => {
    return allProjects.filter((item) => {
      const matchCat = activeCat === 'all' || item.category === activeCat;
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.badge.toLowerCase().includes(q) ||
        item.num.includes(q);

      return matchCat && matchSearch;
    });
  }, [allProjects, activeCat, search]);

  const displayedProjects = filteredProjects.slice(0, visibleCount);

  return (
    <div className="space-y-8">
      {/* Category Pills & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCat(cat.id);
                setVisibleCount(15);
                playTick(950, 0.02);
              }}
              className={`relative px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all ${
                activeCat === cat.id
                  ? 'text-black font-bold'
                  : 'text-[#ABA69D] hover:text-white bg-white/[0.03] border border-white/[0.08]'
              }`}
            >
              {activeCat === cat.id && (
                <motion.span
                  layoutId="activeBentoPill"
                  className="absolute inset-0 bg-gradient-to-r from-[#EBD399] to-[#C5A059] rounded-full shadow-[0_0_15px_rgba(197,160,89,0.4)]"
                  transition={{ type: 'spring', damping: 22, stiffness: 280 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Live Search */}
        <div className="w-full md:w-72 relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#736E66] pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Іздеу (нөмірі, матасы)..."
            className="w-full bg-[#141319] border border-white/10 focus:border-[#C5A059] rounded-full py-2.5 pl-9 pr-4 text-xs text-white placeholder-[#736E66] outline-none transition-colors"
          />
        </div>
      </div>

      {/* Asymmetrical Editorial Bento Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[380px] sm:auto-rows-[440px]">
        <AnimatePresence>
          {displayedProjects.map((item, idx) => {
            // Asymmetrical layout: every 6th card is large hero 2 cols, 2 rows (on desktop)
            const isHero = idx % 6 === 0;
            const waText = encodeURIComponent(
              `Сәлеметсіз бе! «INTEKS» каталогынан №${item.num} «${item.title}» перде үлгісі ұнады. Бағасын нақтылап, тегін замерге жазылғым келеді.`
            );

            return (
              <motion.div
                layout
                key={item.index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className={`group rounded-3xl bg-[#111016] border border-white/[0.08] hover:border-[#C5A059]/70 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(197,160,89,0.2)] hover:-translate-y-1 relative ${
                  isHero ? 'sm:col-span-2 sm:row-span-2' : ''
                }`}
              >
                {/* Media Container with Full Uncropped Display */}
                <div
                  className="relative w-full h-full overflow-hidden cursor-pointer bg-[#0A090E] flex items-center justify-center"
                  onClick={() => {
                    onSelectProject(item);
                    playChime(850, 0.08);
                  }}
                >
                  {/* Ambient Blurred Background so sides match fabric perfectly */}
                  <img
                    src={`/assets/img/${item.filename}`}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-125 pointer-events-none"
                  />

                  {/* 100% Full Uncropped Curtain (Top to Bottom) */}
                  <img
                    src={`/assets/img/${item.filename}`}
                    alt={item.title}
                    loading="lazy"
                    className="relative z-10 w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-700 ease-out drop-shadow-2xl"
                  />

                  {/* Dramatic Gradient Overlay for typography */}
                  <div className="absolute inset-0 z-15 bg-gradient-to-t from-black/95 via-black/30 to-black/20 group-hover:via-black/15 transition-colors pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#C5A059]/40 text-[10px] sm:text-xs uppercase tracking-wider text-[#EBD399] font-medium flex items-center gap-1.5">
                      {isHero && <Sparkles size={11} className="text-[#C5A059]" />}
                      {item.badge}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-xs font-mono text-white/70">
                      №{item.num}
                    </span>
                  </div>

                  {/* Center Reveal Hint */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <span className="px-4 py-2 rounded-full bg-black/85 backdrop-blur-md border border-[#C5A059]/60 text-white text-xs font-semibold flex items-center gap-2 shadow-2xl">
                      <Maximize2 size={13} className="text-[#C5A059]" />
                      <span>Үлкейтіп көру</span>
                    </span>
                  </div>

                  {/* Bottom Info Details */}
                  <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 z-10 flex flex-col justify-end">
                    <h3
                      className={`font-serif text-white group-hover:text-[#EBD399] transition-colors leading-snug mb-1.5 ${
                        isHero ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`text-xs text-[#ABA69D] leading-relaxed line-clamp-2 mb-4 ${
                        isHero ? 'sm:text-sm max-w-xl' : ''
                      }`}
                    >
                      {item.desc}
                    </p>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProject(item);
                          playChime(850, 0.08);
                        }}
                        className="text-xs text-[#ABA69D] hover:text-white transition-colors"
                      >
                        Толық мәлімет
                      </button>

                      <a
                        href={`https://wa.me/77011291570?text=${waText}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          playChime(950, 0.1);
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#C5A059]/20 to-[#EBD399]/20 border border-[#C5A059]/60 hover:bg-[#C5A059] text-[#EBD399] hover:text-black text-xs font-semibold tracking-wider transition-all"
                      >
                        <span>Тапсырыс</span>
                        <ArrowUpRight size={13} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Pagination: Load More */}
      {visibleCount < filteredProjects.length && (
        <div className="text-center pt-8">
          <button
            onClick={() => {
              playTick(800, 0.02);
              setVisibleCount((prev) => prev + 15);
            }}
            className="px-8 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-[#C5A059]/40 hover:border-[#C5A059] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all hover:scale-105 inline-flex items-center gap-2"
          >
            <span>Тағы 15 шедеврді көрсету ({filteredProjects.length - visibleCount} қалды)</span>
            <ChevronDown size={16} />
          </button>
        </div>
      )}
    </div>
  );
}