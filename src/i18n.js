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
// Si le fichier de la langue sauvegardée ne se charge pas (réseau instable, Safari mobile...), on démarre
// quand même i18next en hébreu : sans instance initialisée, useTranslation() renvoie un objet vide et
// LanguageProvider plante (« t.on is not a function » -> page d'erreur de secours).
// La langue sauvegardée reste dans localStorage : elle sera ré-essayée à la prochaine visite.
const buildInitialResources = async () => {
  const resources = { he: { translation: he } };
  let lng = savedLang;
  if (savedLang !== 'he' && languageLoaders[savedLang]) {
    try {
      const mod = await languageLoaders[savedLang]();
      resources[savedLang] = { translation: mod.default ?? mod };
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('[i18n] chargement de la langue échoué, repli sur l\'hébreu :', err);
      lng = 'he';
    }
  }
  return { resources, lng };
};

export const i18nInitPromise = buildInitialResources().then(({ resources, lng }) =>
  i18n.use(initReactI18next).init({
    lng,
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
