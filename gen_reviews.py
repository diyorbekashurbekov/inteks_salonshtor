code = """import { Star, MapPin } from 'lucide-react';

const REVIEWS = [
  {
    text: '«Залдың 6 метрлік биік панорамалық терезелеріне перде табу өте қиын болған еді. INTEKS шеберлері мата чемодандарымен келіп, интерьерге дәл үйлесетін түстерді ұсынды. 4 күнде тігіп, кәсіби бу үтігімен әр қатпарын мінсіз жинап берді!»',
    author: 'Гүлнәр ханым',
    location: 'Shymkent City, Шымкент',
    tag: 'Сарайлық Зал'
  },
  {
    text: '«Түркістан қаласындағы жаңа салған үйімізге шақырдық. Дизайнерлер келіп, бүкіл бөлмеге кешенді жоба сызып берді. Әсіресе ақылды электрокарниздер мен салтанатты қос сваг өте керемет шықты. Уақытында жеткізіп орнатып берді.»',
    author: 'Бақытжан мырза',
    location: 'Түркістан қаласы',
    tag: 'Ақылды Карниз & Сваг'
  },
  {
    text: '«Қызылордадан тапсырыс бердік. Басында уайымдаған едік, бірақ мамандар видеобайланыспен өлшемді түсіндіріп, маталарды таңдатты. Перделер мінсіз тігіліп, қауіпсіз қаптамада тез келді. Ғажап сапа!»',
    author: 'Әлия ханым',
    location: 'Қызылорда қаласы',
    tag: 'Онлайн Өлшеу & Жеткізу'
  }
];

export default function Reviews() {
  return (
    <section className="py-24 bg-[#0A090E]" id="reviews">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-semibold tracking-[0.28em] text-[#C5A059] uppercase block mb-3">
            ШЫНАЙЫ ТҰТЫНУШЫЛАР
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white mb-4">
            Тұтынушыларымыздың пікірі
          </h2>
          <p className="text-[#ABA69D] text-sm sm:text-base leading-relaxed">
            Шымкент, Түркістан және Қызылорда қалаларындағы риза отбасылардың жылы лебіздері:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {REVIEWS.map((r, idx) => (
            <div 
              key={idx}
              className="p-8 rounded-2xl bg-[#121117] border border-white/[0.08] hover:border-[#C5A059]/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-[#C5A059] mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="#C5A059" />
                  ))}
                </div>
                <p className="text-sm text-[#ABA69D] leading-relaxed italic mb-6">
                  {r.text}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <div>
                  <div className="font-serif text-base text-white font-medium">{r.author}</div>
                  <div className="text-[11px] text-[#736E66] flex items-center gap-1 mt-0.5">
                    <MapPin size={11} /> {r.location}
                  </div>
                </div>
                <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded bg-white/[0.05] text-[#EBD399]">
                  {r.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
"""
with open(r"C:\Users\User\.gemini\antigravity\scratch\inteks-studio\src\components\Reviews.jsx", "w", encoding="utf-8") as f:
    f.write(code)
print("Created Reviews.jsx")
