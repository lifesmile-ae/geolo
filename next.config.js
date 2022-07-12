const { i18n } = require('./next-i18next.config');

module.exports = {
  reactStrictMode: true,
  devIndicators: {
    buildActivity: false,
  },
  i18n,
  images: {
    domains: ['flagcdn.com', 'res.cloudinary.com', 'i.imgur.com'],
  },
  env: {
    SITEURL: 'http://localhost:3000',
    MONGODB_URI:
      'mongodb+srv://lifesmile:Lm2pibyR888szMG@cluster0.dpayg.mongodb.net/lifesmile?retryWrites=true&w=majority',
    SMTP_HOST: 'smtp.mailtrap.io',
    SMTP_PORT: '2525',
    SMTP_USER: '5ba9f067a276c6',
    SMTP_PASSWORD: 'b5adc87ce49537',
    SMTP_FROM_NAME: 'Amazon',
    SMTP_FROM_EMAIL: 'help@amazon.com',
    USD_RATE: 0.54,
    SHIPPING_RATE: 0.02,
    VAT: 0.05,
    SMILE_POINT_RATE: 0.02,
    COUNTRY_FETCH_URL: 'https://restcountries.com/v2/all',
    RIVET_AUTHORIZATION: '265:HKwFE2SyWU6sX3xnX3zt',
    CHAT_SERVER: 'https://lifesmile-socket.herokuapp.com/',
  },
};
