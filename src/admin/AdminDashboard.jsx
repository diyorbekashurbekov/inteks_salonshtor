import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Images,
  Calculator as CalcIcon,
  Gift,
  Phone,
  Layers,
  Star,
  HelpCircle,
  Shield,
  LogOut,
  Plus,
  Trash2,
  Edit3,
  Save,
  Download,
  Upload,
  RefreshCw,
  Search,
  CheckCircle2,
  ExternalLink,
  X,
  Camera,
  Image as ImgIcon,
  UploadCloud,
} from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { playTick, playChime } from '../utils/sound';
import { getAssetUrl } from '../utils/assets';

/**
 * Client-side high-quality image compressor
 * Converts large phone photos (10-20MB) into lightweight ~150KB Base64 data URLs
 * for instant loading and safe localStorage persistence
 */
function compressImage(file, maxDimension = 1200, quality = 0.85) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const ROOM_CATEGORIES = [
  { id: 'living', name: 'Хан Сарайы Зал' },
  { id: 'bedroom', name: 'Мастер-Спальня' },
  { id: 'kitchen', name: 'Корольдік Асхана' },
  { id: 'minimal', name: 'Заманауи Минимализм' },
  { id: 'erker', name: 'Эркер & Панорама' },
  { id: 'atelier', name: 'Зергерлік Ателье' },
];

