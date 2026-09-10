import { useState, useEffect } from 'react';
import { SiteDataProvider, useSiteData } from './context/SiteDataContext';
import LuxuryBackground from './components/LuxuryBackground';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SmartSimulator from './components/SmartSimulator';
import BeforeAfter from './components/BeforeAfter';
import Gallery from './components/Gallery';
import FabricsLab from './components/FabricsLab';
import Calculator from './components/Calculator';
import Voucher from './components/Voucher';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import Showroom from './components/Showroom';
import LightboxModal from './components/LightboxModal';
import FloatingDock from './components/FloatingDock';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';

import { preloadAllProjectsProgressive } from './utils/imageOptimizer';

function MainWebsite() {
  const { data } = useSiteData();
  const [selectedProject, setSelectedProject] = useState(null);

  // Pre-warm memory cache with all project images during idle time
  useEffect(() => {
    if (data?.projects?.length > 0) {
      preloadAllProjectsProgressive(data.projects);
    }
  }, [data?.projects]);

  const handlePrev = () => {
    if (!selectedProject || !data.projects.length) return;
    const currentIndex = data.projects.findIndex((p) => p.index === selectedProject.index);
    const prevIndex = (currentIndex - 1 + data.projects.length) % data.projects.length;
    setSelectedProject(data.projects[prevIndex]);
  };

  const handleNext = () => {
    if (!selectedProject || !data.projects.length) return;
    const currentIndex = data.projects.findIndex((p) => p.index === selectedProject.index);
    const nextIndex = (currentIndex + 1) % data.projects.length;
    setSelectedProject(data.projects[nextIndex]);
  };

  return (
    <div className="min-h-screen relative bg-[#FAF7F2] text-[#2C2723] font-sans selection:bg-[#C5A059] selection:text-white">
      {/* World-Class Living Luxury Ivory Ambient Background */}
      <LuxuryBackground />

      {/* Foreground Content */}
      <div className="relative z-10">
        {/* Custom Fluid Cursor */}
        <Cursor />

        {/* Floating Glass Navigation */}
        <Navbar />

        {/* Hero Section with 3D Showcase & Kinetic Typography */}
        <Hero />

        {/* 21st.dev Style Interactive Smart Cornice Simulator */}
        <SmartSimulator />

        {/* Interactive Before / After Split Slider */}
        <BeforeAfter />

        {/* 60 Project Bento Gallery with Instant Search & Lightbox */}
        <Gallery onSelectProject={setSelectedProject} />

        {/* Sensory Fabrics & Textile Laboratory */}
        <FabricsLab />

        {/* Intelligent Interactive Cost Calculator */}
        <Calculator />

        {/* Holographic 15 000 ₸ Certificate with Countdown & Confetti */}
        <Voucher />

        {/* Social Proof & Verified Reviews */}
        <Reviews />

        {/* Interactive FAQ Accordion */}
        <FAQ />

        {/* Showroom & Location Map */}
        <Showroom />

        {/* Luxury Footer */}
        <footer className="py-14 border-t border-[#EAE2D2] bg-white/70 backdrop-blur-md text-center text-xs text-[#787168] pb-28 sm:pb-32">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="font-cinzel tracking-[0.25em] text-gold-gradient font-bold text-lg">INTEKS</span>
              <span className="text-[11px] text-[#8C8275] uppercase tracking-wider font-mono">Шымкент • Түркістан • Қызылорда</span>
            </div>
            <p className="text-[11px] text-[#7A7368]">
              © {new Date().getFullYear()} {data.siteSettings.salonName}. Барлық құқықтар қорғалған. Ресми тіркелген люкс сауда белгісі.
            </p>
            <div className="flex items-center gap-6 text-[11px] font-semibold text-[#5A544B]">
              <a href="#catalog" className="hover:text-[#9E7728] transition-colors">Каталог</a>
              <a href="#simulator" className="hover:text-[#9E7728] transition-colors">Ақылды карниз</a>
              <a href="#calculator" className="hover:text-[#9E7728] transition-colors">Баға есептеу</a>
              <a href="#contacts" className="hover:text-[#9E7728] transition-colors">Шоурум</a>
            </div>
          </div>
        </footer>

        {/* Floating Dock (Mac/iOS Dynamic Island Style) */}
        <FloatingDock />

        {/* Fullscreen High-Res Lightbox Modal */}
        <LightboxModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </div>
    </div>
  );
}

function AppController() {
  const [isAdminOpen, setIsAdminOpen] = useState(() => {
    return (
      window.location.hash === '#admin' ||
      window.location.hash === '#inteks-admin' ||
      window.location.search.includes('admin=true')
    );
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('inteks_admin_auth') === 'true';
  });

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#admin' || window.location.hash === '#inteks-admin') {
        setIsAdminOpen(true);
      }
    };

    // Global hidden shortcut: Ctrl + Shift + A (or Cmd + Shift + A)
    const handleKeyDown = (e) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey &&
        (e.key === 'A' || e.key === 'a' || e.key === 'Ф' || e.key === 'ф')
      ) {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };

    const handleCustomEvent = () => {
      setIsAdminOpen(true);
    };

    window.addEventListener('hashchange', handleHash);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('openInteksAdmin', handleCustomEvent);

    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('openInteksAdmin', handleCustomEvent);
    };
  }, []);

  // Handle closing admin
  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    if (window.location.hash === '#admin' || window.location.hash === '#inteks-admin') {
      history.replaceState(null, '', window.location.pathname);
    }
  };

  // Handle logging out
  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('inteks_admin_auth');
    handleCloseAdmin();
  };

  // If Admin view is triggered:
  if (isAdminOpen) {
    if (!isAuthenticated) {
      return (
        <AdminLogin
          onLoginSuccess={() => {
            setIsAuthenticated(true);
            sessionStorage.setItem('inteks_admin_auth', 'true');
          }}
          onClose={handleCloseAdmin}
        />
      );
    }
    return (
      <AdminDashboard
        onLogout={handleLogout}
        onReturnToSite={handleCloseAdmin}
      />
    );
  }

  // Normal Public Site
  return <MainWebsite />;
}

export default function App() {
  return (
    <SiteDataProvider>
      <AppController />
    </SiteDataProvider>
  );
}