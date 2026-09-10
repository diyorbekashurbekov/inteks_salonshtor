import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';
import { playTick, playChime } from '../utils/sound';
import { useSiteData } from '../context/SiteDataContext';

const REGIONS = ['Шымкент қаласы', 'Түркістан облысы', 'Қызылорда облысы'];
const ROOMS = ['Қонақ бөлме (Зал)', 'Мастер-Спальня', 'Асүй & Асхана', 'Эркер / Балалар'];

export default function Calculator() {
  const { data } = useSiteData();
  const { pricing, siteSettings } = data;
  const fabrics = pricing.fabrics;

  const [region, setRegion] = useState(REGIONS[0]);
  const [room, setRoom] = useState(ROOMS[0]);
  const [fabric, setFabric] = useState(fabrics[0] || { label: 'Итальяндық Барқыт', rate: 26000 });
  const [width, setWidth] = useState(3.5);
  const [height, setHeight] = useState(3.0);
  const [hasMotor, setHasMotor] = useState(false);
  const [hasTiebacks, setHasTiebacks] = useState(false);

  // Active fabric might have changed in pricing
  const currentFabric = fabrics.find((f) => f.id === fabric.id || f.label === fabric.label) || fabrics[0] || fabric;

  // Calculations
  const fabricMeters = (width * (pricing.gatherCoeff || 2.5)).toFixed(1);
  let total = Math.round(width * currentFabric.rate);
  if (height > 3.0) {
    total = Math.round(total * (1 + ((height - 3.0) * 0.18)));
  }
  if (hasMotor) total += (pricing.smartMotorRate || 45000);
  if (hasTiebacks) total += (pricing.tiebacksRate || 18000);
  if (total < (pricing.minOrderRate || 48000)) total = (pricing.minOrderRate || 48000);

  const formattedTotal = total.toLocaleString('ru-RU') + ' ₸';

  const waText = encodeURIComponent(`Сәлеметсіз бе! «INTEKS» сайтының калькуляторымен алдын ала есеп жасадым:
📍 Өңір: ${region}
🚪 Бөлме: ${room}
📏 Терезе өлшемі: ${width}м x ${height}м
🧵 Мата түрі: ${currentFabric.label} (${currentFabric.rate.toLocaleString('ru-RU')} ₸/м)
⚙️ Ақылды карниз: ${hasMotor ? `Иә (+${(pricing.smartMotorRate || 45000).toLocaleString('ru-RU')} ₸)` : 'Жоқ'}
🎀 Авторлық подхват: ${hasTiebacks ? `Иә (+${(pricing.tiebacksRate || 18000).toLocaleString('ru-RU')} ₸)` : 'Жоқ'}
💰 Шамамен құны: ${formattedTotal}

Мата үлгілерімен тегін замерге қашан келе аласыз?`);

  return (
    <section className="py-24 lg:py-36 bg-transparent relative" id="calculator">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-semibold tracking-[0.28em] text-[#9E7728] uppercase block mb-3 font-mono">
            ОНЛАЙН ЕСЕПТЕУ & КОНФИГУРАТОР
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#1C1917] mb-4">
            Интерактивті Перде Калькуляторы
          </h2>
          <p className="text-[#5C554B] text-sm sm:text-base leading-relaxed">
            Бөлме түрі мен терезенің өлшемін көрсетіңіз. Калькулятор қажетті мата көлемі мен бағасын автоматты түрде есептеп, WhatsApp-қа дайын смета ретінде жібереді:
          </p>
        </div>

        <div className="max-w-5xl mx-auto rounded-3xl bg-white/95 border-2 border-[#C5A059]/40 p-6 sm:p-10 shadow-[0_20px_70px_rgba(180,150,110,0.15)] backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Options Controls */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              {/* Region */}
              <div>
                <span className="text-xs uppercase tracking-widest text-[#787168] block mb-2 font-mono font-semibold">1. Өңірді таңдаңыз:</span>
                <div className="flex flex-wrap gap-2">
                  {REGIONS.map(r => (
                    <button
                      key={r}
                      onClick={() => { setRegion(r); playTick(); }}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${region === r ? 'bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#987838] text-white shadow-md' : 'bg-[#FAF6EE] text-[#4A453D] border border-[#E0D5C3] hover:border-[#9E7728]'}`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Room */}
              <div>
                <span className="text-xs uppercase tracking-widest text-[#787168] block mb-2 font-mono font-semibold">2. Бөлме түрі:</span>
                <div className="flex flex-wrap gap-2">
                  {ROOMS.map(rm => (
                    <button
                      key={rm}
                      onClick={() => { setRoom(rm); playTick(); }}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${room === rm ? 'bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#987838] text-white shadow-md' : 'bg-[#FAF6EE] text-[#4A453D] border border-[#E0D5C3] hover:border-[#9E7728]'}`}
                    >
                      {rm}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fabric */}
              <div>
                <span className="text-xs uppercase tracking-widest text-[#787168] block mb-2 font-mono font-semibold">3. Мата таңдауы:</span>
                <div className="flex flex-wrap gap-2">
                  {fabrics.map(f => (
                    <button
                      key={f.id || f.label}
                      onClick={() => { setFabric(f); playTick(); }}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${currentFabric.label === f.label ? 'bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#987838] text-white shadow-md' : 'bg-[#FAF6EE] text-[#4A453D] border border-[#E0D5C3] hover:border-[#9E7728]'}`}
                    >
                      {f.label} ({f.rate.toLocaleString('ru-RU')} ₸)
                    </button>
                  ))}
                </div>
              </div>

              {/* Width Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs uppercase tracking-widest text-[#787168] font-mono font-semibold">4. Терезе ені (карниз):</span>
                  <span className="text-sm font-mono font-bold text-[#7A5714]">{width} метр</span>
                </div>
                <input 
                  type="range"
                  min="1.5"
                  max="12.0"
                  step="0.5"
                  value={width}
                  onChange={(e) => { setWidth(parseFloat(e.target.value)); playTick(); }}
                  className="w-full accent-[#9E7728] h-2 bg-[#EAE2D2] rounded-lg cursor-pointer"
                />
              </div>

              {/* Height Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs uppercase tracking-widest text-[#787168] font-mono font-semibold">5. Төбе биіктігі:</span>
                  <span className="text-sm font-mono font-bold text-[#7A5714]">{height.toFixed(1)} метр</span>
                </div>
                <input 
                  type="range"
                  min="2.2"
                  max="6.0"
                  step="0.1"
                  value={height}
                  onChange={(e) => { setHeight(parseFloat(e.target.value)); playTick(); }}
                  className="w-full accent-[#9E7728] h-2 bg-[#EAE2D2] rounded-lg cursor-pointer"
                />
              </div>

              {/* Addons */}
              <div className="flex flex-col gap-2.5 pt-2">
                <label className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF6EE] border border-[#E0D5C3] hover:border-[#9E7728] cursor-pointer transition-colors">
                  <input 
                    type="checkbox"
                    checked={hasMotor}
                    onChange={(e) => { setHasMotor(e.target.checked); playChime(); }}
                    className="accent-[#9E7728] w-4 h-4"
                  />
                  <span className="text-xs text-[#2C2723] font-medium">Ақылды электрокарниз + Алиса моторы (+45 000 ₸)</span>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF6EE] border border-[#E0D5C3] hover:border-[#9E7728] cursor-pointer transition-colors">
                  <input 
                    type="checkbox"
                    checked={hasTiebacks}
                    onChange={(e) => { setHasTiebacks(e.target.checked); playChime(); }}
                    className="accent-[#9E7728] w-4 h-4"
                  />
                  <span className="text-xs text-[#2C2723] font-medium">Құйма жез сапты үлкен авторлық подхваттар (+18 000 ₸)</span>
                </label>
              </div>

            </div>

            {/* Right Summary Card */}
            <div className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EC] to-[#F3ECE0] border-2 border-[#C5A059]/60 p-6 sm:p-8 flex flex-col justify-between shadow-xl">
              <div>
                <span className="text-[11px] font-mono tracking-widest text-[#787168] uppercase block mb-3 font-semibold">
                  ЕСЕПТЕЛГЕН БАҒА МӨЛШЕРІ:
                </span>
                
                <motion.div 
                  key={total}
                  initial={{ scale: 0.95, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="font-editorial text-4xl sm:text-5xl font-bold text-gold-gradient mb-2"
                >
                  {formattedTotal}
                </motion.div>

                <div className="text-xs text-[#787168] font-mono mb-6 font-semibold">
                  ~{fabricMeters} метр мата қажет (2.5x жинау коэффициентімен)
                </div>

                <div className="flex flex-col gap-2.5 text-xs text-[#4A453D] py-5 border-y border-[#E0D5C3]">
                  <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#0E8A42]" /> Шымкент, Түркістан, Қызылордаға тегін замер</div>
                  <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#0E8A42]" /> 3–5 күнде жеке ательеде тігіп бітіру</div>
                  <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#0E8A42]" /> Карнизді ілу және кәсіби бумен үтіктеу</div>
                  <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#0E8A42]" /> 100% кілтке дейін тапсыру</div>
                </div>
              </div>

              <a 
                href={`https://wa.me/${siteSettings.whatsappNumber}?text=${waText}`}
                target="_blank"
                rel="noreferrer"
                className="mt-6 w-full flex items-center justify-center gap-2.5 py-4 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20ba59] hover:to-[#0f7a6e] text-white font-bold text-xs uppercase tracking-wider shadow-[0_10px_25px_rgba(37,211,102,0.3)] transition-all hover:scale-[1.02]"
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
