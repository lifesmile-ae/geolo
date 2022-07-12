import { appWithTranslation } from 'next-i18next';
import Router from 'next/router';
import { wrapper } from '../redux/store';
import { useStore } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Layout from '../components/Layout';
import { Provider } from 'next-auth/client';
import 'swiper/css/bundle';
import nProgress from 'nprogress';
import '../styles/css/nprogress.css';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'next-i18next';
import { sitecurrencyaed, sitecurrencyusd } from '../redux/actions/siteActions';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/vendor/fontawesome-free/css/all.min.css';
import '../styles/globals.css';
import { useRouter } from 'next/router';

Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeComplete', nProgress.done);

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { t } = useTranslation('home', 'common');
  const [category, setCategory] = useState([]);
  const dispatch = useDispatch();
  const store = useStore((state) => state);

  useEffect(() => {
    //Checking Incomming User Country For Currency
    const getlocation = async () => {
      try {
        const location = await fetch('https://geolocation-db.com/json/').then(
          (res) => res.json()
        );
        location.country_code === 'AE'
          ? dispatch(sitecurrencyaed())
          : dispatch(sitecurrencyusd());
      } catch (err) {
        dispatch(sitecurrencyaed());
      }
    };
    getlocation();
    //Fetching Categorys
    const getCategory = async () => {
      try {
        const res = await axios.get(`/api/category`);
        setCategory(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCategory();
  }, []);

  return (
    <PersistGate persistor={store.__persistor} loading={null}>
      {' '}
      <Provider session={pageProps.session}>
        <Layout
          title={t('common:seo_title')}
          description={t('common:seo_description')}
          category={category}
        >
          <Component key={router.asPath} {...pageProps} />
        </Layout>
      </Provider>
    </PersistGate>
  );
}

export default wrapper.withRedux(appWithTranslation(MyApp));
