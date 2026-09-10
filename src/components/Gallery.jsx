import { Sparkles, Compass, Layers, Film } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import RoomProjector from './gallery/RoomProjector';
import Cinema3DStream from './gallery/Cinema3DStream';

export default function Gallery({ onSelectProject }) {
  const { data } = useSiteData();
  const allProjects = data.projects;
  return (
    <section className="py-24 lg:py-36 bg-transparent relative" id="catalog">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* PART 1: THE 5-ROOM INTERACTIVE CINEMA PROJECTOR (KEPT AS REQUESTED) */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#C5A059]/50 text-[#8B6520] text-xs font-semibold tracking-wider uppercase mb-3 font-mono shadow-sm">
            <Sparkles size={13} className="text-[#9E7728]" />
            <span>ИНТЕРАКТИВТІ САЛОН-СТУДИЯ</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-normal text-[#1C1917] mb-4 tracking-tight">
            Әр бөлмеге — авторлық шедевр
          </h2>
          <p className="text-[#5C554B] text-sm sm:text-base leading-relaxed">
            Бөлме түрін таңдап немесе кездейсоқ шедевр түймесін басып, сарайлық перделерді нақты уақытта үлкен экранға проекциялаңыз:
          </p>
        </div>

        {/* The 5-Room Interactive Projector */}
        <div className="mb-24">
          <RoomProjector
            allProjects={allProjects}
            onSelectProject={onSelectProject}
          />
        </div>

        {/* GOLD LUXURY SECTION DIVIDER */}
        <div className="relative my-20 flex items-center justify-center">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent" />
          <div className="absolute px-6 py-2.5 rounded-full bg-white border border-[#C5A059]/60 text-[#7A5714] text-xs font-mono tracking-widest uppercase flex items-center gap-2.5 shadow-[0_4px_20px_rgba(180,150,110,0.15)]">
            <Film size={14} className="text-[#9E7728]" />
            <span>3D RUNWAY ШОУ (ҮЗДІКСІЗ 3D АЙНАЛЫМ)</span>
          </div>
        </div>

        {/* PART 2: 3D FLOWING RUNWAY STREAM (PLAYING & TRANSITIONING IN 3D) */}
        <div className="mb-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="font-editorial text-2xl sm:text-4xl text-[#1C1917] font-normal mb-3">
              3D Кеңістіктік Подиум
            </h3>
            <p className="text-xs sm:text-sm text-[#5C554B]">
              Перделер автоматты түрде бірінен соң бірі 3D кеңістікте ауысып отырады. Кез келген үлгіні шертіп толық ашуға болады:
            </p>
          </div>

          {/* Continuous 3D Spatial Stage & Filmstrip */}
          <Cinema3DStream
            allProjects={allProjects}
            onSelectProject={onSelectProject}
          />
        </div>

      </div>
    </section>
  );
}