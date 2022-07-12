const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ar', 'ru'],
    localePath: path.resolve('./public/locales'),
  },
  react: { useSuspense: false },
};
