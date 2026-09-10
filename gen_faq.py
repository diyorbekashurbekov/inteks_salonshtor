code = """import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { playTick } from '../utils/sound';

const FAQS = [
  {
    q: 'Үйге келіп өлшеу (замер) шынымен тегін бе?',
    a: 'Иә, мүлдем тегін! Шымкент қаласының кез келген аумағына (Нұрсат, Тұран, Қайтпас, Бозарық, Shymkent City, Самал т.б.) шебер-дизайнеріміз 500-ден астам мата үлгілерімен үйіңізге ТЕГІН келеді. Терезеңізді лазермен дәл өлшеп, кеңес береді. Тапсырыс бермесеңіз де өлшеу ақысыз болып қалады.'
  },
  {
    q: 'Тапсырыс қанша күнде дайын болады?',
    a: 'Стандартты тапсырыстар мата мен дизайн бекітілген сәттен бастап 3-тен 5 жұмыс күніне дейін толық тігіліп бітеді. Егер қоныстой немесе қонақ күтуге байланысты шұғыл қажет болса, жеке келісіммен 48 сағат ішінде тігіп ілуге мүмкіндігіміз бар.'
  },
  {
    q: 'Маталар жуғанда кішіреймей ме, күнге өңбей ме?',
    a: 'Біз тек Еуропа мен Түркияның тікелей зауыттарынан жеткізілген жоғары тығыздықтағы маталарды қолданамыз. Барлық маталар арнайы термоөңдеуден (декатировка) өтеді, сондықтан жуу кезінде кішіреймейді (усадка бермейді) және түсі 10–15 жыл бойы өңбейді.'
  },
  {
    q: 'Түркістан және Қызылорда облыстарына қалай тапсырыс береміз?',
    a: 'Түркістан, Кентау, Сайрам, Сарыағаш, Ленгір өңірлеріне шеберлеріміз тікелей барады. Ал Қызылорда және бүкіл Қазақстан бойынша онлайн видеобайланыс арқылы терезеңізді өлшеуге көмектесіп, мата таңдатып, сақтандырылған курьерлік қызметтермен үйіңізге жеткіземіз.'
  }
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  const handleToggle = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
    playTick();
  };

  return (
    <section className="py-24 bg-[#070709] border-t border-white/[0.06]" id="faq">
      <div className="max-w-[900px] mx-auto px-6">
        
        <div className="text-center mb-16">
          <span className="text-[11px] font-semibold tracking-[0.28em] text-[#C5A059] uppercase block mb-3">
            ЖИІ ҚОЙЫЛАТЫН СҰРАҚТАР
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white">
            Сізді мазалайтын сауалдар
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx}
                className={`rounded-2xl bg-[#111016] border transition-all duration-300 overflow-hidden ${isOpen ? 'border-[#C5A059]/60 shadow-[0_10px_30px_rgba(0,0,0,0.5)]' : 'border-white/[0.08]'}`}
              >
                <button
                  onClick={() => handleToggle(idx)}
                  className="w-full p-6 text-left flex justify-between items-center gap-4 text-white font-medium text-base sm:text-lg hover:text-[#EBD399] transition-colors"
                >
                  <span>{faq.q}</span>
                  <Plus 
                    size={20} 
                    className={`text-[#C5A059] transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-45' : ''}`} 
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6 text-sm text-[#ABA69D] leading-relaxed border-t border-white/[0.04] pt-4"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
"""
with open(r"C:\Users\User\.gemini\antigravity\scratch\inteks-studio\src\components\FAQ.jsx", "w", encoding="utf-8") as f:
    f.write(code)
print("Created FAQ.jsx")
