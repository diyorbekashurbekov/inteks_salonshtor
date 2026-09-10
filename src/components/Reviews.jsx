import { Star, MapPin } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

export default function Reviews() {
  const { data } = useSiteData();
  const reviews = data.reviews;

  return (
    <section className="py-24 bg-transparent border-t border-[#EAE2D2]" id="reviews">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-semibold tracking-[0.28em] text-[#9E7728] uppercase block mb-3 font-mono">
            ШЫНАЙЫ ТҰТЫНУШЫЛАР
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#1C1917] mb-4">
            Тұтынушыларымыздың пікірі
          </h2>
          <p className="text-[#5C554B] text-sm sm:text-base leading-relaxed">
            Шымкент, Түркістан және Қызылорда қалаларындағы риза отбасылардың жылы лебіздері:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {reviews.map((r, idx) => (
            <div 
              key={r.id || idx}
              className="p-8 rounded-3xl bg-white border border-[#EAE2D2] hover:border-[#C5A059] shadow-[0_10px_35px_rgba(180,160,130,0.08)] hover:shadow-[0_15px_45px_rgba(180,150,110,0.16)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-[#C5A059] mb-5">
                  {[...Array(r.rating || 5)].map((_, i) => (
                    <Star key={i} size={15} fill="#C5A059" />
                  ))}
                </div>
                <p className="text-sm text-[#4A453D] leading-relaxed italic mb-6">
                  {r.text}
                </p>
              </div>

              <div className="pt-4 border-t border-[#EAE2D2] flex items-center justify-between">
                <div>
                  <div className="font-editorial text-lg text-[#1C1917] font-semibold">{r.author}</div>
                  <div className="text-[11px] text-[#787168] flex items-center gap-1 mt-0.5">
                    <MapPin size={11} className="text-[#9E7728]" /> {r.location}
                  </div>
                </div>
                <span className="text-[10px] font-mono tracking-wider px-2.5 py-1 rounded-full bg-[#FAF5EC] text-[#7A5714] border border-[#E5DAC6] font-semibold">
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
