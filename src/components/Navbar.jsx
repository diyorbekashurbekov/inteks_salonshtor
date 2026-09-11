import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { toggleSound, playTick } from '../utils/sound';
import { useSiteData } from '../context/SiteDataContext';
import { getAssetUrl } from '../utils/assets';

export default function Navbar() {
  const { data } = useSiteData();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);

  // Triple click on logo to open secret admin
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef(null);

  const handleLogoClick = (e) => {
    clickCountRef.current += 1;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);

    if (clickCountRef.current >= 3) {
      clickCountRef.current = 0;
      window.dispatchEvent(new CustomEvent('openInteksAdmin'));
    } else {
      clickTimerRef.current = setTimeout(() => {
        clickCountRef.current = 0;
      }, 600);
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSoundOn(newState);
  };

  const { siteSettings, voucher, projects } = data;

  return (
    <>
      {/* Top micro bar (Desktop / Tablet) */}
      <div className="hidden sm:block bg-[#F6F1E8] border-b border-[#EAE2D2] text-[11px] uppercase tracking-[0.2em] text-[#786F62] py-2 px-6">
        <div className="max-w-[1400px] mx-auto flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center gap-3">
            <span>{siteSettings.regions}</span>
            <span className="opacity-40">/</span>
            <span>АВТОРЛЫҚ ПЕРДЕ АТЕЛЬЕСІ</span>
            <span className="opacity-40">/</span>
            <a 
              href={siteSettings.mapsUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-[#9E7728] transition-colors"
            >
              📍 ШОУРУМ: {siteSettings.address}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href={siteSettings.instagramUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-[#9E7728] transition-colors"
            >
              Instagram {siteSettings.instagram} <span className="text-[#9E7728] font-semibold">(49K)</span>
            </a>
            <span className="opacity-40">|</span>
            <a 
              href={`https://wa.me/${siteSettings.whatsappNumber}`} 
              target="_blank" 
              rel="noreferrer" 
              className="text-[#0E8A42] hover:underline font-semibold"
            >
              WhatsApp {siteSettings.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Top micro bar (Mobile compact) */}
      <div className="sm:hidden bg-[#F6F1E8] border-b border-[#EAE2D2] text-[10px] py-1 px-4 flex items-center justify-between text-[#786F62] font-mono">
        <span className="truncate max-w-[200px]">📍 {siteSettings.address}</span>
        <a 
          href={`https://wa.me/${siteSettings.whatsappNumber}`} 
          target="_blank" 
          rel="noreferrer" 
          className="text-[#0E8A42] font-bold shrink-0"
        >
          WhatsApp ✦
        </a>
      </div>

      {/* Floating Island Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'py-2.5 sm:py-3 bg-white/92 backdrop-blur-xl border-b border-[#EAE2D2] shadow-[0_4px_25px_rgba(180,160,130,0.1)]' : 'py-3 sm:py-5 bg-transparent'}`}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-3 sm:gap-6">
          
          {/* Logo with secret triple click */}
          <a
            href="#hero"
            className="flex items-center gap-2 sm:gap-3 group select-none shrink-0"
            onClick={(e) => {
              playTick();
              handleLogoClick(e);
            }}
            title="INTEKS"
          >
            <div className="h-10 sm:h-11 w-10 sm:h-11 rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(197,160,89,0.35)] border border-[#C5A059]/60 bg-[#160E0A] flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-[#C5A059] transition-all">
              <img 
                src={getAssetUrl('inteks-official-logo.png')} 
                alt="INTEKS" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div>
              <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-[0.22em] text-gold-gradient block leading-none">INTEKS</span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.3em] text-[#9E7728] block mt-0.5 font-mono font-semibold">HAUTE COUTURE</span>
            </div>
          </a>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[13px] font-semibold text-[#4A453D] tracking-wide">
            <a href="#catalog" className="hover:text-[#9E7728] transition-colors" onClick={() => playTick()}>
              Коллекциялар <span className="text-[#9E7728] font-mono text-[11px]">({projects.length})</span>
            </a>
            <a href="#simulator" className="hover:text-[#9E7728] transition-colors" onClick={() => playTick()}>Электрокарниз</a>
            <a href="#fabrics" className="hover:text-[#9E7728] transition-colors" onClick={() => playTick()}>Маталар</a>
            <a href="#calculator" className="hover:text-[#9E7728] transition-colors" onClick={() => playTick()}>Калькулятор</a>
            <a href="#process" className="hover:text-[#9E7728] transition-colors" onClick={() => playTick()}>Шеберлік</a>
            <a href="#voucher" className="hover:text-[#9E7728] transition-colors" onClick={() => playTick()}>{voucher.discountAmount} Сертификат</a>
            <a href="#contacts" className="hover:text-[#9E7728] transition-colors" onClick={() => playTick()}>Шоурум</a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Sound FX Button (Desktop) */}
            <button 
              onClick={handleSoundToggle}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F6F1E8] border border-[#DFD3BF] hover:border-[#9E7728] text-xs text-[#6E6659] hover:text-[#9E7728] transition-all"
              title={soundOn ? 'Дыбысты өшіру' : 'Дыбысты қосу'}
            >
              {soundOn ? <Volume2 size={13} className="text-[#9E7728]" /> : <VolumeX size={13} className="opacity-50" />}
              <span className="text-[10px] font-mono tracking-wider font-semibold">{soundOn ? 'AUDIO ON' : 'AUDIO OFF'}</span>
            </button>

            {/* VIP WhatsApp CTA */}
            <a 
              href={`https://wa.me/${siteSettings.whatsappNumber}?text=Сәлеметсіз%20бе!%20Тегін%20замерге%20жазылғым%20келеді.`}
              target="_blank"
              rel="noreferrer"
              onClick={() => playTick()}
              className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none shrink-0"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#987838] via-[#EBD399] to-[#C5A059] rounded-full opacity-90 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#1C1A17] text-[#FAF8F5] text-xs font-semibold tracking-wider uppercase transition-all group-hover:bg-[#2C2723]">
                <span className="w-2 h-2 rounded-full bg-[#38ef7d] animate-ping" />
                <span className="hidden sm:inline">Тегін замер</span>
                <span className="sm:hidden">Замер</span>
                <ArrowUpRight size={14} className="text-[#EBD399] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </a>

            {/* Mobile menu trigger */}
            <button 
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl bg-[#FAF5EC] border border-[#DFD3BF] text-[#2C2723] active:bg-[#F0E8DB]"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-0 right-0 w-[300px] h-full bg-[#FCFAF6] border-l border-[#DFD3BF] p-6 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex justify-between items-center pb-6 border-b border-[#EAE2D2]">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl overflow-hidden shadow-md border border-[#C5A059]/60 bg-[#160E0A] flex items-center justify-center shrink-0">
                    <img 
                      src={getAssetUrl('inteks-official-logo.png')} 
                      alt="INTEKS" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <span className="font-cinzel text-2xl text-gold-gradient font-bold block leading-none">INTEKS</span>
                    <span className="text-[8px] tracking-[0.25em] text-[#9E7728] font-mono font-semibold block mt-0.5">ХАУТ КУТЮР САЛОН</span>
                  </div>
                </div>
                <button onClick={() => setMobileOpen(false)} className="text-[#787168] hover:text-[#1C1917] p-1"><X size={22} /></button>
              </div>
              <nav className="flex flex-col gap-4 mt-6 text-sm font-semibold">
                <a href="#catalog" onClick={() => setMobileOpen(false)} className="text-[#4A453D] hover:text-[#9E7728]">01. Коллекциялар ({projects.length} жоба)</a>
                <a href="#simulator" onClick={() => setMobileOpen(false)} className="text-[#4A453D] hover:text-[#9E7728]">02. Электрокарниз Симуляторы</a>
                <a href="#fabrics" onClick={() => setMobileOpen(false)} className="text-[#4A453D] hover:text-[#9E7728]">03. Премиум Маталар</a>
                <a href="#calculator" onClick={() => setMobileOpen(false)} className="text-[#4A453D] hover:text-[#9E7728]">04. Баға Калькуляторы</a>
                <a href="#process" onClick={() => setMobileOpen(false)} className="text-[#4A453D] hover:text-[#9E7728]">05. Тапсырыс Кезеңдері</a>
                <a href="#voucher" onClick={() => setMobileOpen(false)} className="text-[#4A453D] hover:text-[#9E7728]">06. {voucher.discountAmount} Сертификат</a>
                <a href="#contacts" onClick={() => setMobileOpen(false)} className="text-[#4A453D] hover:text-[#9E7728]">07. Шоурум & Мекенжай</a>
              </nav>
            </div>
            <a 
              href={`https://wa.me/${siteSettings.whatsappNumber}`} 
              target="_blank" 
              rel="noreferrer"
              className="w-full text-center py-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#987838] text-white font-bold text-xs uppercase tracking-wider shadow-md"
            >
              WhatsApp арқылы жазу
            </a>
          </div>
        </div>
      )}
    </>
  );
}
