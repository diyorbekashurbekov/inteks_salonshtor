import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Maximize2, MessageCircle, Dices, Layers, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';
import { playTick, playChime } from '../../utils/sound';
import { useSiteData } from '../../context/SiteDataContext';
import { preloadBatch } from '../../utils/imageOptimizer';
import FastImage from '../common/FastImage';

const ROOMS = [
  { id: 'living', name: 'Хан Сарайы Зал', icon: '👑', subtitle: 'Барокко, де-жабо, салтанат' },
  { id: 'bedroom', name: 'Мастер-Спальня', icon: '🌙', subtitle: '100% блэкаут, жібек, романтика' },
  { id: 'kitchen', name: 'Корольдік Асхана', icon: '🥂', subtitle: 'Сапфир барқыт, француз тюль' },
  { id: 'erker', name: 'Эркер & Панорама', icon: '🏙️', subtitle: '360° терезе, ақылды электр карниз' },
  { id: 'atelier', name: 'Зергерлік Ателье', icon: '🪡', subtitle: 'Жемчуг бахрома, қол кестесі' },
];

export default function RoomProjector({ allProjects, onSelectProject }) {
  const { data } = useSiteData();
  const { siteSettings } = data;
  const [activeRoom, setActiveRoom] = useState('living');

  // Filter projects for selected room
  const roomProjects = useMemo(() => {
    return allProjects.filter((p) => p.category === activeRoom);
  }, [allProjects, activeRoom]);

  // Currently projected project on the main stage
  const [projected, setProjected] = useState(roomProjects[0] || allProjects[0]);

  // Preload all images in this room for instant zero-delay switching
  useEffect(() => {
    if (roomProjects.length > 0) {
      const urls = roomProjects.map((p) => 
        p.filename?.startsWith('http') ? p.filename : `/assets/img/${p.filename}`
      );
      preloadBatch(urls);
    }
  }, [roomProjects]);

  // Touch swipe support for mobile
  const touchStartRef = useRef(null);
  const touchEndRef = useRef(null);

  const handleTouchStart = (e) => {
    touchStartRef.current = e.targetTouches[0].clientX;
    touchEndRef.current = null;
  };

  const handleTouchMove = (e) => {
    touchEndRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartRef.current === null || touchEndRef.current === null) return;
    const distance = touchStartRef.current - touchEndRef.current;
    const isSwipeLeft = distance > 45;
    const isSwipeRight = distance < -45;

    if (isSwipeLeft || isSwipeRight) {
      const currentIndex = roomProjects.findIndex((p) => p.filename === projected.filename);
      if (currentIndex !== -1) {
        if (isSwipeLeft) {
          const nextIndex = (currentIndex + 1) % roomProjects.length;
          playTick(900, 0.02);
          setProjected(roomProjects[nextIndex]);
        } else if (isSwipeRight) {
          const prevIndex = (currentIndex - 1 + roomProjects.length) % roomProjects.length;
          playTick(900, 0.02);
          setProjected(roomProjects[prevIndex]);
        }
      }
    }
    touchStartRef.current = null;
    touchEndRef.current = null;
  };

  // When room changes, pick the first project of that room
  const handleRoomChange = (roomId) => {
    playTick(950, 0.03);
    setActiveRoom(roomId);
    const first = allProjects.find((p) => p.category === roomId);
    if (first) setProjected(first);
  };

  // Next / Prev within current room
  const handleNextProject = (e) => {
    e?.stopPropagation();
    const currentIndex = roomProjects.findIndex((p) => p.filename === projected.filename);
    const nextIndex = (currentIndex + 1) % roomProjects.length;
    playTick(900, 0.02);
    setProjected(roomProjects[nextIndex]);
  };

  const handlePrevProject = (e) => {
    e?.stopPropagation();
    const currentIndex = roomProjects.findIndex((p) => p.filename === projected.filename);
    const prevIndex = (currentIndex - 1 + roomProjects.length) % roomProjects.length;
    playTick(900, 0.02);
    setProjected(roomProjects[prevIndex]);
  };

  // Random reveal (Slot machine effect)
  const handleRandomReveal = () => {
    playChime(1200, 0.15);
    const randomIndex = Math.floor(Math.random() * allProjects.length);
    const randomProj = allProjects[randomIndex];
    setProjected(randomProj);
    setActiveRoom(randomProj.category);
  };

  const currentWaText = encodeURIComponent(
    `Сәлеметсіз бе! «INTEKS» интерактивті проекторынан №${projected?.num} «${projected?.title}» пердесін көрдім. Біздің бөлмеге осы дизайнды қалай үйлестіруге болады?`
  );

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Interactive Control Console (Touch-scrollable on mobile) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-2.5 sm:p-4 rounded-2xl bg-white/90 border border-[#EAE2D2] shadow-sm backdrop-blur-xl">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0 touch-pan-x">
          {ROOMS.map((room) => {
            const isActive = activeRoom === room.id;
            return (
              <button
                key={room.id}
                onClick={() => handleRoomChange(room.id)}
                className={`relative flex-shrink-0 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 sm:gap-2 ${
                  isActive
                    ? 'text-white shadow-md'
                    : 'text-[#5C554B] hover:text-[#9E7728] bg-[#FAF6EE] hover:bg-[#F2EBE0] border border-[#E5DAC6]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeRoomBg"
                    className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#987838] rounded-xl"
                    transition={{ type: 'spring', damping: 22, stiffness: 280 }}
                  />
                )}
                <span className="relative z-10 text-base">{room.icon}</span>
                <span className="relative z-10 whitespace-nowrap">{room.name}</span>
              </button>
            );
          })}
        </div>

        {/* Surprise Masterpiece Reveal Button */}
        <button
          onClick={handleRandomReveal}
          className="flex-shrink-0 px-4 py-2 sm:py-2.5 rounded-xl bg-[#FAF5EB] hover:bg-[#C5A059] border border-[#C5A059] text-[#7A5714] hover:text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-sm"
        >
          <Dices size={16} className="animate-spin" style={{ animationDuration: '6s' }} />
          <span className="whitespace-nowrap">🎲 Кездейсоқ шедевр</span>
        </button>
      </div>

      {/* Grand Architectural Projection Stage */}
      {projected && (
        <div className="relative rounded-3xl overflow-hidden bg-white border border-[#C5A059]/40 shadow-[0_25px_70px_rgba(180,150,110,0.18)]">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px] lg:min-h-[560px]">
            {/* Left: Main Stage Cinema Screen with Touch Swipe */}
            <div 
              className="lg:col-span-8 relative min-h-[360px] sm:min-h-[440px] lg:min-h-[580px] bg-[#FAF7F2] overflow-hidden flex items-center justify-center group cursor-pointer touch-pan-y select-none"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onClick={() => {
                onSelectProject(projected);
                playChime(900, 0.1);
              }}
            >
              {/* Left/Right arrow overlay controls for easy tapping */}
              {roomProjects.length > 1 && (
                <>
                  <button
                    onClick={handlePrevProject}
                    aria-label="Алдыңғы үлгі"
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#2C2723] flex items-center justify-center shadow-lg border border-[#EAE2D2] transition-all hover:scale-110 active:scale-90"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={handleNextProject}
                    aria-label="Келесі үлгі"
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#2C2723] flex items-center justify-center shadow-lg border border-[#EAE2D2] transition-all hover:scale-110 active:scale-90"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              <AnimatePresence mode="wait">
                <motion.div
                  key={projected.filename}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="relative w-full h-full min-h-[360px] sm:min-h-[440px] lg:min-h-[580px] flex items-center justify-center overflow-hidden p-3 sm:p-6"
                >
                  {/* Ambient Backdrop - Static on mobile for 100% 60fps, Blurred on desktop */}
                  <div className="md:hidden absolute inset-0 bg-gradient-to-b from-[#F5ECDC]/60 via-transparent to-[#F2E8D7]/40 pointer-events-none" />
                  <img
                    src={projected.filename?.startsWith('http') ? projected.filename : `/assets/img/${projected.filename}`}
                    alt=""
                    aria-hidden="true"
                    className="hidden md:block absolute inset-0 w-full h-full object-cover blur-2xl opacity-35 scale-125 pointer-events-none"
                  />

                  {/* 100% Full Uncropped FastImage with instant shimmer decoding */}
                  <FastImage
                    src={projected.filename?.startsWith('http') ? projected.filename : `/assets/img/${projected.filename}`}
                    alt={projected.title}
                    priority={true}
                    className="relative z-10 max-h-[380px] sm:max-h-[520px] w-auto max-w-full rounded-xl shadow-[0_15px_40px_rgba(180,150,110,0.25)] group-hover:scale-[1.01] transition-transform duration-300"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Ambient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-white/20 pointer-events-none" />

              {/* Mobile Swipe Hint Badge */}
              <div className="sm:hidden absolute bottom-3 inset-x-0 flex justify-center z-20 pointer-events-none">
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] text-[#7A5714] font-medium border border-[#EAE2D2] shadow-sm flex items-center gap-1.5">
                  <span>‹</span>
                  <span>Саусақпен оңға/солға сырғытыңыз (Swipe)</span>
                  <span>›</span>
                </span>
              </div>

              {/* Floating Room Tag */}
              <div className="absolute top-5 left-5 z-20 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#C5A059]/50 text-[#8B6520] text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 font-semibold shadow-sm">
                  <Sparkles size={12} className="text-[#9E7728]" />
                  {projected.badge}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#EAE2D2] text-[#5C554B] text-xs font-mono font-semibold">
                  №{projected.num}
                </span>
              </div>

              {/* Live Interactive Hotspot Dots on the Image */}
              <div className="absolute bottom-6 left-6 z-20 hidden sm:flex items-center gap-3">
                <div className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#EAE2D2] text-xs text-[#2C2723] font-medium flex items-center gap-2 shadow-md">
                  <span className="h-2 w-2 rounded-full bg-[#9E7728] animate-ping" />
                  <span>Түркия & Италия эксклюзив матасы</span>
                </div>
                <div className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#EAE2D2] text-xs text-[#2C2723] font-medium flex items-center gap-2 shadow-md">
                  <CheckCircle2 size={13} className="text-[#0E8A42]" />
                  <span>Ақылды карнизге 100% дайын</span>
                </div>
              </div>
            </div>

            {/* Right: Architectural Dossier & Quick Selector */}
            <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#EAE2D2] bg-gradient-to-b from-[#FCFAF6] via-[#F9F5EC] to-[#F2EDE2]">
              <div>
                <div className="flex items-center gap-2 text-[#9E7728] text-[11px] font-semibold tracking-[0.25em] uppercase mb-2 font-mono">
                  <Layers size={14} />
                  <span>АРХИТЕКТУРАЛЫҚ ПРОЕКТОР</span>
                </div>

                <h3 className="font-editorial text-2xl sm:text-3xl text-[#1C1917] font-normal mb-3 leading-snug">
                  {projected.title}
                </h3>

                <p className="text-sm text-[#5C554B] leading-relaxed mb-6">
                  {projected.desc}
                </p>

                {/* Dossier Specs */}
                <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-xl bg-white/80 border border-[#EAE2D2] shadow-sm">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-[#827B70] block">Мата құрамы:</span>
                    <span className="text-xs font-semibold text-[#1C1917]">Жібек & Жаккард</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-[#827B70] block">Бүктеме түрі:</span>
                    <span className="text-xs font-semibold text-[#1C1917]">Француз бүрмесі (2.5x)</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-[#827B70] block">Дайындау мерзімі:</span>
                    <span className="text-xs font-semibold text-[#7A5714]">3 — 7 күнде дайын</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-[#827B70] block">Сертификат:</span>
                    <span className="text-xs font-semibold text-[#9E7728]">15 000 ₸ шегерім</span>
                  </div>
                </div>

                {/* Filmstrip selector of other projects in this category */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] uppercase tracking-wider text-[#686257] font-mono font-semibold">
                      Осы бөлменің басқа үлгілері ({roomProjects.length}):
                    </span>
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {roomProjects.map((p) => {
                      const isSelected = p.filename === projected.filename;
                      return (
                        <button
                          key={p.index}
                          onClick={() => {
                            playTick(1100, 0.02);
                            setProjected(p);
                          }}
                          className={`relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                            isSelected
                              ? 'border-[#9E7728] scale-105 shadow-md'
                              : 'border-[#EAE2D2] opacity-75 hover:opacity-100 hover:border-[#9E7728]'
                          }`}
                        >
                          <FastImage
                            src={p.filename?.startsWith('http') ? p.filename : `/assets/img/${p.filename}`}
                            alt={p.title}
                            className="w-full h-full"
                            imgClassName="object-cover"
                          />
                          <span className="absolute bottom-0 inset-x-0 bg-white/90 text-[9px] text-[#1C1917] font-mono text-center font-bold">
                            №{p.num}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-[#EAE2D2] space-y-2.5">
                <a
                  href={`https://wa.me/${siteSettings.whatsappNumber}?text=${currentWaText}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playChime(950, 0.1)}
                  className="w-full py-3.5 px-5 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(37,211,102,0.3)] hover:scale-[1.02] transition-transform"
                >
                  <MessageCircle size={16} />
                  <span>Осы үлгі бойынша баға есептету (WhatsApp)</span>
                  <ChevronRight size={14} />
                </a>

                <button
                  onClick={() => {
                    onSelectProject(projected);
                    playChime(850, 0.08);
                  }}
                  className="w-full py-2.5 px-4 rounded-full bg-white hover:bg-[#FAF5EC] border border-[#DFD3BF] text-xs text-[#5C554B] hover:text-[#1C1917] font-medium transition-colors shadow-xs"
                >
                  Шедеврді толық қарап шығу (Lightbox)
                </button>
              </div>

            </div>
          </div>

        </div>
      )}
    </div>
  );
}