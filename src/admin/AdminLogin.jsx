import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, KeyRound, ArrowLeft, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { playChime, playTick } from '../utils/sound';
import { getAssetUrl } from '../utils/assets';

export default function AdminLogin({ onLoginSuccess, onClose }) {
  const { data } = useSiteData();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [showPin, setShowPin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctPin = data.admin?.pin || 'inteks2026';
    if (pin === correctPin) {
      playChime(1200, 0.15);
      setError(false);
      onLoginSuccess();
    } else {
      playTick(300, 0.1);
      setError(true);
      setPin('');
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-[#141210]/95 backdrop-blur-2xl">
      {/* Radiant ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#C5A059]/15 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        className="relative max-w-md w-full rounded-3xl bg-white border-2 border-[#C5A059] p-8 sm:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.5),0_0_40px_rgba(197,160,89,0.2)] text-[#1C1917]"
      >
        {/* Top return button */}
        <button
          onClick={() => {
            playTick(700, 0.02);
            onClose();
          }}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#787168] hover:text-[#9E7728] mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Сайтқа қайту (Шығу)</span>
        </button>

        {/* Official Royal INTEKS Crest Logo */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-20 h-20 rounded-2xl bg-[#160E0A] border-2 border-[#C5A059] flex items-center justify-center shadow-[0_8px_30px_rgba(197,160,89,0.35)] overflow-hidden">
            <img 
              src={getAssetUrl('inteks-official-logo.png')} 
              alt="INTEKS" 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5EC] border border-[#C5A059]/50 text-[#7A5714] text-[10px] font-mono uppercase tracking-widest font-bold mb-3">
            <ShieldCheck size={13} className="text-[#0E8A42]" />
            <span>INTEKS EXECUTIVE STUDIO</span>
          </div>
          <h2 className="font-editorial text-3xl font-semibold text-[#1C1917]">
            Құпия Басқару Орталығы
          </h2>
          <p className="text-xs text-[#6B6459] mt-2">
            Сайтты 100% басқару үшін әкімші PIN кодын енгізіңіз:
          </p>
        </div>

        {/* PIN Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-[#787168] mb-2 font-semibold">
              Әкімші PIN коды:
            </label>
            <div className="relative">
              <KeyRound size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9E7728]" />
              <input
                type={showPin ? 'text' : 'password'}
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError(false);
                }}
                placeholder="••••••••"
                autoFocus
                className={`w-full pl-11 pr-11 py-3.5 rounded-xl border text-base font-mono tracking-widest transition-all outline-none ${
                  error
                    ? 'border-red-500 bg-red-50 text-red-700 focus:ring-2 focus:ring-red-300'
                    : 'border-[#DFD3BF] bg-[#FAF8F5] focus:border-[#9E7728] focus:ring-2 focus:ring-[#C5A059]/30 text-[#1C1917]'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#787168] hover:text-[#1C1917]"
              >
                {showPin ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-600 mt-2 font-semibold flex items-center gap-1"
              >
                ⚠ Қате PIN код! Қайтадан теріп көріңіз.
              </motion.p>
            )}
            <p className="text-[11px] text-[#8C8375] mt-2 font-mono">
              * Бастапқы құпия код: <span className="font-bold text-[#7A5714]">inteks2026</span>
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#987838] hover:from-[#c5a059] hover:to-[#7f632c] text-white font-bold text-xs uppercase tracking-widest shadow-[0_10px_25px_rgba(197,160,89,0.35)] transition-all hover:scale-[1.02] active:scale-95"
          >
            Басқару панеліне кіру →
          </button>
        </form>
      </motion.div>
    </div>
  );
}