export default function AdminDashboard({ onLogout, onReturnToSite }) {
  const {
    data,
    updateSiteSettings,
    updatePricing,
    updateVoucher,
    addProject,
    updateProject,
    deleteProject,
    updateFabric,
    addReview,
    updateReview,
    deleteReview,
    addFaq,
    updateFaq,
    deleteFaq,
    updateAdminPin,
    resetToDefaults,
    exportBackup,
    importBackup,
  } = useSiteData();

  const [activeTab, setActiveTab] = useState('overview');
  const [successToast, setSuccessToast] = useState('');

  // Toast trigger helper
  const showToast = (msg) => {
    setSuccessToast(msg);
    playChime(1100, 0.1);
    setTimeout(() => setSuccessToast(''), 3200);
  };

  // State for Project Form Modal
  const [editingProject, setEditingProject] = useState(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [projectSearch, setProjectSearch] = useState('');
  const [projectCatFilter, setProjectCatFilter] = useState('all');

  // Image Upload State
  const [imageTab, setImageTab] = useState('upload'); // 'upload' | 'presets' | 'url'
  const [isCompressing, setIsCompressing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Form State for new or editing project
  const [projForm, setProjForm] = useState({
    title: '',
    desc: '',
    badge: '',
    category: 'living',
    filename: 'curtain-palace-peacock-hall.jpg',
  });

  // Handle direct file selection & compression
  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Тек сурет файлдарын (JPG, PNG, WebP) жүктеуге болады!');
      return;
    }

    setIsCompressing(true);
    try {
      const compressedDataUrl = await compressImage(file, 1200, 0.85);
      setProjForm((prev) => ({ ...prev, filename: compressedDataUrl }));
      playTick(1200, 0.05);
    } catch (err) {
      console.error('Image upload failed:', err);
      alert('Суретті өңдеу сәтсіз аяқталды. Қайта көріңіз.');
    } finally {
      setIsCompressing(false);
      // Reset input value so re-selecting same file triggers onChange
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Тек сурет файлдарын жүктеуге болады!');
      return;
    }

    setIsCompressing(true);
    try {
      const compressedDataUrl = await compressImage(file, 1200, 0.85);
      setProjForm((prev) => ({ ...prev, filename: compressedDataUrl }));
      playTick(1200, 0.05);
    } catch (err) {
      console.error('Drop upload failed:', err);
    } finally {
      setIsCompressing(false);
    }
  };

  // Open Add Modal
  const handleOpenAdd = () => {
    setProjForm({
      title: '',
      desc: '',
      badge: 'Жаңа Жоба',
      category: 'living',
      filename: 'curtain-palace-peacock-hall.jpg',
    });
    setImageTab('upload');
    setIsAddingProject(true);
    setEditingProject(null);
  };

  // Open Edit Modal
  const handleOpenEdit = (p) => {
    setProjForm({
      title: p.title,
      desc: p.desc,
      badge: p.badge,
      category: p.category,
      filename: p.filename,
    });
    setImageTab(p.filename?.startsWith('data:') ? 'upload' : (p.filename?.startsWith('http') ? 'url' : 'presets'));
    setEditingProject(p);
    setIsAddingProject(false);
  };

  // Save Project (Add or Edit)
  const handleSaveProject = (e) => {
    e.preventDefault();
    if (editingProject) {
      updateProject(editingProject.index, projForm);
      showToast('Жоба сәтті жаңартылды!');
    } else {
      addProject(projForm);
      showToast('Жаңа жоба галереяға сәтті қосылды!');
    }
    setEditingProject(null);
    setIsAddingProject(false);
  };

  // State for Settings Forms
  const [settingsForm, setSettingsForm] = useState({ ...data.siteSettings });
  const [pricingForm, setPricingForm] = useState({ ...data.pricing });
  const [voucherForm, setVoucherForm] = useState({ ...data.voucher });
  const [pinForm, setPinForm] = useState({ newPin: '', confirmPin: '' });

  // Reviews state
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [reviewForm, setReviewForm] = useState({ author: '', location: '', text: '', tag: 'Жаңа Пікір' });

  // FAQ state
  const [isAddingFaq, setIsAddingFaq] = useState(false);
  const [faqForm, setFaqForm] = useState({ q: '', a: '' });

  // Filtered projects for the table
  const filteredProjects = data.projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(projectSearch.toLowerCase()) ||
      p.desc.toLowerCase().includes(projectSearch.toLowerCase()) ||
      p.num.includes(projectSearch);
    const matchesCat = projectCatFilter === 'all' || p.category === projectCatFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C1917] flex flex-col font-sans">
      {/* Toast Notification */}
      <AnimatePresence>
        {successToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-[100000] flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-[#0E8A42] text-white shadow-2xl text-xs font-semibold"
          >
            <CheckCircle2 size={18} />
            <span>{successToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-[#EAE2D2] px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-cinzel text-xl font-bold text-gold-gradient tracking-[0.2em]">INTEKS</span>
          <span className="h-4 w-px bg-[#E0D5C3]" />
          <span className="px-2.5 py-0.5 rounded-full bg-[#FAF5EC] border border-[#C5A059]/40 text-[#7A5714] text-[10px] font-mono uppercase tracking-wider font-bold">
            100% Басқару Панелі
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Return to website */}
          <button
            onClick={() => {
              playTick(800, 0.02);
              onReturnToSite();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF5EC] hover:bg-[#F2EAE0] border border-[#DFD3BF] text-xs font-semibold text-[#5C554B] hover:text-[#1C1917] transition-all"
          >
            <ExternalLink size={14} className="text-[#9E7728]" />
            <span>Сайтқа қайту (Көру)</span>
          </button>

          {/* Logout */}
          <button
            onClick={() => {
              playTick(600, 0.02);
              onLogout();
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-semibold transition-all"
            title="Шығу"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Шығу</span>
          </button>
        </div>
      </header>

      {/* Main Layout: Sidebar + Content */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 bg-white border-r border-[#EAE2D2] p-4 flex md:flex-col gap-1 overflow-x-auto md:overflow-x-visible shrink-0">
          {[
            { id: 'overview', label: 'Жалпы Шолу', icon: LayoutDashboard },
            { id: 'projects', label: `Галерея & Жобалар (${data.projects.length})`, icon: Images },
            { id: 'pricing', label: 'Калькулятор & Бағалар', icon: CalcIcon },
            { id: 'voucher', label: 'VIP Сертификат', icon: Gift },
            { id: 'contacts', label: 'Байланыс & Шоурум', icon: Phone },
            { id: 'fabrics', label: 'Маталар Зертханасы', icon: Layers },
            { id: 'reviews', label: `Пікірлер (${data.reviews.length})`, icon: Star },
            { id: 'faq', label: `Сұрақ-Жауап (${data.faqs.length})`, icon: HelpCircle },
            { id: 'security', label: 'Қауіпсіздік & Резерв', icon: Shield },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  playTick(900, 0.02);
                  setActiveTab(item.id);
                }}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap text-left ${
                  isActive
                    ? 'bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#987838] text-white shadow-md'
                    : 'text-[#5C554B] hover:text-[#1C1917] hover:bg-[#FAF6EE]'
                }`}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Workspace Body */}
        <main className="flex-1 p-6 sm:p-8 max-w-6xl overflow-y-auto">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h2 className="font-editorial text-3xl font-semibold text-[#1C1917]">Студия Басқару Шолуы</h2>
                <p className="text-xs text-[#6B6459] mt-1">
                  Сайттың нақты уақыттағы негізгі көрсеткіштері мен жедел басқару түймелері.
                </p>
              </div>

              {/* Quick Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-[#EAE2D2] shadow-xs">
                  <span className="text-[11px] font-mono text-[#787168] uppercase block mb-1">Белсенді Жобалар</span>
                  <div className="text-3xl font-editorial font-bold text-[#1C1917]">{data.projects.length}</div>
                  <div className="text-[11px] text-[#0E8A42] mt-1">✓ 100% кесілмей көрсетіледі</div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#EAE2D2] shadow-xs">
                  <span className="text-[11px] font-mono text-[#787168] uppercase block mb-1">Барқыт Бағасы</span>
                  <div className="text-3xl font-editorial font-bold text-gold-gradient">
                    {data.pricing.fabrics[0]?.rate?.toLocaleString('ru-RU')} ₸ / м
                  </div>
                  <div className="text-[11px] text-[#787168] mt-1">Калькулятор есебінде</div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#EAE2D2] shadow-xs">
                  <span className="text-[11px] font-mono text-[#787168] uppercase block mb-1">VIP Сертификат</span>
                  <div className="text-3xl font-editorial font-bold text-[#9E7728]">{data.voucher.discountAmount}</div>
                  <div className="text-[11px] text-[#787168] mt-1">Алғашқы 5 тапсырысқа</div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#EAE2D2] shadow-xs">
                  <span className="text-[11px] font-mono text-[#787168] uppercase block mb-1">Байланыс Нөмірі</span>
                  <div className="text-lg font-semibold text-[#1C1917] truncate mt-1">{data.siteSettings.phone}</div>
                  <div className="text-[11px] text-[#0E8A42] mt-1">WhatsApp қосылған</div>
                </div>
              </div>

              {/* Action Banner */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-white via-[#FCFAF5] to-[#F7F1E4] border-2 border-[#C5A059]/40 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="font-editorial text-2xl text-[#1C1917] font-semibold">Жаңа жоба қосқыңыз келе ме?</h3>
                  <p className="text-xs text-[#5C554B] mt-1 max-w-md">
                    Галереяға жаңа перде фотосын, атауын және сипаттамасын қосыңыз. Ол бірден 3D сахнаға және каталогқа шығады.
                  </p>
                </div>
                <button
                  onClick={() => {
                    handleOpenAdd();
                    setActiveTab('projects');
                  }}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#987838] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all"
                >
                  <Plus size={16} />
                  <span>Жаңа Жоба Қосу</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS MANAGEMENT */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-editorial text-3xl font-semibold text-[#1C1917]">Галерея Жобаларын Басқару</h2>
                  <p className="text-xs text-[#6B6459] mt-1">
                    Барлық {data.projects.length} жобаны өңдеу, жаңасын қосу немесе қажетсіздерін жою.
                  </p>
                </div>
                <button
                  onClick={handleOpenAdd}
                  className="flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#987838] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all self-start sm:self-auto"
                >
                  <Plus size={16} />
                  <span>Жаңа Жоба Қосу</span>
                </button>
              </div>

              {/* Search and Category Filters */}
              <div className="flex flex-col sm:flex-row items-center gap-3 p-3 rounded-2xl bg-white border border-[#EAE2D2]">
                <div className="relative flex-1 w-full">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#787168]" />
                  <input
                    type="text"
                    placeholder="Жоба атауы немесе № бойынша іздеу..."
                    value={projectSearch}
                    onChange={(e) => setProjectSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#E0D5C3] text-xs outline-none focus:border-[#9E7728]"
                  />
                </div>
                <select
                  value={projectCatFilter}
                  onChange={(e) => setProjectCatFilter(e.target.value)}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#E0D5C3] text-xs font-semibold outline-none focus:border-[#9E7728]"
                >
                  <option value="all">Барлық Бөлмелер ({data.projects.length})</option>
                  {ROOM_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Projects Table / Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredProjects.map((p) => (
                  <div
                    key={p.index}
                    className="p-4 rounded-2xl bg-white border border-[#EAE2D2] hover:border-[#C5A059] shadow-xs flex gap-4 items-center justify-between transition-all"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-16 h-20 rounded-xl overflow-hidden bg-[#FAF7F2] border border-[#DFD3BF] shrink-0">
                        <img
                          src={getAssetUrl(p.filename)}
                          alt={p.title}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.src = getAssetUrl('curtain-palace-peacock-hall.jpg');
                          }}
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-[#9E7728] font-bold">№{p.num}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FAF5EC] border border-[#E5DAC6] text-[#7A5714]">
                            {p.badge}
                          </span>
                        </div>
                        <h4 className="font-editorial text-base font-semibold text-[#1C1917] truncate mt-0.5">{p.title}</h4>
                        <p className="text-xs text-[#6B6459] line-clamp-1">{p.desc}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-2 rounded-xl bg-[#FAF5EC] hover:bg-[#F2EAE0] text-[#7A5714] transition-colors"
                        title="Өңдеу"
                      >
                        <Edit3 size={15} />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`№${p.num} «${p.title}» жобасын өшіргіңіз келетініне сенімдісіз бе?`)) {
                            deleteProject(p.index);
                            showToast('Жоба сәтті өшірілді');
                          }
                        }}
                        className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                        title="Жою"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PRICING & CALCULATOR */}
          {activeTab === 'pricing' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-editorial text-3xl font-semibold text-[#1C1917]">Калькулятор Бағаларын Басқару</h2>
                <p className="text-xs text-[#6B6459] mt-1">
                  Тұтынушылар калькуляторды қолданғанда осы бағалар негізінде есептеліп, WhatsApp-қа жіберіледі.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-[#EAE2D2] shadow-xs space-y-6">
                <h3 className="font-editorial text-xl font-semibold text-[#1C1917]">1. Негізгі Маталардың 1 метр бағасы (₸):</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pricingForm.fabrics?.map((fab, idx) => (
                    <div key={fab.id} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E0D5C3]">
                      <label className="block text-xs font-semibold text-[#1C1917] mb-1">{fab.label}:</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={fab.rate}
                          onChange={(e) => {
                            const newFabrics = [...pricingForm.fabrics];
                            newFabrics[idx].rate = parseInt(e.target.value) || 0;
                            setPricingForm({ ...pricingForm, fabrics: newFabrics });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-white border border-[#DFD3BF] text-sm font-mono font-bold text-[#7A5714]"
                        />
                        <span className="text-xs text-[#787168] font-mono">₸ / метр</span>
                      </div>
                    </div>
                  ))}
                </div>

                <h3 className="font-editorial text-xl font-semibold text-[#1C1917] pt-4 border-t border-[#EAE2D2]">
                  2. Қосымша Опциялар:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E0D5C3]">
                    <label className="block text-xs font-semibold text-[#1C1917] mb-1">Ақылды Электрокарниз:</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={pricingForm.smartMotorRate}
                        onChange={(e) =>
                          setPricingForm({ ...pricingForm, smartMotorRate: parseInt(e.target.value) || 0 })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-white border border-[#DFD3BF] text-sm font-mono font-bold text-[#7A5714]"
                      />
                      <span className="text-xs text-[#787168] font-mono">₸</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E0D5C3]">
                    <label className="block text-xs font-semibold text-[#1C1917] mb-1">Авторлық Құйма Подхват:</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={pricingForm.tiebacksRate}
                        onChange={(e) =>
                          setPricingForm({ ...pricingForm, tiebacksRate: parseInt(e.target.value) || 0 })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-white border border-[#DFD3BF] text-sm font-mono font-bold text-[#7A5714]"
                      />
                      <span className="text-xs text-[#787168] font-mono">₸</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E0D5C3]">
                    <label className="block text-xs font-semibold text-[#1C1917] mb-1">Ең төменгі тапсырыс құны:</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={pricingForm.minOrderRate}
                        onChange={(e) =>
                          setPricingForm({ ...pricingForm, minOrderRate: parseInt(e.target.value) || 0 })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-white border border-[#DFD3BF] text-sm font-mono font-bold text-[#7A5714]"
                      />
                      <span className="text-xs text-[#787168] font-mono">₸</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => {
                      updatePricing(pricingForm);
                      showToast('Калькулятор бағалары сәтті сақталды!');
                    }}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#987838] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all"
                  >
                    <Save size={15} />
                    <span>Бағаларды сақтау</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: VOUCHER */}
          {activeTab === 'voucher' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-editorial text-3xl font-semibold text-[#1C1917]">VIP Сертификат & Акция Баптаулары</h2>
                <p className="text-xs text-[#6B6459] mt-1">
                  Сайттағы жеңілдік сертификатының сомасы мен шарттарын өзгерту.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-[#EAE2D2] shadow-xs space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-[#1C1917] mb-1">Сертификат сомасы (Мәтін):</label>
                  <input
                    type="text"
                    value={voucherForm.discountAmount}
                    onChange={(e) => setVoucherForm({ ...voucherForm, discountAmount: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#DFD3BF] text-sm font-semibold text-[#7A5714]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1917] mb-1">Сертификат Тақырыбы:</label>
                  <input
                    type="text"
                    value={voucherForm.title}
                    onChange={(e) => setVoucherForm({ ...voucherForm, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#DFD3BF] text-sm text-[#1C1917]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1917] mb-1">Бейдж мәтіні:</label>
                  <input
                    type="text"
                    value={voucherForm.badge}
                    onChange={(e) => setVoucherForm({ ...voucherForm, badge: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#DFD3BF] text-sm text-[#1C1917]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1917] mb-1">Акция Сипаттамасы мен Шарты:</label>
                  <textarea
                    rows={3}
                    value={voucherForm.desc}
                    onChange={(e) => setVoucherForm({ ...voucherForm, desc: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#DFD3BF] text-sm text-[#5C554B]"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      updateVoucher(voucherForm);
                      showToast('VIP Сертификат мәндері сақталды!');
                    }}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#987838] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all"
                  >
                    <Save size={15} />
                    <span>Сертификатты сақтау</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: CONTACTS & SHOWROOM */}
          {activeTab === 'contacts' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-editorial text-3xl font-semibold text-[#1C1917]">Байланыс & Шоурум Баптаулары</h2>
                <p className="text-xs text-[#6B6459] mt-1">
                  Телефон, WhatsApp нөмірлері, салон мекенжайы және жұмыс уақыты.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-[#EAE2D2] shadow-xs space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1C1917] mb-1">Көрсетілетін Телефон:</label>
                    <input
                      type="text"
                      value={settingsForm.phone}
                      onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#DFD3BF] text-sm font-semibold text-[#1C1917]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                      WhatsApp нөмірі (тек сандармен):
                    </label>
                    <input
                      type="text"
                      value={settingsForm.whatsappNumber}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          whatsappNumber: e.target.value.replace(/\D/g, ''),
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#DFD3BF] text-sm font-mono text-[#0E8A42] font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1917] mb-1">Шоурум Мекенжайы:</label>
                  <input
                    type="text"
                    value={settingsForm.address}
                    onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#DFD3BF] text-sm text-[#1C1917]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1C1917] mb-1">Жұмыс Кестесі:</label>
                    <input
                      type="text"
                      value={settingsForm.workingHours}
                      onChange={(e) => setSettingsForm({ ...settingsForm, workingHours: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#DFD3BF] text-sm text-[#1C1917]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1C1917] mb-1">Instagram Аккаунты:</label>
                    <input
                      type="text"
                      value={settingsForm.instagram}
                      onChange={(e) => setSettingsForm({ ...settingsForm, instagram: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#DFD3BF] text-sm text-[#1C1917]"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      updateSiteSettings(settingsForm);
                      showToast('Байланыс деректері сақталды!');
                    }}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#987838] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all"
                  >
                    <Save size={15} />
                    <span>Байланыстарды сақтау</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: FABRICS LAB */}
          {activeTab === 'fabrics' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-editorial text-3xl font-semibold text-[#1C1917]">Маталар Зертханасы</h2>
                <p className="text-xs text-[#6B6459] mt-1">4 негізгі матаның сипаттамасы мен тығыздық параметрлері.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.fabrics.map((fab) => (
                  <div key={fab.id} className="p-6 rounded-3xl bg-white border border-[#EAE2D2] shadow-xs space-y-3">
                    <h3 className="font-editorial text-lg font-semibold text-[#1C1917]">{fab.title}</h3>
                    <div>
                      <label className="block text-[11px] font-mono text-[#787168] mb-1">Сипаттамасы:</label>
                      <textarea
                        rows={2}
                        defaultValue={fab.desc}
                        onBlur={(e) => {
                          updateFabric(fab.id, { desc: e.target.value });
                          showToast('Мата сипаттамасы жаңартылды');
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#DFD3BF] text-xs text-[#4A453D]"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-[10px] font-mono text-[#787168]">Тығыздығы:</label>
                        <input
                          type="text"
                          defaultValue={fab.density}
                          onBlur={(e) => {
                            updateFabric(fab.id, { density: e.target.value });
                            showToast('Тығыздығы жаңартылды');
                          }}
                          className="w-full px-2 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#DFD3BF] text-xs font-semibold text-[#7A5714]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-[#787168]">Жарық жұту:</label>
                        <input
                          type="text"
                          defaultValue={fab.blockage}
                          onBlur={(e) => {
                            updateFabric(fab.id, { blockage: e.target.value });
                            showToast('Параметр жаңартылды');
                          }}
                          className="w-full px-2 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#DFD3BF] text-xs font-semibold text-[#1C1917]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-[#787168]">Шыққан жері:</label>
                        <input
                          type="text"
                          defaultValue={fab.origin}
                          onBlur={(e) => {
                            updateFabric(fab.id, { origin: e.target.value });
                            showToast('Шыққан жері жаңартылды');
                          }}
                          className="w-full px-2 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#DFD3BF] text-xs font-semibold text-[#9E7728]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-editorial text-3xl font-semibold text-[#1C1917]">Тұтынушылар Пікірлері</h2>
                  <p className="text-xs text-[#6B6459] mt-1">Сайттағы шынайы тұтынушылардың лебіздерін басқару.</p>
                </div>
                <button
                  onClick={() => setIsAddingReview(!isAddingReview)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#987838] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all"
                >
                  <Plus size={15} />
                  <span>Жаңа Пікір Қосу</span>
                </button>
              </div>

              {/* Add review inline form */}
              {isAddingReview && (
                <div className="p-6 rounded-3xl bg-[#FAF5EC] border border-[#C5A059]/60 shadow-sm space-y-4">
                  <h3 className="font-editorial text-lg font-semibold text-[#1C1917]">Жаңа пікір қосу:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="Тұтынушы аты (мысалы: Айгүл ханым)"
                      value={reviewForm.author}
                      onChange={(e) => setReviewForm({ ...reviewForm, author: e.target.value })}
                      className="px-3 py-2 rounded-xl bg-white border border-[#DFD3BF] text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Қала / Мекенжай (мысалы: Шымкент)"
                      value={reviewForm.location}
                      onChange={(e) => setReviewForm({ ...reviewForm, location: e.target.value })}
                      className="px-3 py-2 rounded-xl bg-white border border-[#DFD3BF] text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Тег (мысалы: Сарайлық Зал)"
                      value={reviewForm.tag}
                      onChange={(e) => setReviewForm({ ...reviewForm, tag: e.target.value })}
                      className="px-3 py-2 rounded-xl bg-white border border-[#DFD3BF] text-xs"
                    />
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Пікір мәтіні..."
                    value={reviewForm.text}
                    onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DFD3BF] text-xs"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setIsAddingReview(false)}
                      className="px-4 py-2 rounded-full bg-white border border-[#DFD3BF] text-xs font-semibold"
                    >
                      Бас тарту
                    </button>
                    <button
                      onClick={() => {
                        if (!reviewForm.author || !reviewForm.text) return;
                        addReview(reviewForm);
                        setIsAddingReview(false);
                        setReviewForm({ author: '', location: '', text: '', tag: 'Жаңа' });
                        showToast('Пікір сәтті қосылды!');
                      }}
                      className="px-5 py-2 rounded-full bg-[#0E8A42] text-white text-xs font-bold"
                    >
                      Қосу
                    </button>
                  </div>
                </div>
              )}

              {/* Reviews List */}
              <div className="space-y-4">
                {data.reviews.map((r) => (
                  <div
                    key={r.id}
                    className="p-5 rounded-2xl bg-white border border-[#EAE2D2] flex flex-col sm:flex-row justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-editorial text-base font-semibold text-[#1C1917]">{r.author}</span>
                        <span className="text-[11px] text-[#787168]">({r.location})</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FAF5EC] border border-[#E5DAC6] text-[#7A5714]">
                          {r.tag}
                        </span>
                      </div>
                      <p className="text-xs text-[#5C554B] italic mt-2">«{r.text}»</p>
                    </div>
                    <button
                      onClick={() => {
                        deleteReview(r.id);
                        showToast('Пікір өшірілді');
                      }}
                      className="self-end sm:self-center p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: FAQ */}
          {activeTab === 'faq' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-editorial text-3xl font-semibold text-[#1C1917]">Жиі Қойылатын Сұрақтар (FAQ)</h2>
                  <p className="text-xs text-[#6B6459] mt-1">Клиенттердің сауалдарына дайын жауаптарды басқару.</p>
                </div>
                <button
                  onClick={() => setIsAddingFaq(!isAddingFaq)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#987838] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all"
                >
                  <Plus size={15} />
                  <span>Жаңа Сұрақ Қосу</span>
                </button>
              </div>

              {/* Add FAQ inline */}
              {isAddingFaq && (
                <div className="p-6 rounded-3xl bg-[#FAF5EC] border border-[#C5A059]/60 shadow-sm space-y-4">
                  <h3 className="font-editorial text-lg font-semibold text-[#1C1917]">Жаңа сұрақ-жауап:</h3>
                  <input
                    type="text"
                    placeholder="Сұрақты жазыңыз..."
                    value={faqForm.q}
                    onChange={(e) => setFaqForm({ ...faqForm, q: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#DFD3BF] text-xs font-semibold"
                  />
                  <textarea
                    rows={3}
                    placeholder="Жауабын жазыңыз..."
                    value={faqForm.a}
                    onChange={(e) => setFaqForm({ ...faqForm, a: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DFD3BF] text-xs"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setIsAddingFaq(false)}
                      className="px-4 py-2 rounded-full bg-white border border-[#DFD3BF] text-xs font-semibold"
                    >
                      Бас тарту
                    </button>
                    <button
                      onClick={() => {
                        if (!faqForm.q || !faqForm.a) return;
                        addFaq(faqForm);
                        setIsAddingFaq(false);
                        setFaqForm({ q: '', a: '' });
                        showToast('Сұрақ-жауап сәтті қосылды!');
                      }}
                      className="px-5 py-2 rounded-full bg-[#0E8A42] text-white text-xs font-bold"
                    >
                      Қосу
                    </button>
                  </div>
                </div>
              )}

              {/* FAQ List */}
              <div className="space-y-4">
                {data.faqs.map((f) => (
                  <div key={f.id} className="p-5 rounded-2xl bg-white border border-[#EAE2D2] space-y-2">
                    <div className="flex items-center justify-between gap-4">
                      <h4 className="font-editorial text-lg font-semibold text-[#1C1917]">{f.q}</h4>
                      <button
                        onClick={() => {
                          deleteFaq(f.id);
                          showToast('Сұрақ өшірілді');
                        }}
                        className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 shrink-0"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <p className="text-xs text-[#5C554B] leading-relaxed">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: SECURITY & BACKUP */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-editorial text-3xl font-semibold text-[#1C1917]">Қауіпсіздік & Резервтік Көшірме</h2>
                <p className="text-xs text-[#6B6459] mt-1">
                  Админ PIN кодын өзгерту және сайт деректерін файлға сақтау / қалпына келтіру.
                </p>
              </div>

              {/* Change PIN Box */}
              <div className="p-6 rounded-3xl bg-white border border-[#EAE2D2] shadow-xs space-y-4">
                <h3 className="font-editorial text-xl font-semibold text-[#1C1917]">1. Әкімші PIN кодын ауыстыру</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1C1917] mb-1">Жаңа PIN код:</label>
                    <input
                      type="password"
                      placeholder="Жаңа құпиясөз..."
                      value={pinForm.newPin}
                      onChange={(e) => setPinForm({ ...pinForm, newPin: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#DFD3BF] text-sm font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1C1917] mb-1">Растау:</label>
                    <input
                      type="password"
                      placeholder="Қайталап теріңіз..."
                      value={pinForm.confirmPin}
                      onChange={(e) => setPinForm({ ...pinForm, confirmPin: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#DFD3BF] text-sm font-mono"
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (!pinForm.newPin || pinForm.newPin.length < 4) {
                      alert('PIN код кемінде 4 таңбалы болуы керек!');
                      return;
                    }
                    if (pinForm.newPin !== pinForm.confirmPin) {
                      alert('PIN кодтар сәйкес келмеді!');
                      return;
                    }
                    updateAdminPin(pinForm.newPin);
                    setPinForm({ newPin: '', confirmPin: '' });
                    showToast('PIN код сәтті өзгертілді!');
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#1C1917] hover:bg-[#333] text-white font-bold text-xs uppercase tracking-wider shadow-sm"
                >
                  PIN кодты сақтау
                </button>
              </div>

              {/* Backup & Restore */}
              <div className="p-6 rounded-3xl bg-white border border-[#EAE2D2] shadow-xs space-y-4">
                <h3 className="font-editorial text-xl font-semibold text-[#1C1917]">2. Резервтік Көшірме (JSON)</h3>
                <p className="text-xs text-[#5C554B]">
                  Сайттағы барлық 60 жобаны, бағаларды, мәтіндерді толық JSON файл түрінде компьютеріңізге жүктеп
                  алыңыз немесе бұрынғы көшірмені кері жүктеңіз:
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <button
                    onClick={exportBackup}
                    className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#FAF5EC] hover:bg-[#F2EAE0] border border-[#DFD3BF] text-xs font-bold text-[#7A5714]"
                  >
                    <Download size={16} />
                    <span>Барлық деректерді JSON файлға сақтау</span>
                  </button>

                  <label className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#FAF5EC] hover:bg-[#F2EAE0] border border-[#DFD3BF] text-xs font-bold text-[#5C554B] cursor-pointer">
                    <Upload size={16} />
                    <span>JSON файлдан қалпына келтіру</span>
                    <input
                      type="file"
                      accept=".json"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          const success = importBackup(event.target?.result);
                          if (success) {
                            showToast('Деректер файлдан сәтті қалпына келтірілді!');
                          } else {
                            alert('Файлды оқу мүмкін болмады! Дұрыс JSON файлын таңдаңыз.');
                          }
                        };
                        reader.readAsText(file);
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* Reset to Factory Defaults */}
              <div className="p-6 rounded-3xl bg-red-50/60 border border-red-200 shadow-xs space-y-3">
                <h3 className="font-editorial text-xl font-semibold text-red-700">3. Бастапқы Қалпына Қайтару (Reset)</h3>
                <p className="text-xs text-red-600">
                  Барлық өзгертулерді өшіріп, сайттың 60 ресми жобасы мен бастапқы бағаларын қайта қалпына келтіру.
                </p>
                <button
                  onClick={() => {
                    if (confirm('Шынымен де барлық параметрлерді бастапқы ресми күйіне қайтарғыңыз келе ме?')) {
                      resetToDefaults();
                      showToast('Сайт бастапқы күйіне қайтарылды!');
                    }
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm"
                >
                  <RefreshCw size={14} />
                  <span>Әдепкі қалпына келтіру</span>
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* PROJECT ADD/EDIT MODAL */}
      <AnimatePresence>
        {(isAddingProject || editingProject) && (
          <div className="fixed inset-0 z-[100001] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-xl w-full rounded-3xl bg-white border-2 border-[#C5A059] p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <button
                onClick={() => {
                  setIsAddingProject(false);
                  setEditingProject(null);
                }}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 text-[#787168]"
              >
                <X size={20} />
              </button>

              <h3 className="font-editorial text-2xl font-semibold text-[#1C1917] mb-4">
                {editingProject ? `№${editingProject.num} Жобаны Өңдеу` : 'Жаңа Перде Жобасын Қосу'}
              </h3>

              <form onSubmit={handleSaveProject} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold mb-1">Жоба Атауы:</label>
                  <input
                    type="text"
                    required
                    value={projForm.title}
                    onChange={(e) => setProjForm({ ...projForm, title: e.target.value })}
                    placeholder="Мысалы: Хан Сарайы Барокко Жаккард"
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#DFD3BF] text-sm"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Бөлме Категориясы:</label>
                  <select
                    value={projForm.category}
                    onChange={(e) => setProjForm({ ...projForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#DFD3BF] text-xs font-semibold"
                  >
                    {ROOM_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Бейдж / Белгі:</label>
                  <input
                    type="text"
                    value={projForm.badge}
                    onChange={(e) => setProjForm({ ...projForm, badge: e.target.value })}
                    placeholder="Мысалы: Қонақ бөлме // Сарайлық"
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#DFD3BF] text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1.5 text-xs text-[#1C1917] flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Camera size={14} className="text-[#9E7728]" />
                      <span>Жобаның Суреті (Файл / Галерея):</span>
                    </span>
                    {projForm.filename && (
                      <span className="text-[10px] text-[#0E8A42] font-mono font-medium flex items-center gap-1">
                        <CheckCircle2 size={12} /> Сурет таңдалды
                      </span>
                    )}
                  </label>

                  {/* Hidden file input for native camera / phone gallery / file browser */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />

                  {/* Three Source Modes */}
                  <div className="flex rounded-xl bg-[#FAF6EE] p-1 border border-[#DFD3BF] mb-3 text-[11px] font-medium">
                    <button
                      type="button"
                      onClick={() => setImageTab('upload')}
                      className={`flex-1 py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                        imageTab === 'upload'
                          ? 'bg-white text-[#1C1917] font-bold shadow-xs'
                          : 'text-[#787168] hover:text-[#1C1917]'
                      }`}
                    >
                      <UploadCloud size={13} className="text-[#9E7728]" />
                      <span>Сурет жүктеу</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageTab('presets')}
                      className={`flex-1 py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                        imageTab === 'presets'
                          ? 'bg-white text-[#1C1917] font-bold shadow-xs'
                          : 'text-[#787168] hover:text-[#1C1917]'
                      }`}
                    >
                      <ImgIcon size={13} className="text-[#9E7728]" />
                      <span>Дайын үлгілерден</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageTab('url')}
                      className={`flex-1 py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                        imageTab === 'url'
                          ? 'bg-white text-[#1C1917] font-bold shadow-xs'
                          : 'text-[#787168] hover:text-[#1C1917]'
                      }`}
                    >
                      <span>URL сілтеме</span>
                    </button>
                  </div>

                  {/* TAB 1: Direct File Upload & Drag-and-Drop */}
                  {imageTab === 'upload' && (
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`relative rounded-2xl border-2 border-dashed p-6 text-center cursor-pointer transition-all ${
                        isDragging
                          ? 'border-[#0E8A42] bg-emerald-50 scale-[1.01]'
                          : 'border-[#C5A059]/60 bg-[#FCFAF6] hover:bg-[#F9F5EC] hover:border-[#9E7728]'
                      }`}
                    >
                      {isCompressing ? (
                        <div className="py-4 flex flex-col items-center justify-center gap-2">
                          <RefreshCw size={24} className="text-[#9E7728] animate-spin" />
                          <span className="text-xs font-semibold text-[#7A5714]">
                            Сурет өңделуде & оңтайландырылуда...
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-2">
                          <div className="w-12 h-12 rounded-2xl bg-[#FAF5EC] border border-[#DFD3BF] flex items-center justify-center text-[#9E7728] shadow-xs">
                            <Camera size={24} />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-[#1C1917] block">
                              📁 Телефоннан немесе компьютерден сурет таңдау
                            </span>
                            <span className="text-[11px] text-[#787168] block mt-0.5">
                              Басып галереяны ашыңыз немесе фотоны осы жерге сүйреп әкеліңіз
                            </span>
                          </div>
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-[#DFD3BF] text-[10px] font-mono text-[#9E7728] font-semibold mt-1">
                            JPG, PNG, WebP • Автоматты сапа сақталады
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 2: Presets from existing salon library */}
                  {imageTab === 'presets' && (
                    <div className="p-3 rounded-2xl bg-[#FCFAF6] border border-[#DFD3BF]">
                      <span className="text-[10px] uppercase font-mono font-semibold text-[#787168] block mb-2">
                        Салон қорындағы дайын үлгілердің бірін шертіп таңдаңыз:
                      </span>
                      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-48 overflow-y-auto p-1">
                        {data.projects.slice(0, 18).map((p) => {
                          const isSelected = projForm.filename === p.filename;
                          return (
                            <button
                              key={p.index}
                              type="button"
                              onClick={() => setProjForm({ ...projForm, filename: p.filename })}
                              className={`relative rounded-xl overflow-hidden aspect-3/4 border-2 transition-all bg-white ${
                                isSelected
                                  ? 'border-[#0E8A42] ring-2 ring-[#0E8A42]/30 scale-95'
                                  : 'border-[#DFD3BF] hover:border-[#9E7728]'
                              }`}
                            >
                              <img
                                src={getAssetUrl(p.filename)}
                                alt={p.title}
                                className="w-full h-full object-cover"
                              />
                              {isSelected && (
                                <div className="absolute inset-0 bg-emerald-500/25 flex items-center justify-center">
                                  <CheckCircle2 size={18} className="text-white drop-shadow-md" />
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* TAB 3: URL manual input */}
                  {imageTab === 'url' && (
                    <div>
                      <input
                        type="text"
                        value={projForm.filename}
                        onChange={(e) => setProjForm({ ...projForm, filename: e.target.value })}
                        placeholder="https://example.com/curtain.jpg"
                        className="w-full px-3 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#DFD3BF] text-xs font-mono"
                      />
                      <p className="text-[10px] text-[#787168] mt-1">
                        Егер суретіңіз интернетте болса, сілтемесін осында қойыңыз.
                      </p>
                    </div>
                  )}

                  {/* Live Image Preview Card */}
                  {projForm.filename && (
                    <div className="mt-3 p-3 rounded-2xl bg-white border border-[#EAE2D2] shadow-xs flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-14 h-16 rounded-xl overflow-hidden bg-[#FAF7F2] border border-[#C5A059] shrink-0 flex items-center justify-center">
                          <img
                            src={getAssetUrl(projForm.filename)}
                            alt="Алдын ала қарау"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="min-w-0">
                          <span className="text-[10px] font-mono text-[#0E8A42] font-semibold flex items-center gap-1">
                            <CheckCircle2 size={12} /> Таңдалған сурет белсенді
                          </span>
                          <p className="text-[11px] font-mono text-[#5C554B] truncate max-w-[220px]">
                            {projForm.filename.startsWith('data:')
                              ? 'Жаңа жүктелген файл (Оңтайландырылған)'
                              : projForm.filename}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-2.5 py-1.5 rounded-lg bg-[#FAF5EC] hover:bg-[#F2E8D7] border border-[#DFD3BF] text-[10px] font-semibold text-[#7A5714] transition-colors"
                        >
                          Ауыстыру
                        </button>
                        <button
                          type="button"
                          onClick={() => setProjForm({ ...projForm, filename: '' })}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Өшіру"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block font-semibold mb-1">Сипаттамасы:</label>
                  <textarea
                    rows={3}
                    required
                    value={projForm.desc}
                    onChange={(e) => setProjForm({ ...projForm, desc: e.target.value })}
                    placeholder="Матасы мен ерекшелігі туралы толық мәлімет..."
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#DFD3BF] text-xs"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingProject(false);
                      setEditingProject(null);
                    }}
                    className="px-5 py-2.5 rounded-full bg-white border border-[#DFD3BF] font-semibold"
                  >
                    Бас тарту
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#987838] text-white font-bold uppercase tracking-wider shadow-md"
                  >
                    Сақтау
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
