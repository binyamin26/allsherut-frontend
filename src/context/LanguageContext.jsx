import { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { loadLanguage } from '../i18n';

const LanguageContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// ─── Helpers ────────────────────────────────────────────────────────────────

const RTL_LANGS = ['he', 'ar'];
const getDirection = (lang) => (RTL_LANGS.includes(lang) ? 'rtl' : 'ltr');

const applyDirection = (lang, dir) => {
  document.documentElement.dir = dir;
  document.documentElement.lang = lang;
  document.body.dir = dir;
  document.documentElement.style.setProperty('--direction', dir);
  document.documentElement.style.setProperty('--text-align', dir === 'rtl' ? 'right' : 'left');
  document.documentElement.style.setProperty('--text-align-start', dir === 'rtl' ? 'right' : 'left');
  document.documentElement.style.setProperty('--text-align-end', dir === 'rtl' ? 'left' : 'right');
};

// ─── Provider ────────────────────────────────────────────────────────────────
// By the time this renders, i18next is initialized with the saved language
// (main.jsx waits for i18nInitPromise before calling root.render).

export const LanguageProvider = ({ children }) => {
  const { t: i18nT, i18n: i18nInstance } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18nInstance.language || 'he');

  // Apply direction on mount
  useEffect(() => {
    const lang = i18nInstance.language || 'he';
    applyDirection(lang, getDirection(lang));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // React to language switches (fires after new language is loaded and active)
  useEffect(() => {
    const onLanguageChanged = (lang) => {
      setCurrentLanguage(lang);
      applyDirection(lang, getDirection(lang));
      localStorage.setItem('homesherut_language', lang);
    };
    i18nInstance.on('languageChanged', onLanguageChanged);
    return () => i18nInstance.off('languageChanged', onLanguageChanged);
  }, [i18nInstance]);

  // Load the language bundle (if needed) then switch — lazy loading for en/fr/ru
  const switchLanguage = async (lang) => {
    await loadLanguage(lang); // no-op if already loaded or Hebrew
    i18nInstance.changeLanguage(lang);
  };

  // Intercept the CustomEvent fired by LanguageSelector.jsx
  useEffect(() => {
    const handler = (event) => {
      const lang = event.detail?.language;
      if (lang) switchLanguage(lang);
    };
    window.addEventListener('languageChanged', handler);
    return () => window.removeEventListener('languageChanged', handler);
  }, [i18nInstance]); // eslint-disable-line react-hooks/exhaustive-deps

  const changeLanguage = (langCode) => {
    switchLanguage(langCode);
  };

  // Bridge the same t() API as before:
  //   t('key')                — plain lookup
  //   t('key', 'fallback')    — returns fallback if key not found
  //   t('key', { count: 42 }) — interpolates {count} in the string
  const t = (key, paramsOrFallback = null) => {
    if (typeof paramsOrFallback === 'string') {
      return i18nT(key, { defaultValue: paramsOrFallback });
    } else if (paramsOrFallback && typeof paramsOrFallback === 'object') {
      return i18nT(key, paramsOrFallback);
    } else {
      return i18nT(key);
    }
  };

  const direction = getDirection(currentLanguage);

  const value = {
    t,
    currentLanguage,
    language: currentLanguage,
    direction,
    isRTL: direction === 'rtl',
    changeLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
