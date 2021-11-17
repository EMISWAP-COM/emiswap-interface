import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import XHR from 'i18next-xhr-backend';

i18next
  .use(XHR)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: `./locales/en.json`,
      requestOptions: {
        cache: 'no-store',
      },
    },
    react: {
      useSuspense: true,
    },
    lng: 'en',
    fallbackLng: 'en',
    preload: ['en'],
    keySeparator: false,
    interpolation: { escapeValue: false },
  });

export default i18next;
