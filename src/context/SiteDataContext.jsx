import { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_SITE_DATA } from '../data/defaultSiteData';

const STORAGE_KEY = 'inteks_site_data_v1';

const SiteDataContext = createContext(null);

export function SiteDataProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Shallow merge to ensure any newly added keys are retained
        return {
          ...DEFAULT_SITE_DATA,
          ...parsed,
          admin: { ...DEFAULT_SITE_DATA.admin, ...parsed.admin },
          siteSettings: { ...DEFAULT_SITE_DATA.siteSettings, ...parsed.siteSettings },
          pricing: { ...DEFAULT_SITE_DATA.pricing, ...parsed.pricing },
          voucher: { ...DEFAULT_SITE_DATA.voucher, ...parsed.voucher },
        };
      }
    } catch (err) {
      console.warn('Failed to parse saved site data, falling back to default:', err);
    }
    return DEFAULT_SITE_DATA;
  });

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      console.error('Failed to save site data to localStorage:', err);
    }
  }, [data]);

  // 1. General Site Settings
  const updateSiteSettings = (newSettings) => {
    setData((prev) => ({
      ...prev,
      siteSettings: { ...prev.siteSettings, ...newSettings },
    }));
  };

  // 2. Pricing & Calculator
  const updatePricing = (newPricing) => {
    setData((prev) => ({
      ...prev,
      pricing: { ...prev.pricing, ...newPricing },
    }));
  };

  // 3. Voucher & Promotion
  const updateVoucher = (newVoucher) => {
    setData((prev) => ({
      ...prev,
      voucher: { ...prev.voucher, ...newVoucher },
    }));
  };

  // 4. Projects (Gallery)
  const addProject = (project) => {
    setData((prev) => {
      const newIndex = (prev.projects.length ? Math.max(...prev.projects.map((p) => p.index || 0)) : 0) + 1;
      const numFormatted = String(newIndex).padStart(2, '0');
      const newProj = {
        index: newIndex,
        num: numFormatted,
        filename: project.filename || 'curtain-palace-peacock-hall.jpg',
        title: project.title || 'Жаңа Авторлық Перде',
        desc: project.desc || 'INTEKS ательесінің жаңа жобасы.',
        badge: project.badge || 'Люкс Перде',
        category: project.category || 'living',
        ...project,
      };
      return {
        ...prev,
        projects: [newProj, ...prev.projects],
      };
    });
  };

  const updateProject = (index, updated) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.index === index ? { ...p, ...updated } : p)),
    }));
  };

  const deleteProject = (index) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.index !== index),
    }));
  };

  // 5. Fabrics Lab
  const updateFabric = (fabricId, updated) => {
    setData((prev) => ({
      ...prev,
      fabrics: prev.fabrics.map((f) => (f.id === fabricId ? { ...f, ...updated } : f)),
    }));
  };

  // 6. Reviews
  const addReview = (review) => {
    setData((prev) => ({
      ...prev,
      reviews: [{ id: 'r_' + Date.now(), rating: 5, ...review }, ...prev.reviews],
    }));
  };

  const updateReview = (reviewId, updated) => {
    setData((prev) => ({
      ...prev,
      reviews: prev.reviews.map((r) => (r.id === reviewId ? { ...r, ...updated } : r)),
    }));
  };

  const deleteReview = (reviewId) => {
    setData((prev) => ({
      ...prev,
      reviews: prev.reviews.filter((r) => r.id !== reviewId),
    }));
  };

  // 7. FAQ
  const addFaq = (faq) => {
    setData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { id: 'faq_' + Date.now(), ...faq }],
    }));
  };

  const updateFaq = (faqId, updated) => {
    setData((prev) => ({
      ...prev,
      faqs: prev.faqs.map((item) => (item.id === faqId ? { ...item, ...updated } : item)),
    }));
  };

  const deleteFaq = (faqId) => {
    setData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((item) => item.id !== faqId),
    }));
  };

  // 8. Admin PIN
  const updateAdminPin = (newPin) => {
    setData((prev) => ({
      ...prev,
      admin: { ...prev.admin, pin: newPin },
    }));
  };

  // 9. Reset to original defaults
  const resetToDefaults = () => {
    setData(DEFAULT_SITE_DATA);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn(e);
    }
  };

  // 10. Backup & Restore
  const exportBackup = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `inteks-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importBackup = (jsonData) => {
    try {
      const parsed = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
      setData({
        ...DEFAULT_SITE_DATA,
        ...parsed,
      });
      return true;
    } catch (err) {
      console.error('Import error:', err);
      return false;
    }
  };

  return (
    <SiteDataContext.Provider
      value={{
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
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
}
