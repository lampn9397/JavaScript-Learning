import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import i18nextMiddleware from 'i18next-http-middleware';

i18next
  .use(i18nextMiddleware.LanguageDetector)
  .use(Backend)
  .init({
    fallbackLng: ['en'],
    preload: ['en', 'vi'],
    backend: {
      loadPath: __dirname + '/locales/{{lng}}/{{ns}}.json'
    },
  });

export default i18next;