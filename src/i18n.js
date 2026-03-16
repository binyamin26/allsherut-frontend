import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

const STORAGE_KEY = 'homesherut_language';
const savedLang = localStorage.getItem(STORAGE_KEY) || 'he';

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: savedLang,
    fallbackLng: 'he',
    supportedLngs: ['he', 'en', 'ru', 'fr'],
    load: 'languageOnly', // 'he-IL' → 'he'

    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },

    interpolation: {
      escapeValue: false, // React gère déjà le XSS
      prefix: '{',        // Garde le format {var} existant (au lieu de {{var}})
      suffix: '}',
    },

    react: {
      useSuspense: false, // Pas de freeze de l'UI pendant le chargement
    },
  });

export default i18n;
