import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { playTick, playChime } from '../../utils/sound';

export default function KineticListReveal({ projects, onSelectProject }) {
  const [hoveredProject, setHoveredProject] = useState(null);
  const containerRef = useRef(null);

  // Mouse position tracking with springs
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 250, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredProject(null)}
      className="relative rounded-3xl bg-[#0E0D13] border border-white/10 p-4 sm:p-8 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
    >
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-2">
        <div className="flex items-center gap-2 text-[#C5A059] text-xs font-semibold uppercase tracking-widest">
          <Sparkles size={14} />
          <span>КИНЕТИКАЛЫҚ КАТАЛОГ (ТІЗІМ БОЙЫНША ТЫШҚАНДЫ ЖЫЛЖЫТЫҢЫЗ)</span>
        </div>
        <span className="text-xs font-mono text-[#736E66]">60 Шедевр</span>
      </div>

      {/* Project Rows */}
      <div className="divide-y divide-white/[0.06]">
        {projects.slice(0, 16).map((item) => {
          const isHovered = hoveredProject?.index === item.index;

          return (
            <div
              key={item.index}
              onMouseEnter={() => {
                setHoveredProject(item);
                playTick(1000, 0.015);
              }}
              onClick={() => {
                onSelectProject(item);
                playChime(950, 0.1);
              }}
              className="group py-4 sm:py-5 px-3 sm:px-4 flex items-center justify-between cursor-pointer transition-colors duration-200 hover:bg-white/[0.03] rounded-xl"
            >
              <div className="flex items-center gap-4 sm:gap-8">
                <span className="font-mono text-xs sm:text-sm text-[#736E66] group-hover:text-[#C5A059] transition-colors w-6">
                  {item.num}
                </span>

                <div>
                  <h4 className="font-serif text-lg sm:text-2xl text-white group-hover:text-[#EBD399] transition-colors duration-200 font-normal">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#736E66] hidden sm:block mt-0.5 line-clamp-1">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="hidden md:inline-block px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] text-[#ABA69D] group-hover:border-[#C5A059]/40 group-hover:text-[#EBD399] transition-colors">
                  {item.badge}
                </span>

                <div className="w-8 h-8 rounded-full bg-white/[0.05] group-hover:bg-[#C5A059] group-hover:text-black flex items-center justify-center text-[#ABA69D] transition-all group-hover:rotate-45">
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Magnetic Image Portal that follows cursor */}
      {hoveredProject && (
        <motion.div
          style={{
            left: smoothX,
            top: smoothY,
            x: '-50%',
            y: '-50%',
          }}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.6, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="pointer-events-none fixed sm:absolute z-50 w-64 h-80 rounded-2xl overflow-hidden border-2 border-[#C5A059] shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_40px_rgba(197,160,89,0.4)] hidden sm:block bg-black"
        >
          {/* Ambient blurred backdrop */}
          <img
            src={`/assets/img/${hoveredProject.filename}`}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover blur-xl opacity-50 scale-125 pointer-events-none"
          />
          {/* Full uncropped image */}
          <img
            src={`/assets/img/${hoveredProject.filename}`}
            alt={hoveredProject.title}
            className="relative z-10 w-full h-full object-contain p-2"
          />
          <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/85 via-transparent to-transparent flex flex-col justify-end p-4">
            <span className="text-[10px] uppercase font-mono text-[#EBD399]">
              {hoveredProject.badge}
            </span>
            <span className="font-serif text-sm text-white line-clamp-1 font-semibold">
              {hoveredProject.title}
            </span>
          </div>
        </motion.div>
      )}

    </div>
  );
}