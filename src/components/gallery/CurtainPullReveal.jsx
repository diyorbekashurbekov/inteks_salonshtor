import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, MessageCircle, Maximize2, Crown } from 'lucide-react';
import { playTick, playChime } from '../../utils/sound';

export default function CurtainPullReveal({ allProjects, onSelectProject }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const activeProject = allProjects[currentIndex] || allProjects[0];

  const handleOpenCurtains = () => {
    if (!isOpen) {
      playChime(1100, 0.15);
      setIsOpen(true);
    } else {
      // Pick another random project and re-open
      playTick(750, 0.03);
      setIsOpen(false);
      setTimeout(() => {
        const nextIdx = (currentIndex + 1) % allProjects.length;
        setCurrentIndex(nextIdx);
        playChime(1150, 0.15);
        setIsOpen(true);
      }, 400);
    }
  };

  const handleNextReveal = () => {
    playTick(750, 0.03);
    setIsOpen(false);
    setTimeout(() => {
      const nextIdx = (currentIndex + 1) % allProjects.length;
      setCurrentIndex(nextIdx);
      playChime(1150, 0.15);
      setIsOpen(true);
    }, 450);
  };

  const waText = encodeURIComponent(
    `Сәлеметсіз бе! «INTEKS» перде ашу интерактивінен №${activeProject.num} «${activeProject.title}» дизайны шықты. Осыны үйіме тіктіру бағасы қанша болады?`
  );

  return (
    <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden bg-[#0C0B10] border border-[#C5A059]/40 shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_50px_rgba(197,160,89,0.25)] p-4 sm:p-8">
      
      {/* Header Info */}
      <div className="text-center max-w-xl mx-auto mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#EBD399] text-xs font-semibold uppercase tracking-wider mb-2">
          <Crown size={13} className="text-[#C5A059]" />
          <span>ИНТЕРАКТИВТІ ПЕРДЕНІ АШУ</span>
        </div>
        <p className="text-xs sm:text-sm text-[#ABA69D]">
          Төмендегі алтын түймені басып, сарайлық барқыт перделерді серпіп ашыңыз. Артында 60 авторлық шедеврдің бірі ашылады:
        </p>
      </div>

      {/* The Theatrical Stage */}
      <div className="relative h-[440px] sm:h-[540px] rounded-2xl overflow-hidden bg-black border border-white/10 flex items-center justify-center">
        
        {/* Hidden Masterpiece inside the stage */}
        <div className="absolute inset-0 z-0 flex items-center justify-center bg-[#070609] overflow-hidden p-2 sm:p-4">
          {/* Ambient blurred backdrop so sides are not black but matching fabric colors */}
          <img
            src={`/assets/img/${activeProject.filename}`}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-125 pointer-events-none"
          />
          {/* Full uncropped image from ceiling to floor */}
          <img
            src={`/assets/img/${activeProject.filename}`}
            alt={activeProject.title}
            className="relative z-10 w-auto h-full max-h-[520px] max-w-full object-contain rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.9)]"
          />
          <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none" />

          {/* Masterpiece Details Overlay when open */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="absolute bottom-6 inset-x-6 sm:inset-x-8 z-30 flex flex-col sm:flex-row sm:items-end justify-between gap-4 p-5 rounded-2xl bg-black/80 backdrop-blur-xl border border-[#C5A059]/40 shadow-2xl"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded bg-[#C5A059] text-black text-[10px] font-bold uppercase tracking-wider">
                      {activeProject.badge}
                    </span>
                    <span className="text-xs font-mono text-white/70">
                      Жоба №{activeProject.num} / 60
                    </span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-white font-normal">
                    {activeProject.title}
                  </h3>
                  <p className="text-xs text-[#ABA69D] max-w-md line-clamp-1 mt-0.5">
                    {activeProject.desc}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onSelectProject(activeProject);
                      playChime(900, 0.1);
                    }}
                    className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                    title="Үлкейтіп көру"
                  >
                    <Maximize2 size={16} />
                  </button>

                  <a
                    href={`https://wa.me/77011291570?text=${waText}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => playChime(950, 0.1)}
                    className="py-2.5 px-4 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg hover:scale-105 transition-transform"
                  >
                    <MessageCircle size={15} />
                    <span>WhatsApp тапсырыс</span>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Left Velvet Curtain */}
        <motion.div
          animate={{ x: isOpen ? '-92%' : '0%' }}
          transition={{ type: 'spring', damping: 20, stiffness: 90 }}
          className="absolute inset-y-0 left-0 w-1/2 z-20 bg-gradient-to-r from-[#170E12] via-[#2A1520] to-[#150D12] shadow-[10px_0_30px_rgba(0,0,0,0.8)] border-r-2 border-[#C5A059]/40 flex items-center justify-end overflow-hidden"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, rgba(197,160,89,0.06) 0px, rgba(197,160,89,0.06) 30px, rgba(0,0,0,0.4) 30px, rgba(0,0,0,0.4) 60px)`,
          }}
        >
          {/* Silk Fold Highlights */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] via-transparent to-black/70 pointer-events-none" />
          
          {/* Golden fringe border */}
          <div className="absolute right-0 inset-y-0 w-2.5 bg-gradient-to-b from-[#EBD399] via-[#C5A059] to-[#8C6D2B] shadow-sm" />
        </motion.div>

        {/* Right Velvet Curtain */}
        <motion.div
          animate={{ x: isOpen ? '92%' : '0%' }}
          transition={{ type: 'spring', damping: 20, stiffness: 90 }}
          className="absolute inset-y-0 right-0 w-1/2 z-20 bg-gradient-to-l from-[#170E12] via-[#2A1520] to-[#150D12] shadow-[-10px_0_30px_rgba(0,0,0,0.8)] border-l-2 border-[#C5A059]/40 flex items-center justify-start overflow-hidden"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, rgba(0,0,0,0.4) 0px, rgba(0,0,0,0.4) 30px, rgba(197,160,89,0.06) 30px, rgba(197,160,89,0.06) 60px)`,
          }}
        >
          {/* Silk Fold Highlights */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] via-transparent to-black/70 pointer-events-none" />
          
          {/* Golden fringe border */}
          <div className="absolute left-0 inset-y-0 w-2.5 bg-gradient-to-b from-[#EBD399] via-[#C5A059] to-[#8C6D2B] shadow-sm" />
        </motion.div>

        {/* Central Golden Seal / Pull Trigger when closed */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="absolute z-30 flex flex-col items-center gap-3 cursor-pointer"
              onClick={handleOpenCurtains}
            >
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#F5E2B5] via-[#C5A059] to-[#8C6D2B] p-1 shadow-[0_0_40px_rgba(197,160,89,0.6)] flex items-center justify-center"
              >
                <div className="w-full h-full rounded-full bg-[#120F15] border border-[#F5E2B5]/50 flex flex-col items-center justify-center text-center p-2">
                  <Sparkles size={20} className="text-[#EBD399] animate-pulse mb-1" />
                  <span className="text-[10px] sm:text-[11px] font-bold text-white uppercase tracking-wider leading-tight">
                    Пердені<br />Ашу
                  </span>
                </div>
              </motion.button>
              <span className="text-xs text-[#EBD399] font-medium tracking-wide bg-black/80 px-3 py-1 rounded-full border border-white/10 shadow-lg">
                Басып, шедеврді көріңіз ✨
              </span>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Action Footer bar */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-[#736E66] font-mono">
          <span>Көрсетілім: {currentIndex + 1} / {allProjects.length}</span>
        </div>

        {isOpen && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleNextReveal}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#C5A059] to-[#EBD399] text-black font-bold text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(197,160,89,0.4)] hover:scale-105 active:scale-95 transition-all"
            >
              <RefreshCw size={14} />
              <span>Келесі перде үлгісін ашу 🪄</span>
            </button>

            <button
              onClick={() => {
                playTick(600, 0.02);
                setIsOpen(false);
              }}
              className="px-4 py-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs text-[#ABA69D] hover:text-white transition-colors"
            >
              Пердені қайта жабу
            </button>
          </div>
        )}
      </div>

    </div>
  );
}