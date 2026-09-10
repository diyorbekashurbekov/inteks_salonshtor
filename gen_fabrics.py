code = """import { Sparkles, Layers, ShieldCheck, Feather } from 'lucide-react';

const FABRICS = [
  {
    title: 'Матовый Барқыт (Italian Velvet)',
    desc: 'Түркия және Италияның тығыз матовый барқыты. Жарықты терең жұтады, салтанатты салмақты қатпарлар құрайды.',
    density: '420 g/m²',
    blockage: '90% Жарық жұту',
    origin: 'Италия & Түркия',
    icon: <Sparkles className="text-[#C5A059]" size={20} />
  },
  {
    title: 'Табиғи Зығыр (Belgian Linen)',
    desc: 'Бельгиялық табиғи талшықты зығыр. Скандинавиялық, заманауи және эко-минималистік интерьерлерге мінсіз үйлеседі.',
    density: '340 g/m²',
    blockage: 'Тыныс алатын мата',
    origin: 'Бельгия',
    icon: <Feather className="text-[#C5A059]" size={20} />
  },
  {
    title: 'Көпқабатты 100% Блэкаут',
    desc: 'Күн сәулесі мен көшедегі фонарь жарығын 100% өткізбейтін инновациялық мата. Жатын және балалар бөлмелеріне арналған.',
    density: '480 g/m²',
    blockage: '100% Оқшаулау',
    origin: 'Германия',
    icon: <Layers className="text-[#C5A059]" size={20} />
  },
  {
    title: 'Итальяндық Люкс Вуаль & Тюль',
    desc: 'Ауадай жеңіл салмақсыз нәзік тюль. Терезеден түскен күн сәулесін бөлмеге әдемі шашыратады.',
    density: '110 g/m²',
    blockage: 'Мөлдір нәзіктік',
    origin: 'Италия',
    icon: <ShieldCheck className="text-[#C5A059]" size={20} />
  }
];

export default function FabricsLab() {
  return (
    <section className="py-24 bg-[#070709] border-t border-white/[0.06]" id="fabrics">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-semibold tracking-[0.28em] text-[#C5A059] uppercase block mb-3">
            ПРЕМИУМ ТЕКСТИЛЬ ЛАБОРАТОРИЯСЫ
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white mb-4">
            1 500+ Тікелей Зауыттық Маталар
          </h2>
          <p className="text-[#ABA69D] text-sm sm:text-base leading-relaxed">
            Біз күн сәулесінен оңбайтын, жуғанда тарылмайтын және табиғи әдемі бүктеме құрайтын ең таза текстиль маталарын тікелей өндірушілерден аламыз:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FABRICS.map((f, i) => (
            <div 
              key={i}
              className="p-8 rounded-2xl bg-[#111016] border border-white/[0.08] hover:border-[#C5A059]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.6)] flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-6">
                  {f.icon}
                </div>
                <h3 className="font-serif text-xl font-normal text-white mb-3">{f.title}</h3>
                <p className="text-xs text-[#ABA69D] leading-relaxed mb-6">{f.desc}</p>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex flex-col gap-1.5 text-[11px] font-mono text-[#736E66]">
                <div className="flex justify-between">
                  <span>Тығыздығы:</span>
                  <span className="text-[#EBD399]">{f.density}</span>
                </div>
                <div className="flex justify-between">
                  <span>Сипаттамасы:</span>
                  <span className="text-white">{f.blockage}</span>
                </div>
                <div className="flex justify-between">
                  <span>Шыққан жері:</span>
                  <span className="text-[#C5A059]">{f.origin}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
"""
with open(r"C:\Users\User\.gemini\antigravity\scratch\inteks-studio\src\components\FabricsLab.jsx", "w", encoding="utf-8") as f:
    f.write(code)
print("Created FabricsLab.jsx")
