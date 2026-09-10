import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Volume2, VolumeX, ArrowUp, LayoutGrid, Cpu, Calculator as CalcIcon, Gift } from 'lucide-react';
import { isSoundMuted, toggleSound, playTick, playChime } from '../utils/sound';
import { useSiteData } from '../context/SiteDataContext';

export default function FloatingDock() {
  const { data } = useSiteData();
  const { siteSettings, voucher } = data;
  const [muted, setMuted] = useState(isSoundMuted());
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const nextState = toggleSound();
    setMuted(nextState);
    if (!nextState) {
      playChime(1100, 0.08);
    }
  };

  const scrollToSection = (id) => {
    playTick(750, 0.02);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    playTick(900, 0.03);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside 
      aria-label="Жылдам шарлау панелі" 
      className="fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[calc(100vw-16px)] sm:max-w-none"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, type: 'spring', damping: 20 }}
        className="flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/95 backdrop-blur-2xl border border-[#DFD3BF] shadow-[0_15px_45px_rgba(140,110,70,0.2),0_0_20px_rgba(197,160,89,0.15)]"
      >
        {/* Catalog Button */}
        <button
          onClick={() => scrollToSection('catalog')}
          className="p-2.5 rounded-full hover:bg-[#FAF5EC] text-[#5C554B] hover:text-[#9E7728] transition-all hover:scale-110 active:scale-95 relative group"
          title="Каталог (60 жоба)"
        >
          <LayoutGrid size={18} />
          <span className="sr-only">Каталог</span>
          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#1C1917] text-white text-[10px] px-2 py-0.5 rounded whitespace-nowrap shadow-md">
            Каталог
          </span>
        </button>

        {/* Smart Cornice */}
        <button
          onClick={() => scrollToSection('smart-cornice')}
          className="p-2.5 rounded-full hover:bg-[#FAF5EC] text-[#5C554B] hover:text-[#9E7728] transition-all hover:scale-110 active:scale-95 relative group"
          title="Ақылды карниз"
        >
          <Cpu size={18} />
          <span className="sr-only">Ақылды карниз</span>
          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#1C1917] text-white text-[10px] px-2 py-0.5 rounded whitespace-nowrap shadow-md">
            Электр карниз
          </span>
        </button>

        {/* Calculator */}
        <button
          onClick={() => scrollToSection('calculator')}
          className="p-2.5 rounded-full hover:bg-[#FAF5EC] text-[#5C554B] hover:text-[#9E7728] transition-all hover:scale-110 active:scale-95 relative group"
          title="Калькулятор"
        >
          <CalcIcon size={18} />
          <span className="sr-only">Калькулятор</span>
          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#1C1917] text-white text-[10px] px-2 py-0.5 rounded whitespace-nowrap shadow-md">
            Калькулятор
          </span>
        </button>

        {/* VIP Certificate */}
        <button
          onClick={() => scrollToSection('voucher')}
          className="p-2.5 rounded-full hover:bg-[#FAF5EC] text-[#7A5714] transition-all hover:scale-110 active:scale-95 relative group"
          title={`${voucher.discountAmount} Сертификат`}
        >
          <Gift size={18} className="text-[#9E7728] animate-pulse" />
          <span className="sr-only">Сертификат</span>
          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#FAF2DE] text-[#7A5714] text-[10px] px-2 py-0.5 rounded whitespace-nowrap border border-[#C5A059] font-bold shadow-md">
            {voucher.discountAmount} Бонус
          </span>
        </button>

        <div className="hidden sm:block w-px h-5 bg-[#E5DAC6] mx-0.5" />

        {/* Sound FX Toggle (Desktop & Tablet) */}
        <button
          onClick={handleToggleSound}
          className="hidden sm:flex p-2 sm:p-2.5 rounded-full hover:bg-[#FAF5EC] text-[#5C554B] hover:text-[#9E7728] transition-all hover:scale-110 active:scale-95 relative group"
          title={muted ? 'Дыбысты қосу' : 'Дыбысты өшіру'}
        >
          {muted ? <VolumeX size={17} /> : <Volume2 size={17} className="text-[#9E7728]" />}
          <span className="sr-only">{muted ? 'Дыбысты қосу' : 'Дыбысты өшіру'}</span>
          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#1C1917] text-white text-[10px] px-2 py-0.5 rounded whitespace-nowrap shadow-md">
            {muted ? 'Дыбыс: Өшірулі' : 'Дыбыс: Қосулы'}
          </span>
        </button>

        {/* WhatsApp Online Concierge Button */}
        <a
          href={`https://wa.me/${siteSettings.whatsappNumber}?text=%D0%A1%D3%99%D0%BB%D0%B5%D0%BC%D0%B5%D1%82%D1%81%D1%96%D0%B7%20%D0%B1%D0%B5!%20INTEKS%20%D1%81%D0%B0%D0%BB%D0%BE%D0%BD%D1%8B%D0%BD%D1%8B%D2%A3%20%D0%B6%D0%B5%D0%BA%D0%B5%20%D0%BA%D0%BE%D0%BD%D1%81%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%86%D0%B8%D1%8F%D1%81%D1%8B%D0%BD%D0%B0%20%D0%B6%D0%B0%D0%B7%D1%8B%D0%BB%D2%93%D1%8B%D0%BC%20%D0%BA%D0%B5%D0%BB%D0%B5%D0%B4%D1%96.`}
          target="_blank"
          rel="noreferrer"
          onClick={() => playChime(950, 0.1)}
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white text-xs font-semibold shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:scale-105 active:scale-95 transition-all"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <MessageCircle size={15} />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>

        {/* Scroll Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={scrollToTop}
              className="p-2.5 rounded-full bg-[#FAF5EC] hover:bg-[#9E7728] text-[#5C554B] hover:text-white border border-[#E0D5C3] transition-all hover:scale-110 active:scale-95"
              title="Жоғарыға шығу"
            >
              <ArrowUp size={16} />
              <span className="sr-only">Жоғарыға шығу</span>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </aside>
  );
}