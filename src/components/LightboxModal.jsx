import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, MessageCircle, Phone, Sparkles, CheckCircle2 } from 'lucide-react';
import { playChime, playTick } from '../utils/sound';
import { useSiteData } from '../context/SiteDataContext';
import FastImage from './common/FastImage';
import { getAssetUrl } from '../utils/assets';

export default function LightboxModal({ project, onClose, onPrev, onNext }) {
  const { data } = useSiteData();
  const { siteSettings, voucher } = data;

  // Lock background scroll when modal is open
  useEffect(() => {
    if (project) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [project]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  // Mobile Touch Swipe Navigation (Left/Right for Next/Prev, Down for Close)
  const touchStartXRef = useRef(null);
  const touchStartYRef = useRef(null);
  const touchEndXRef = useRef(null);
  const touchEndYRef = useRef(null);

  const handleTouchStart = (e) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
    touchStartYRef.current = e.targetTouches[0].clientY;
    touchEndXRef.current = null;
    touchEndYRef.current = null;
  };

  const handleTouchMove = (e) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
    touchEndYRef.current = e.targetTouches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current === null || touchEndXRef.current === null) return;
    const diffX = touchStartXRef.current - touchEndXRef.current;
    const diffY = (touchStartYRef.current || 0) - (touchEndYRef.current || 0);

    // If swipe down is prominent and vertical scroll is at top, close modal
    if (diffY < -80 && Math.abs(diffX) < 50) {
      onClose();
      return;
    }

    // Horizontal swipe
    if (diffX > 45 && onNext) {
      onNext();
      playTick(800, 0.03);
    } else if (diffX < -45 && onPrev) {
      onPrev();
      playTick(800, 0.03);
    }

    touchStartXRef.current = null;
    touchStartYRef.current = null;
    touchEndXRef.current = null;
    touchEndYRef.current = null;
  };

  if (!project) return null;

  const waText = encodeURIComponent(
    `Сәлеметсіз бе! «INTEKS» салонының №${project.num} «${project.title}» перде үлгісі ұнады. Дәл осы үлгіні біздің терезе өлшемдері бойынша есептеп, дизайнермен тегін кеңес ұйымдастыра аласыз ба?`
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 md:p-10 bg-[#1C1A17]/70 backdrop-blur-md touch-pan-y"
        onClick={onClose}
      >
        {/* Navigation Buttons (Desktop) */}
        {onPrev && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
              playTick(800, 0.03);
            }}
            aria-label="Алдыңғы үлгі"
            className="hidden sm:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/15 hover:bg-[#C5A059] text-white hover:text-black items-center justify-center backdrop-blur-md border border-white/30 transition-all hover:scale-110 active:scale-95"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {onNext && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
              playTick(800, 0.03);
            }}
            aria-label="Келесі үлгі"
            className="hidden sm:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/15 hover:bg-[#C5A059] text-white hover:text-black items-center justify-center backdrop-blur-md border border-white/30 transition-all hover:scale-110 active:scale-95"
          >
            <ChevronRight size={24} />
          </button>
        )}

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 15 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          className="relative max-w-5xl w-full max-h-[94vh] overflow-y-auto rounded-3xl bg-white border-2 border-[#C5A059] shadow-[0_30px_90px_rgba(0,0,0,0.45)] flex flex-col md:flex-row overflow-hidden"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close Button */}
          <button
            onClick={() => {
              onClose();
              playTick(600, 0.02);
            }}
            className="absolute top-3.5 right-3.5 z-50 w-10 h-10 rounded-full bg-white/95 hover:bg-[#C5A059] text-[#1C1917] hover:text-white flex items-center justify-center backdrop-blur-md border border-[#DFD3BF] shadow-md transition-all active:scale-90"
          >
            <X size={20} />
          </button>

          {/* Image Container with Ambient Backdrop */}
          <div className="md:w-3/5 bg-[#FAF7F2] flex items-center justify-center relative group min-h-[320px] sm:min-h-[420px] md:min-h-[600px] overflow-hidden p-3 sm:p-6">
            <div className="md:hidden absolute inset-0 bg-gradient-to-b from-[#F5ECDC]/60 via-transparent to-[#F2E8D7]/40 pointer-events-none" />
            <img
              src={getAssetUrl(project.filename)}
              alt=""
              aria-hidden="true"
              className="hidden md:block absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-125 pointer-events-none"
            />

            {/* FastImage for Instant Display */}
            <FastImage
              src={project.filename}
              alt={project.title}
              priority={true}
              className="relative z-10 w-auto h-full max-h-[56vh] sm:max-h-[70vh] md:max-h-[80vh] max-w-full rounded-xl"
              imgClassName="drop-shadow-2xl"
            />

            <div className="absolute top-4 left-4 flex gap-2 z-20">
              <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#C5A059]/50 text-[#7A5714] text-xs font-semibold shadow-xs">
                {project.badge}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#DFD3BF] text-[#5C554B] text-xs font-mono font-semibold">
                №{project.num}
              </span>
            </div>

            {/* Mobile Swipe Hint */}
            <div className="sm:hidden absolute bottom-2 inset-x-0 flex justify-center z-20 pointer-events-none">
              <span className="px-3 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] text-[#7A5714] font-medium border border-[#EAE2D2] shadow-xs">
                ‹ Оңға/солға сырғытыңыз ›
              </span>
            </div>
          </div>

          {/* Mobile Dedicated Next / Prev Thumb Bar */}
          <div className="flex sm:hidden items-center justify-between px-4 py-2 bg-[#F9F5EE] border-t border-b border-[#EAE2D2]">
            <button
              onClick={() => {
                if (onPrev) {
                  onPrev();
                  playTick(800, 0.03);
                }
              }}
              className="px-3 py-1.5 rounded-xl bg-white border border-[#DFD3BF] text-xs font-semibold text-[#2C2723] flex items-center gap-1 active:bg-[#F2EBE0]"
            >
              <ChevronLeft size={16} />
              <span>Алдыңғы</span>
            </button>
            <span className="text-xs font-mono font-bold text-[#7A5714]">
              №{project.num}
            </span>
            <button
              onClick={() => {
                if (onNext) {
                  onNext();
                  playTick(800, 0.03);
                }
              }}
              className="px-3 py-1.5 rounded-xl bg-white border border-[#DFD3BF] text-xs font-semibold text-[#2C2723] flex items-center gap-1 active:bg-[#F2EBE0]"
            >
              <span>Келесі</span>
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Details & Action Panel */}
          <div className="md:w-2/5 p-5 sm:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-[#EAE2D2] bg-gradient-to-b from-[#FCFAF6] to-[#F5EFE3]">
            <div>
              <div className="flex items-center gap-2 text-[#9E7728] text-xs font-semibold tracking-wider uppercase mb-2 font-mono">
                <Sparkles size={14} />
                <span>INTEKS PREMIER COLLECTION</span>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl text-[#1C1917] font-semibold mb-3">
                {project.title}
              </h3>

              <p className="text-sm text-[#5C554B] leading-relaxed mb-6">
                {project.desc}
              </p>

              <div className="space-y-3 mb-6 bg-white/85 p-4 rounded-xl border border-[#EAE2D2] shadow-xs">
                <div className="flex items-center gap-2.5 text-xs text-[#2C2723]">
                  <CheckCircle2 size={15} className="text-[#0E8A42]" />
                  <span>Түркия және Италияның премиум текстилі</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#2C2723]">
                  <CheckCircle2 size={15} className="text-[#0E8A42]" />
                  <span>Лазерлік өлшеу және тегін выезд (Шымкент)</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#2C2723]">
                  <CheckCircle2 size={15} className="text-[#0E8A42]" />
                  <span>Somfy / Tuya электр карнизімен үйлесімді</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#2C2723]">
                  <CheckCircle2 size={15} className="text-[#0E8A42]" />
                  <span>{voucher.discountAmount} сертификат бірге есептеледі</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#EAE2D2]">
              <a
                href={`https://wa.me/${siteSettings.whatsappNumber}?text=${waText}`}
                target="_blank"
                rel="noreferrer"
                onClick={() => playChime(950, 0.1)}
                className="w-full py-3.5 px-5 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20ba59] hover:to-[#0f7a6e] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(37,211,102,0.3)] hover:scale-[1.02] transition-transform"
              >
                <MessageCircle size={18} />
                <span>WhatsApp-пен бағасын білу</span>
              </a>

              <a
                href={`tel:+${siteSettings.whatsappNumber}`}
                onClick={() => playTick(700, 0.02)}
                className="w-full py-3 px-5 rounded-full bg-white hover:bg-[#FAF5EC] border border-[#DFD3BF] hover:border-[#9E7728] text-[#2C2723] font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <Phone size={14} className="text-[#9E7728]" />
                <span>{siteSettings.phone} қоңырау шалу</span>
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}