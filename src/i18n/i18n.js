import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './translatefiles/en.json';
import translationAR from './translatefiles/ar.json';

const resources = {
  en: {
    translation: translationEN,
  },
  ar: {
    translation: translationAR,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('lang') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
