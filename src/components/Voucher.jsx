import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Gift, Clock } from 'lucide-react';
import { playChime } from '../utils/sound';
import { useSiteData } from '../context/SiteDataContext';

export default function Voucher() {
  const { data } = useSiteData();
  const { voucher, siteSettings } = data;
  const [timeLeft, setTimeLeft] = useState({ h: 14, m: 28, s: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
      const diff = Math.max(0, end - now);

      setTimeLeft({
        h: Math.floor(diff / (1000 * 60 * 60)),
        m: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        s: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClaim = () => {
    playChime(950, 0.25);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#C5A059', '#EBD399', '#FFF', '#987838']
    });
  };

  const claimWaText = encodeURIComponent(
    `Сәлеметсіз бе! Сайттағы VIP Сертификат (${voucher.discountAmount} жеңілдік және тегін карниз) бойынша жазылып тұрмын.`
  );

  return (
    <section className="py-24 bg-transparent" id="voucher">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <div className="max-w-3xl mx-auto rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-white via-[#FCFAF5] to-[#F7F1E4] border-2 border-[#C5A059] shadow-[0_25px_70px_rgba(180,150,110,0.22)] relative overflow-hidden group">
          
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF2DE] border border-[#C5A059] text-[11px] font-mono tracking-widest text-[#7A5714] font-bold uppercase w-fit mb-6 shadow-xs">
            <Gift size={14} className="text-[#9E7728]" />
            <span>{voucher.badge}</span>
          </div>

          <h3 className="font-editorial text-3xl sm:text-5xl font-normal text-[#1C1917] mb-4">
            {voucher.title}
          </h3>

          <p className="text-sm sm:text-base text-[#5C554B] leading-relaxed max-w-xl mb-8">
            {voucher.desc}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-[#EAE2D2]">
            <div className="flex items-center gap-3">
              <Clock size={18} className="text-[#9E7728]" />
              <div className="text-xs text-[#787168]">
                <div className="font-medium">Бүгінгі акция бітуіне:</div>
                <div className="text-lg font-mono font-bold text-[#7A5714]">
                  {String(timeLeft.h).padStart(2, '0')}:{String(timeLeft.m).padStart(2, '0')}:{String(timeLeft.s).padStart(2, '0')}
                </div>
              </div>
            </div>

            <a 
              href={`https://wa.me/${siteSettings.whatsappNumber}?text=${claimWaText}`}
              target="_blank"
              rel="noreferrer"
              onClick={handleClaim}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#987838] text-white font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-[0_10px_30px_rgba(197,160,89,0.35)]"
            >
              Сертификатты бекіту 🎉
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
