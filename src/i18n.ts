import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';

// import XHR from 'i18next-xhr-backend';

i18next
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '/locales/{{lng}}.json',
      requestOptions: {
        cache: 'no-store',
      },
    },
    react: {
      useSuspense: false,
      bindI18n: 'languageChanged',
    },
    returnObjects: false,
    debug: true,
    lng: 'en',
    fallbackLng: 'en',
    preload: ['en', 'es-US'],
    // keySeparator: false,
    interpolation: { escapeValue: false },
  });

export default i18next;
