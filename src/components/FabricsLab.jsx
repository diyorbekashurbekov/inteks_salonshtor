import { Sparkles, Layers, ShieldCheck, Feather } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

const ICONS = [
  <Sparkles className="text-[#C5A059]" size={20} key="1" />,
  <Feather className="text-[#C5A059]" size={20} key="2" />,
  <Layers className="text-[#C5A059]" size={20} key="3" />,
  <ShieldCheck className="text-[#C5A059]" size={20} key="4" />,
];

export default function FabricsLab() {
  const { data } = useSiteData();
  const fabrics = data.fabrics;

  return (
    <section className="py-24 bg-transparent border-t border-[#EAE2D2]" id="fabrics">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-semibold tracking-[0.28em] text-[#9E7728] uppercase block mb-3 font-mono">
            ПРЕМИУМ ТЕКСТИЛЬ ЛАБОРАТОРИЯСЫ
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#1C1917] mb-4">
            1 500+ Тікелей Зауыттық Маталар
          </h2>
          <p className="text-[#5C554B] text-sm sm:text-base leading-relaxed">
            Біз күн сәулесінен оңбайтын, жуғанда тарылмайтын және табиғи әдемі бүктеме құрайтын ең таза текстиль маталарын тікелей өндірушілерден аламыз:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {fabrics.map((f, i) => (
            <div 
              key={f.id || i}
              className="p-8 rounded-3xl bg-white border border-[#EAE2D2] hover:border-[#C5A059] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(180,150,110,0.15)] flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#FAF5EC] border border-[#E0D5C3] flex items-center justify-center mb-6">
                  {ICONS[i % ICONS.length]}
                </div>
                <h3 className="font-editorial text-xl font-bold text-[#1C1917] mb-3">{f.title}</h3>
                <p className="text-xs text-[#5C554B] leading-relaxed mb-6">{f.desc}</p>
              </div>

              <div className="pt-4 border-t border-[#EAE2D2] flex flex-col gap-1.5 text-[11px] font-mono text-[#787168]">
                <div className="flex justify-between">
                  <span>Тығыздығы:</span>
                  <span className="text-[#7A5714] font-semibold">{f.density}</span>
                </div>
                <div className="flex justify-between">
                  <span>Сипаттамасы:</span>
                  <span className="text-[#1C1917] font-semibold">{f.blockage}</span>
                </div>
                <div className="flex justify-between">
                  <span>Шыққан жері:</span>
                  <span className="text-[#9E7728] font-bold">{f.origin}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
