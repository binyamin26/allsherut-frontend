import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import he from './locales/he/translation.json';

const STORAGE_KEY = 'homesherut_language';
const SUPPORTED = ['he', 'en', 'fr', 'ru'];
// URL prefix takes priority over localStorage (enables direct navigation to /fr/...)
const _urlLang = window.location.pathname.split('/')[1];
const savedLang = (SUPPORTED.includes(_urlLang) ? _urlLang : null)
  || localStorage.getItem(STORAGE_KEY)
  || 'he';

// Vite creates a separate chunk for each of these — loaded only on first switch
export const languageLoaders = {
  en: () => import('./locales/en/translation.json'),
  fr: () => import('./locales/fr/translation.json'),
  ru: () => import('./locales/ru/translation.json'),
};

// Load a language bundle and register it in i18next
export const loadLanguage = async (lang) => {
  if (lang === 'he' || i18n.hasResourceBundle(lang, 'translation')) return;
  const loader = languageLoaders[lang];
  if (!loader) return;
  const mod = await loader();
  i18n.addResourceBundle(lang, 'translation', mod.default ?? mod, true, true);
};

// Build initial resources: Hebrew always bundled + saved language pre-loaded if non-Hebrew
const buildInitialResources = async () => {
  const resources = { he: { translation: he } };
  if (savedLang !== 'he' && languageLoaders[savedLang]) {
    const mod = await languageLoaders[savedLang]();
    resources[savedLang] = { translation: mod.default ?? mod };
  }
  return resources;
};

export const i18nInitPromise = buildInitialResources().then((resources) =>
  i18n.use(initReactI18next).init({
    lng: savedLang,
    fallbackLng: 'he',
    resources,

    // Keys are flat strings like "homepage.hero.tagline" — no dot-navigation
    keySeparator: false,
    nsSeparator: false,

    interpolation: {
      escapeValue: false,
      prefix: '{',   // Keep existing {var} format
      suffix: '}',
    },

    react: {
      useSuspense: false,
    },
  })
);

export default i18n;
