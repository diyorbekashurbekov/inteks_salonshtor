import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { playTick } from '../utils/sound';
import { useSiteData } from '../context/SiteDataContext';

export default function FAQ() {
  const { data } = useSiteData();
  const faqs = data.faqs;
  const [openIdx, setOpenIdx] = useState(0);

  const handleToggle = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
    playTick();
  };

  return (
    <section className="py-24 bg-transparent border-t border-[#EAE2D2]" id="faq">
      <div className="max-w-[900px] mx-auto px-6">
        
        <div className="text-center mb-16">
          <span className="text-[11px] font-semibold tracking-[0.28em] text-[#9E7728] uppercase block mb-3 font-mono">
            ЖИІ ҚОЙЫЛАТЫН СҰРАҚТАР
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#1C1917]">
            Сізді мазалайтын сауалдар
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={faq.id || idx}
                className={`rounded-2xl bg-white border transition-all duration-300 overflow-hidden ${isOpen ? 'border-[#C5A059] shadow-[0_10px_35px_rgba(180,150,110,0.15)]' : 'border-[#EAE2D2] hover:border-[#C5A059]/50 shadow-xs'}`}
              >
                <button
                  onClick={() => handleToggle(idx)}
                  className="w-full p-6 text-left flex justify-between items-center gap-4 text-[#1C1917] font-medium text-base sm:text-lg hover:text-[#9E7728] transition-colors"
                >
                  <span className="font-editorial text-lg sm:text-xl">{faq.q}</span>
                  <Plus 
                    size={20} 
                    className={`text-[#9E7728] transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-45' : ''}`} 
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6 text-sm text-[#5C554B] leading-relaxed border-t border-[#F2ECE0] pt-4"
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
