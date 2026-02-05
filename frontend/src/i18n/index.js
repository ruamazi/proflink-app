import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from './locales/en.json';
import esTranslation from './locales/es.json';
import arTranslation from './locales/ar.json';

const resources = {
  en: {
    translation: enTranslation
  },
  es: {
    translation: esTranslation
  },
  ar: {
    translation: arTranslation
  }
};

// RTL languages
const rtlLanguages = ['ar'];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

// Handle RTL direction and fonts
export const isRTL = (language) => rtlLanguages.includes(language);

export const updateDirection = (language) => {
  const dir = isRTL(language) ? 'rtl' : 'ltr';
  document.documentElement.dir = dir;
  document.documentElement.lang = language;
};

export const updateFontFamily = (language) => {
  const body = document.body;
  if (language === 'ar') {
    body.style.fontFamily = "'Tajawal', sans-serif";
  } else {
    body.style.fontFamily = "'Inter', sans-serif";
  }
};

// Set initial direction and font
updateDirection(i18n.language);
updateFontFamily(i18n.language);

// Listen for language changes
i18n.on('languageChanged', (lng) => {
  updateDirection(lng);
  updateFontFamily(lng);
});

export default i18n;