import { MapPin, Phone, Clock, ExternalLink, MessageCircle } from 'lucide-react';
import { playTick } from '../utils/sound';
import { useSiteData } from '../context/SiteDataContext';

function InstagramIcon({ size = 15, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

export default function Showroom() {
  const { data } = useSiteData();
  const { siteSettings } = data;

  return (
    <section className="py-24 bg-transparent border-t border-[#EAE2D2]" id="contacts">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-semibold tracking-[0.28em] text-[#9E7728] uppercase block mb-3 font-mono">
            РЕСМИ ШОУРУМ & БАЙЛАНЫС
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#1C1917] mb-4">
            Бізге қонаққа келіңіз
          </h2>
          <p className="text-[#5C554B] text-sm sm:text-base leading-relaxed">
            Шымкент қаласындағы ресми салонымызда 1 500+ мата үлгілері мен дайын перде композициялары күтуде:
          </p>
        </div>

        <div className="max-w-4xl mx-auto rounded-3xl bg-white border-2 border-[#C5A059]/40 p-8 sm:p-12 shadow-[0_25px_70px_rgba(180,150,110,0.18)] grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Address */}
          <div>
            <span className="text-xs uppercase tracking-widest text-[#9E7728] font-mono font-semibold block mb-2">МЕКЕНЖАЙ:</span>
            <h3 className="font-editorial text-2xl sm:text-3xl text-[#1C1917] font-semibold mb-3">{siteSettings.address}</h3>
            <p className="text-xs text-[#5C554B] leading-relaxed mb-6">
              «{siteSettings.salonName}» салоны. {siteSettings.workingHours}.
            </p>

            <div className="flex flex-col gap-3">
              <a 
                href={siteSettings.mapsUrl} 
                target="_blank" 
                rel="noreferrer" 
                onClick={() => playTick()}
                className="flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#FAF5EC] border border-[#C5A059] hover:bg-[#C5A059] text-[#7A5714] hover:text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-sm"
              >
                <MapPin size={15} />
                <span>Google Maps навигаторымен ашу</span>
                <ExternalLink size={13} />
              </a>

              <a 
                href={`https://wa.me/${siteSettings.whatsappNumber}?text=Сәлеметсіз%20бе!%20Шоурумға%20баруға%20бағыт%20сұрағым%20келеді.`} 
                target="_blank" 
                rel="noreferrer" 
                onClick={() => playTick()}
                className="flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-white border border-[#DFD3BF] hover:border-[#0E8A42] text-[#2C2723] hover:text-[#0E8A42] font-semibold text-xs tracking-wider transition-all shadow-xs"
              >
                <MessageCircle size={15} className="text-[#0E8A42]" />
                <span>Шоурумға бағыт сұрау (WhatsApp)</span>
              </a>
            </div>
          </div>

          {/* Direct Info */}
          <div className="md:border-l md:border-[#EAE2D2] md:pl-10 flex flex-col justify-between gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#9E7728] font-mono font-semibold block mb-2">БАЙЛАНЫС ОРТАЛЫҒЫ:</span>
              <a 
                href={`https://wa.me/${siteSettings.whatsappNumber}`} 
                className="font-editorial text-2xl sm:text-3xl text-gold-gradient hover:text-[#9E7728] font-bold block transition-colors mb-4"
              >
                {siteSettings.phone}
              </a>

              <div className="flex flex-col gap-3 text-xs text-[#5C554B]">
                <div className="flex items-center gap-2.5">
                  <Clock size={15} className="text-[#9E7728]" />
                  <span>{siteSettings.workingHours}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <InstagramIcon size={15} className="text-[#9E7728]" />
                  <a href={siteSettings.instagramUrl} target="_blank" rel="noreferrer" className="text-[#1C1917] hover:text-[#9E7728] font-medium underline">
                    {siteSettings.instagram} (49 000 оқырман)
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin size={15} className="text-[#9E7728]" />
                  <span>{siteSettings.regions}</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF6EE] border border-[#E5DAC6] text-xs text-[#787168]">
              * Шеберлеріміз 500+ мата чемоданымен үйіңізге кез келген уақытта тегін келуге дайын.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
