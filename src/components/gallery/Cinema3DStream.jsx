import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, Maximize2, MessageCircle, Sparkles } from 'lucide-react';
import { playTick, playChime } from '../../utils/sound';
import { useSiteData } from '../../context/SiteDataContext';
import { preloadBatch } from '../../utils/imageOptimizer';
import FastImage from '../common/FastImage';
import { getAssetUrl } from '../../utils/assets';

export default function Cinema3DStream({ allProjects, onSelectProject }) {
  const { data } = useSiteData();
  const { siteSettings } = data;
  const [activeCat, setActiveCat] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(() => 
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const categories = [
    { id: 'all', label: `Барлығы (${allProjects.length})` },
    { id: 'living', label: 'Сарайлық Зал' },
    { id: 'bedroom', label: 'Мастер-Спальня' },
    { id: 'kitchen', label: 'Асүй & Асхана' },
    { id: 'minimal', label: 'Минимализм' },
    { id: 'erker', label: 'Эркер & Панорама' },
    { id: 'atelier', label: 'Ателье Қолөнері' },
  ];

  // Filtered project list
  const filtered = activeCat === 'all'
    ? allProjects
    : allProjects.filter((p) => p.category === activeCat);

  // Preload adjacent items for 0ms delay on next/prev
  useEffect(() => {
    if (filtered.length > 0) {
      const nextIdx = (currentIndex + 1) % filtered.length;
      const prevIdx = (currentIndex - 1 + filtered.length) % filtered.length;
      const next2Idx = (currentIndex + 2) % filtered.length;
      const targets = [
        filtered[currentIndex],
        filtered[nextIdx],
        filtered[prevIdx],
        filtered[next2Idx],
      ]
        .filter(Boolean)
        .map((p) => (p.filename?.startsWith('http') ? p.filename : `/assets/img/${p.filename}`));
      preloadBatch(targets);
    }
  }, [currentIndex, filtered]);

  // Touch Swipe for Mobile
  const touchStartXRef = useRef(null);
  const touchEndXRef = useRef(null);

  const handleTouchStart = (e) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
    touchEndXRef.current = null;
  };

  const handleTouchMove = (e) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current === null || touchEndXRef.current === null) return;
    const diff = touchStartXRef.current - touchEndXRef.current;
    if (diff > 45) {
      // swipe left -> next
      handleNext();
    } else if (diff < -45) {
      // swipe right -> prev
      handlePrev();
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  // Reset index when category changes
  const handleCatChange = (catId) => {
    playTick(950, 0.02);
    setActiveCat(catId);
    setCurrentIndex(0);
  };

  // Next / Prev handlers
  const handleNext = () => {
    playTick(850, 0.02);
    setCurrentIndex((prev) => (prev + 1) % filtered.length);
  };

  const handlePrev = () => {
    playTick(850, 0.02);
    setCurrentIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
  };

  // 3D Auto-play loop: advances every 3.4 seconds
  useEffect(() => {
    if (!isPlaying || isHovered || filtered.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filtered.length);
    }, 3400);
    return () => clearInterval(interval);
  }, [isPlaying, isHovered, filtered.length]);

  const activeProject = filtered[currentIndex] || filtered[0];

  const waText = encodeURIComponent(
    `Сәлеметсіз бе! «INTEKS» 3D подиумынан №${activeProject?.num} «${activeProject?.title}» пердесі ұнады. Осы жоба бойынша кеңес алып, бағасын есептеткім келеді.`
  );

  return (
    <div 
      className="relative space-y-6 sm:space-y-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Category Filter Pills & Auto-Play Status Header (Scrollable on mobile) */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar touch-pan-x pb-1 w-full md:w-auto">
          {categories.map((cat) => {
            const isActive = activeCat === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCatChange(cat.id)}
                className={`relative flex-shrink-0 px-3.5 sm:px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all ${
                  isActive
                    ? 'text-white font-bold shadow-md'
                    : 'text-[#5C554B] hover:text-[#9E7728] bg-white/90 border border-[#E0D5C3]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="active3DStreamPill"
                    className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#987838] rounded-full"
                    transition={{ type: 'spring', damping: 22, stiffness: 280 }}
                  />
                )}
                <span className="relative z-10 whitespace-nowrap">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Auto-play Status & Play/Pause Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              playTick(700, 0.02);
              setIsPlaying(!isPlaying);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 hover:bg-white border border-[#EAE2D2] text-xs text-[#7A5714] font-medium transition-all shadow-sm"
          >
            {isPlaying ? (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0E8A42] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0E8A42]"></span>
                </span>
                <Pause size={13} />
                <span>3D Айналым: Қосулы</span>
              </>
            ) : (
              <>
                <Play size={13} className="text-[#9E7728]" />
                <span>3D Айналым: Кідіртілді</span>
              </>
            )}
          </button>

          <span className="text-xs font-mono text-[#787168] hidden sm:inline font-semibold">
            №{currentIndex + 1} / {filtered.length}
          </span>
        </div>
      </div>

      {/* THE 3D SPATIAL RUNWAY STAGE with Mobile Touch Gestures */}
      <div 
        className="relative h-[490px] sm:h-[600px] flex items-center justify-center perspective-[1200px] overflow-hidden rounded-3xl bg-gradient-to-b from-[#FDFBF7] via-[#F7F2EA] to-[#EFE8DC] border border-[#EAE2D2] shadow-[0_30px_80px_rgba(180,150,110,0.18)] touch-pan-y select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Ambient Stage Lighting */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#E8D19F]/25 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#E2CE9B]/30 via-transparent to-transparent pointer-events-none" />

        {/* 3D Flow Cards */}
        {filtered.map((item, idx) => {
          let offset = idx - currentIndex;
          const total = filtered.length;
          if (offset > total / 2) offset -= total;
          if (offset < -total / 2) offset += total;

          const absOffset = Math.abs(offset);
          const maxVisibleOffset = isMobile ? 1 : 2;
          if (absOffset > maxVisibleOffset) return null;

          const isCurrent = offset === 0;

          const x = isMobile ? offset * 215 : offset * 280;
          const z = isMobile ? -absOffset * 80 : -absOffset * 140;
          const rotateY = isMobile ? offset * -18 : offset * -28;
          const scale = isCurrent ? (isMobile ? 1.03 : 1.08) : Math.max(0.76, 1 - absOffset * 0.15);
          const opacity = isCurrent ? 1 : Math.max(0.4, 1 - absOffset * 0.32);

          return (
            <motion.div
              key={item.index}
              animate={{
                x,
                z,
                rotateY,
                scale,
                opacity,
              }}
              transition={{ type: 'spring', stiffness: 240, damping: 26 }}
              onClick={() => {
                if (isCurrent) {
                  onSelectProject(item);
                  playChime(900, 0.1);
                } else {
                  playTick(900, 0.02);
                  setCurrentIndex(idx);
                }
              }}
              className={`absolute w-72 sm:w-88 h-[440px] sm:h-[530px] rounded-3xl overflow-hidden cursor-pointer transition-all ${
                isCurrent
                  ? 'border-2 border-[#C5A059] shadow-[0_25px_60px_rgba(180,140,80,0.3)] z-30 bg-white'
                  : 'border border-[#EAE2D2] z-10 bg-[#FAF7F2]'
              }`}
            >
              {/* Media Container with 100% Full Uncropped View */}
              <div className="relative w-full h-full flex items-center justify-center p-3 overflow-hidden bg-[#FAF7F2]">
                {/* Ambient Backdrop - lightweight on mobile */}
                <div className="md:hidden absolute inset-0 bg-gradient-to-b from-[#F5ECDC]/50 via-transparent to-[#F2E8D7]/40 pointer-events-none" />
                <img
                  src={getAssetUrl(item.filename)}
                  alt=""
                  aria-hidden="true"
                  className="hidden md:block absolute inset-0 w-full h-full object-cover blur-2xl opacity-35 scale-125 pointer-events-none"
                />

                {/* 100% Full Uncropped FastImage */}
                <FastImage
                  src={item.filename}
                  alt={item.title}
                  priority={isCurrent}
                  className="relative z-10 max-h-[410px] sm:max-h-[500px] w-auto max-w-full rounded-xl"
                  imgClassName="drop-shadow-xl"
                />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#C5A059]/50 text-[10px] sm:text-xs uppercase tracking-wider text-[#7A5714] font-mono font-semibold shadow-xs">
                    {item.badge}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md border border-[#EAE2D2] text-xs font-mono text-[#5C554B] font-semibold">
                    №{item.num}
                  </span>
                </div>

                {/* Sleek Minimal Bottom Click Hint for Active Card (0% curtain obstructed) */}
                {isCurrent && (
                  <div className="absolute bottom-3 inset-x-0 z-20 flex justify-center pointer-events-none">
                    <span className="px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#C5A059]/50 text-[11px] font-mono font-semibold text-[#7A5714] shadow-md flex items-center gap-1.5">
                      <Maximize2 size={12} className="text-[#9E7728]" />
                      <span>Шерткенде толық ашылады</span>
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}

        {/* Previous Button */}
        <button
          onClick={handlePrev}
          aria-label="Алдыңғы 3D үлгі"
          className="absolute left-4 sm:left-8 z-40 w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-white/95 hover:bg-[#C5A059] text-[#1C1917] hover:text-white border border-[#DFD3BF] flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 active:scale-95 shadow-xl"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          aria-label="Келесі 3D үлгі"
          className="absolute right-4 sm:right-8 z-40 w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-white/95 hover:bg-[#C5A059] text-[#1C1917] hover:text-white border border-[#DFD3BF] flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 active:scale-95 shadow-xl"
        >
          <ChevronRight size={24} />
        </button>

      </div>

      {/* Active Project Direct Action Bar */}
      {activeProject && (
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#EAE2D2] shadow-sm backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl overflow-hidden border border-[#C5A059] flex-shrink-0 bg-[#FAF7F2]">
              <img
                src={getAssetUrl(activeProject.filename)}
                alt={activeProject.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#9E7728] font-semibold">ҚАЗІРГІ 3D ТАҢДАУ:</span>
                <span className="text-xs text-[#787168] font-mono">№{activeProject.num} / 60</span>
              </div>
              <h5 className="font-editorial text-lg text-[#1C1917] font-semibold">
                {activeProject.title}
              </h5>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => {
                onSelectProject(activeProject);
                playChime(900, 0.1);
              }}
              className="flex-1 md:flex-none px-5 py-3 rounded-full bg-[#FAF5EB] hover:bg-[#F2EAE0] border border-[#DFD3BF] text-xs text-[#2C2723] font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <Maximize2 size={14} className="text-[#9E7728]" />
              <span>Толық көру</span>
            </button>

            <a
              href={`https://wa.me/${siteSettings.whatsappNumber}?text=${waText}`}
              target="_blank"
              rel="noreferrer"
              onClick={() => playChime(950, 0.1)}
              className="flex-1 md:flex-none px-6 py-3 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(37,211,102,0.3)] hover:scale-105 transition-transform"
            >
              <MessageCircle size={16} />
              <span>Осы 3D үлгіні WhatsApp-та сұрау</span>
            </a>
          </div>
        </div>
      )}

      {/* CONTINUOUS 3D INFINITE MOVING RIBBON */}
      <div className="pt-4">
        <div className="flex items-center justify-between mb-3 px-2">
          <span className="text-[11px] uppercase tracking-widest text-[#787168] font-mono flex items-center gap-2 font-semibold">
            <Sparkles size={12} className="text-[#9E7728]" />
            <span>60 ЖОБАНЫҢ ҮЗДІКСІЗ 3D ЛЕНТАСЫ (БАСЫП, АЙНАЛЫМҒА ШЫҒАРЫҢЫЗ)</span>
          </span>
          <span className="text-[11px] text-[#8C8375]">Шерткенде 3D сахнаға шығады</span>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-none">
          {allProjects.map((p, idx) => {
            const isSelected = p.filename === activeProject?.filename;
            return (
              <button
                key={p.index}
                onClick={() => {
                  playTick(1100, 0.02);
                  const matchIdx = filtered.findIndex((item) => item.filename === p.filename);
                  if (matchIdx !== -1) {
                    setCurrentIndex(matchIdx);
                  } else {
                    setActiveCat('all');
                    setCurrentIndex(idx);
                  }
                }}
                className={`relative flex-shrink-0 w-24 sm:w-28 h-32 sm:h-36 rounded-2xl overflow-hidden border-2 transition-all group bg-[#FAF7F2] ${
                  isSelected
                    ? 'border-[#9E7728] scale-105 shadow-[0_4px_15px_rgba(180,140,60,0.3)] z-10'
                    : 'border-[#EAE2D2] opacity-80 hover:opacity-100 hover:border-[#9E7728]'
                }`}
              >
                {/* Ambient background */}
                <img
                  src={getAssetUrl(p.filename)}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover blur-md opacity-35 scale-120"
                />
                {/* Foreground uncropped preview */}
                <img
                  src={getAssetUrl(p.filename)}
                  alt={p.title}
                  className="relative z-10 w-full h-full object-contain p-1"
                />
                <div className="absolute inset-0 z-20 flex items-end justify-center p-1.5 pointer-events-none">
                  <span className="px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-mono text-[#1C1917] font-bold shadow-xs">
                    №{p.num}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}