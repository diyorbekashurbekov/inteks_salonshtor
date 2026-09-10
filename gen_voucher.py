code = """import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Gift, Clock } from 'lucide-react';
import { playChime } from '../utils/sound';

export default function Voucher() {
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

  return (
    <section className="py-24 bg-[#070709]" id="voucher">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <div className="max-w-3xl mx-auto rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#1A1822] via-[#0E0D12] to-[#0A090D] border-2 border-[#C5A059] shadow-[0_20px_80px_rgba(0,0,0,0.9),0_0_50px_rgba(197,160,89,0.25)] relative overflow-hidden group">
          
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/20 border border-[#C5A059] text-[10px] font-mono tracking-widest text-[#EBD399] uppercase w-fit mb-6">
            <Gift size={13} />
            <span>VIP СЕРТИФИКАТ ✦ АЛҒАШҚЫ 5 ТАПСЫРЫСҚА</span>
          </div>

          <h3 className="font-serif text-3xl sm:text-5xl font-normal text-white mb-4">
            15 000 ₸ Жеңілдік + Тегін Карниз
          </h3>

          <p className="text-sm sm:text-base text-[#ABA69D] leading-relaxed max-w-xl mb-8">
            Бүгін сайттан сұраныс берген немесе WhatsApp-қа жазған алғашқы 5 тұтынушыға: кез келген бөлменің пердесін тігуге 15 000 ₸ жеңілдік сертификаты мен карнизді тегін орнату сыйлыққа беріледі.
          </p>

          <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-[#C5A059]/30">
            <div className="flex items-center gap-3">
              <Clock size={16} className="text-[#C5A059]" />
              <div className="text-xs text-[#736E66]">
                <div>Бүгінгі акция бітуіне:</div>
                <div className="text-base font-mono font-bold text-[#EBD399]">
                  {String(timeLeft.h).padStart(2, '0')}:{String(timeLeft.m).padStart(2, '0')}:{String(timeLeft.s).padStart(2, '0')}
                </div>
              </div>
            </div>

            <a 
              href="https://wa.me/77011291570?text=Сәлеметсіз%20бе!%20Сайттағы%20VIP%20Сертификат%20(15%20000%20₸%20жеңілдік%20және%20тегін%20карниз)%20бойынша%20жазылып%20тұрмын."
              target="_blank"
              rel="noreferrer"
              onClick={handleClaim}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#EBD399] to-[#C5A059] text-black font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-[0_10px_30px_rgba(197,160,89,0.4)]"
            >
              Сертификатты бекіту 🎉
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
"""
with open(r"C:\Users\User\.gemini\antigravity\scratch\inteks-studio\src\components\Voucher.jsx", "w", encoding="utf-8") as f:
    f.write(code)
print("Created Voucher.jsx")
