import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    supportedLngs: [
      'en',
      'ru',
      'am',
    ],
    load: 'languageOnly',
    saveMissing: false,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    returnEmptyString: false,
    missingKeyHandler: (lng, ns, key) => key,
    parseMissingKeyHandler: (key) => key,
    parseMissingPlurals: false,
    react: {
      useSuspense: false,
    },
  });

export default i18n;