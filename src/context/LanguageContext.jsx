import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const RTL_LANGS = ['he', 'ar'];

const applyDirection = (lang, dir) => {
  document.documentElement.dir = dir;
  document.documentElement.lang = lang;
  document.body.dir = dir;
  document.documentElement.style.setProperty('--direction', dir);
  document.documentElement.style.setProperty('--text-align', dir === 'rtl' ? 'right' : 'left');
  document.documentElement.style.setProperty('--text-align-start', dir === 'rtl' ? 'right' : 'left');
  document.documentElement.style.setProperty('--text-align-end', dir === 'rtl' ? 'left' : 'right');
};

const getDirection = (lang) => RTL_LANGS.includes(lang) ? 'rtl' : 'ltr';

export const LanguageProvider = ({ children }) => {
  const { t: i18nT, i18n: i18nInstance } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18nInstance.language || 'he');

  // Apply direction on mount and on language change
  useEffect(() => {
    const handleLanguageChanged = (lang) => {
      setCurrentLanguage(lang);
      applyDirection(lang, getDirection(lang));
      localStorage.setItem('homesherut_language', lang);
    };

    // Apply immediately on mount
    applyDirection(currentLanguage, getDirection(currentLanguage));

    i18nInstance.on('languageChanged', handleLanguageChanged);
    return () => i18nInstance.off('languageChanged', handleLanguageChanged);
  }, [i18nInstance, currentLanguage]);

  // Intercept the CustomEvent fired by LanguageSelector.jsx
  useEffect(() => {
    const handler = (event) => {
      const lang = event.detail?.language;
      if (lang) i18nInstance.changeLanguage(lang);
    };
    window.addEventListener('languageChanged', handler);
    return () => window.removeEventListener('languageChanged', handler);
  }, [i18nInstance]);

  const changeLanguage = (langCode) => {
    i18nInstance.changeLanguage(langCode);
  };

  // Same signature as before:
  // t('key') — standard
  // t('key', 'string fallback') — used in Header.jsx
  // t('key', { var: val }) — interpolation
  const t = (key, paramsOrFallback = null) => {
    if (typeof paramsOrFallback === 'string') {
      return i18nT(key, { defaultValue: paramsOrFallback });
    }
    if (paramsOrFallback && typeof paramsOrFallback === 'object') {
      return i18nT(key, paramsOrFallback);
    }
    return i18nT(key);
  };

  const direction = getDirection(currentLanguage);
  const isRTL = direction === 'rtl';

  return (
    <LanguageContext.Provider value={{
      t,
      currentLanguage,
      language: currentLanguage, // alias used in some pages
      direction,
      isRTL,
      changeLanguage,
    }}>
      {children}
    </LanguageContext.Provider>
  );
};
