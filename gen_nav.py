code = """import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { toggleSound, isSoundEnabled, playTick } from '../utils/sound';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSoundOn(newState);
  };

  return (
    <>
      {/* Top micro bar */}
      <div className="bg-[#050507] border-b border-white/[0.06] text-[11px] uppercase tracking-[0.2em] text-[#736E66] py-2 px-6">
        <div className="max-w-[1400px] mx-auto flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center gap-3">
            <span>ШЫМКЕНТ • ТҮРКІСТАН • ҚЫЗЫЛОРДА</span>
            <span className="opacity-30">/</span>
            <span>АВТОРЛЫҚ ПЕРДЕ АТЕЛЬЕСІ</span>
            <span className="opacity-30">/</span>
            <a 
              href="https://maps.google.com/?q=42.362045,69.605225" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-[#EBD399] transition-colors"
            >
              📍 ШОУРУМ: АРҒЫНБЕКОВ, 23/22
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="https://www.instagram.com/inteks_salonshtor" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-white transition-colors"
            >
              Instagram @inteks_salonshtor <span className="text-[#C5A059]">(49K)</span>
            </a>
            <span className="opacity-30">|</span>
            <a 
              href="https://wa.me/77011291570" 
              target="_blank" 
              rel="noreferrer" 
              className="text-[#38ef7d] hover:underline"
            >
              WhatsApp +7 (701) 129-15-70
            </a>
          </div>
        </div>
      </div>

      {/* Floating Island Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'py-3 bg-[#0A090C]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl' : 'py-5 bg-transparent'}`}>
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between gap-6">
          
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group" onClick={() => playTick()}>
            <img 
              src="/assets/img/inteks-crest-icon.png" 
              alt="INTEKS" 
              className="h-8 w-auto filter drop-shadow-[0_0_10px_rgba(197,160,89,0.4)] group-hover:scale-105 transition-transform" 
            />
            <div>
              <span className="font-serif text-2xl font-semibold tracking-[0.22em] text-white block leading-none">INTEKS</span>
              <span className="text-[9px] tracking-[0.34em] text-[#C5A059] block mt-0.5">HAUTE COUTURE ATELIER</span>
            </div>
          </a>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium text-[#B0AAA0] tracking-wide">
            <a href="#catalog" className="hover:text-[#EBD399] transition-colors" onClick={() => playTick()}>Коллекциялар <span className="text-[#C5A059] font-mono text-[11px]">(60)</span></a>
            <a href="#simulator" className="hover:text-[#EBD399] transition-colors" onClick={() => playTick()}>Электрокарниз</a>
            <a href="#fabrics" className="hover:text-[#EBD399] transition-colors" onClick={() => playTick()}>Маталар</a>
            <a href="#calculator" className="hover:text-[#EBD399] transition-colors" onClick={() => playTick()}>Калькулятор</a>
            <a href="#process" className="hover:text-[#EBD399] transition-colors" onClick={() => playTick()}>Шеберлік</a>
            <a href="#voucher" className="hover:text-[#EBD399] transition-colors" onClick={() => playTick()}>15 000 ₸ Сертификат</a>
            <a href="#contacts" className="hover:text-[#EBD399] transition-colors" onClick={() => playTick()}>Шоурум</a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            {/* Sound FX Button */}
            <button 
              onClick={handleSoundToggle}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] hover:border-[#C5A059]/60 text-xs text-[#8A857D] hover:text-[#EBD399] transition-all"
              title={soundOn ? 'Дыбысты өшіру' : 'Дыбысты қосу'}
            >
              {soundOn ? <Volume2 size={13} className="text-[#C5A059]" /> : <VolumeX size={13} className="opacity-50" />}
              <span className="text-[10px] font-mono tracking-wider">{soundOn ? 'AUDIO ON' : 'AUDIO OFF'}</span>
            </button>

            {/* VIP WhatsApp CTA */}
            <a 
              href="https://wa.me/77011291570?text=Сәлеметсіз%20бе!%20Тегін%20замерге%20жазылғым%20келеді."
              target="_blank"
              rel="noreferrer"
              onClick={() => playTick()}
              className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#987838] via-[#EBD399] to-[#C5A059] rounded-full animate-pulse opacity-75 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0E0D10] text-[#FAF8F5] text-xs font-semibold tracking-wider uppercase transition-all group-hover:bg-[#15131A]">
                <span className="w-2 h-2 rounded-full bg-[#38ef7d] animate-ping" />
                <span>Тегін замер</span>
                <ArrowUpRight size={14} className="text-[#C5A059] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </a>

            {/* Mobile menu trigger */}
            <button 
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg bg-white/[0.05] border border-white/[0.08] text-white"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-0 right-0 w-[300px] h-full bg-[#0C0B0F] border-l border-[#C5A059]/30 p-6 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex justify-between items-center pb-6 border-b border-white/[0.08]">
                <span className="font-serif text-2xl text-[#C5A059]">INTEKS</span>
                <button onClick={() => setMobileOpen(false)} className="text-white/60 hover:text-white"><X size={22} /></button>
              </div>
              <nav className="flex flex-col gap-4 mt-6 text-sm font-medium">
                <a href="#catalog" onClick={() => setMobileOpen(false)} className="text-white/80 hover:text-[#EBD399]">01. Коллекциялар (60 жоба)</a>
                <a href="#simulator" onClick={() => setMobileOpen(false)} className="text-white/80 hover:text-[#EBD399]">02. Электрокарниз Симуляторы</a>
                <a href="#fabrics" onClick={() => setMobileOpen(false)} className="text-white/80 hover:text-[#EBD399]">03. Премиум Маталар</a>
                <a href="#calculator" onClick={() => setMobileOpen(false)} className="text-white/80 hover:text-[#EBD399]">04. Баға Калькуляторы</a>
                <a href="#process" onClick={() => setMobileOpen(false)} className="text-white/80 hover:text-[#EBD399]">05. Тапсырыс Кезеңдері</a>
                <a href="#voucher" onClick={() => setMobileOpen(false)} className="text-white/80 hover:text-[#EBD399]">06. 15 000 ₸ Сертификат</a>
                <a href="#contacts" onClick={() => setMobileOpen(false)} className="text-white/80 hover:text-[#EBD399]">07. Шоурум & Мекенжай</a>
              </nav>
            </div>
            <a 
              href="https://wa.me/77011291570" 
              target="_blank" 
              rel="noreferrer"
              className="w-full text-center py-3 rounded-full bg-gradient-to-r from-[#C5A059] to-[#EBD399] text-black font-bold text-xs uppercase tracking-wider"
            >
              WhatsApp арқылы жазу
            </a>
          </div>
        </div>
      )}
    </>
  );
}
"""
with open(r"C:\Users\User\.gemini\antigravity\scratch\inteks-studio\src\components\Navbar.jsx", "w", encoding="utf-8") as f:
    f.write(code)
print("Created Navbar.jsx")
