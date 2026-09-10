code = """import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';
import { playTick, playChime } from '../utils/sound';

const REGIONS = ['Шымкент қаласы', 'Түркістан облысы', 'Қызылорда облысы'];
const ROOMS = ['Қонақ бөлме (Зал)', 'Мастер-Спальня', 'Асүй & Асхана', 'Эркер / Балалар'];
const FABRICS = [
  { label: 'Итальяндық Барқыт', rate: 26000 },
  { label: 'Табиғи Зығыр', rate: 22000 },
  { label: '100% Блэкаут', rate: 24000 },
  { label: 'Люкс Тюль', rate: 16000 }
];

export default function Calculator() {
  const [region, setRegion] = useState(REGIONS[0]);
  const [room, setRoom] = useState(ROOMS[0]);
  const [fabric, setFabric] = useState(FABRICS[0]);
  const [width, setWidth] = useState(3.5);
  const [height, setHeight] = useState(3.0);
  const [hasMotor, setHasMotor] = useState(false);
  const [hasTiebacks, setHasTiebacks] = useState(false);

  // Calculations
  const fabricMeters = (width * 2.5).toFixed(1);
  let total = Math.round(width * fabric.rate);
  if (height > 3.0) {
    total = Math.round(total * (1 + ((height - 3.0) * 0.18)));
  }
  if (hasMotor) total += 45000;
  if (hasTiebacks) total += 18000;
  if (total < 48000) total = 48000;

  const formattedTotal = total.toLocaleString('ru-RU') + ' ₸';

  const waText = encodeURIComponent(`Сәлеметсіз бе! «INTEKS» сайтының калькуляторымен алдын ала есеп жасадым:
📍 Өңір: ${region}
🚪 Бөлме: ${room}
📏 Терезе өлшемі: ${width}м x ${height}м
🧵 Мата түрі: ${fabric.label}
⚙️ Ақылды карниз: ${hasMotor ? 'Иә (+45 000 ₸)' : 'Жоқ'}
🎀 Авторлық подхват: ${hasTiebacks ? 'Иә (+18 000 ₸)' : 'Жоқ'}
💰 Шамамен құны: ${formattedTotal}

Мата үлгілерімен тегін замерге қашан келе аласыз?`);

  return (
    <section className="py-24 lg:py-36 bg-[#0B0A0E] relative" id="calculator">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-semibold tracking-[0.28em] text-[#C5A059] uppercase block mb-3">
            ОНЛАЙН ЕСЕПТЕУ & КОНФИГУРАТОР
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white mb-4">
            Интерактивті Перде Калькуляторы
          </h2>
          <p className="text-[#ABA69D] text-sm sm:text-base leading-relaxed">
            Бөлме түрі мен терезенің өлшемін көрсетіңіз. Калькулятор қажетті мата көлемі мен бағасын автоматты түрде есептеп, WhatsApp-қа дайын смета ретінде жібереді:
          </p>
        </div>

        <div className="max-w-5xl mx-auto rounded-3xl bg-[#121117] border border-[#C5A059]/40 p-6 sm:p-10 shadow-[0_20px_70px_rgba(0,0,0,0.8)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Options Controls */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              {/* Region */}
              <div>
                <span className="text-xs uppercase tracking-widest text-[#736E66] block mb-2 font-mono">1. Өңірді таңдаңыз:</span>
                <div className="flex flex-wrap gap-2">
                  {REGIONS.map(r => (
                    <button
                      key={r}
                      onClick={() => { setRegion(r); playTick(); }}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${region === r ? 'bg-[#C5A059] text-black' : 'bg-white/[0.04] text-white/80 border border-white/[0.08] hover:border-[#C5A059]'}`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Room */}
              <div>
                <span className="text-xs uppercase tracking-widest text-[#736E66] block mb-2 font-mono">2. Бөлме түрі:</span>
                <div className="flex flex-wrap gap-2">
                  {ROOMS.map(rm => (
                    <button
                      key={rm}
                      onClick={() => { setRoom(rm); playTick(); }}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${room === rm ? 'bg-[#C5A059] text-black' : 'bg-white/[0.04] text-white/80 border border-white/[0.08] hover:border-[#C5A059]'}`}
                    >
                      {rm}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fabric */}
              <div>
                <span className="text-xs uppercase tracking-widest text-[#736E66] block mb-2 font-mono">3. Мата таңдауы:</span>
                <div className="flex flex-wrap gap-2">
                  {FABRICS.map(f => (
                    <button
                      key={f.label}
                      onClick={() => { setFabric(f); playTick(); }}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${fabric.label === f.label ? 'bg-[#C5A059] text-black' : 'bg-white/[0.04] text-white/80 border border-white/[0.08] hover:border-[#C5A059]'}`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Width Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs uppercase tracking-widest text-[#736E66] font-mono">4. Терезе ені (карниз):</span>
                  <span className="text-sm font-mono font-bold text-[#EBD399]">{width} метр</span>
                </div>
                <input 
                  type="range"
                  min="1.5"
                  max="12.0"
                  step="0.5"
                  value={width}
                  onChange={(e) => { setWidth(parseFloat(e.target.value)); playTick(); }}
                  className="w-full accent-[#C5A059] h-2 bg-white/10 rounded-lg cursor-pointer"
                />
              </div>

              {/* Height Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs uppercase tracking-widest text-[#736E66] font-mono">5. Төбе биіктігі:</span>
                  <span className="text-sm font-mono font-bold text-[#EBD399]">{height.toFixed(1)} метр</span>
                </div>
                <input 
                  type="range"
                  min="2.2"
                  max="6.0"
                  step="0.1"
                  value={height}
                  onChange={(e) => { setHeight(parseFloat(e.target.value)); playTick(); }}
                  className="w-full accent-[#C5A059] h-2 bg-white/10 rounded-lg cursor-pointer"
                />
              </div>

              {/* Addons */}
              <div className="flex flex-col gap-2.5 pt-2">
                <label className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-[#C5A059]/40 cursor-pointer transition-colors">
                  <input 
                    type="checkbox"
                    checked={hasMotor}
                    onChange={(e) => { setHasMotor(e.target.checked); playChime(); }}
                    className="accent-[#C5A059] w-4 h-4"
                  />
                  <span className="text-xs text-white/90">Ақылды электрокарниз + Алиса моторы (+45 000 ₸)</span>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-[#C5A059]/40 cursor-pointer transition-colors">
                  <input 
                    type="checkbox"
                    checked={hasTiebacks}
                    onChange={(e) => { setHasTiebacks(e.target.checked); playChime(); }}
                    className="accent-[#C5A059] w-4 h-4"
                  />
                  <span className="text-xs text-white/90">Құйма жез сапты үлкен авторлық подхваттар (+18 000 ₸)</span>
                </label>
              </div>

            </div>

            {/* Right Summary Card */}
            <div className="lg:col-span-5 rounded-2xl bg-[#09080C] border border-[#C5A059]/40 p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
              <div>
                <span className="text-[11px] font-mono tracking-widest text-[#736E66] uppercase block mb-3">
                  ЕСЕПТЕЛГЕН БАҒА МӨЛШЕРІ:
                </span>
                
                <motion.div 
                  key={total}
                  initial={{ scale: 0.95, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="font-serif text-4xl sm:text-5xl font-light text-[#EBD399] mb-2"
                >
                  {formattedTotal}
                </motion.div>

                <div className="text-xs text-[#736E66] font-mono mb-6">
                  ~{fabricMeters} метр мата қажет (2.5x жинау коэффициентімен)
                </div>

                <div className="flex flex-col gap-2.5 text-xs text-[#ABA69D] py-5 border-y border-white/[0.08]">
                  <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#C5A059]" /> Шымкент, Түркістан, Қызылордаға тегін замер</div>
                  <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#C5A059]" /> 3–5 күнде жеке ательеде тігіп бітіру</div>
                  <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#C5A059]" /> Карнизді ілу және кәсіби бумен үтіктеу</div>
                  <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#C5A059]" /> 100% кілтке дейін тапсыру</div>
                </div>
              </div>

              <a 
                href={`https://wa.me/77011291570?text=${waText}`}
                target="_blank"
                rel="noreferrer"
                className="mt-6 w-full flex items-center justify-center gap-2.5 py-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-black font-bold text-xs uppercase tracking-wider shadow-[0_10px_25px_rgba(37,211,102,0.3)] transition-all"
              >
                <span>Осы есепті WhatsApp-қа жіберу</span>
                <Send size={15} />
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
"""
with open(r"C:\Users\User\.gemini\antigravity\scratch\inteks-studio\src\components\Calculator.jsx", "w", encoding="utf-8") as f:
    f.write(code)
print("Created Calculator.jsx")
