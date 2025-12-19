import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import en from '../locales/en.json';
import ur from '../locales/ur.json';

// Initialize i18next with English (default) and Urdu translations.
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ur: { translation: ur },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

// Keep document language direction in sync with the active locale.
const updateDocumentLanguage = (lng: string) => {
  if (typeof document === 'undefined') return;

  const html = document.documentElement;

  html.lang = lng;
  html.dir = lng === 'ur' ? 'rtl' : 'ltr';

  // Toggle font class
  if (lng === 'ur') {
    html.classList.add('font-jameel');
    html.classList.remove('font-poppins');
  } else {
    html.classList.add('font-poppins');
    html.classList.remove('font-jameel');
  }
};


updateDocumentLanguage(i18n.language);
i18n.on('languageChanged', updateDocumentLanguage);

export default i18n;

