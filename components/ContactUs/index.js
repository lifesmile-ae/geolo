import React from 'react';
import TopBar from './TopBar';
import Link from 'next/link';
import Faqs from './Faqs';
import Contactform from './Contactform';
import { useTranslation } from 'next-i18next';

const Index = () => {
  const { t } = useTranslation('common');
  return (
    <>
      <nav className="breadcrumb-nav mb-10 pb-1">
        <div className="container">
          <ul className="breadcrumb">
            <Link href="/" passHref>
              <li>
                <a href="">{t('common:home')}</a>
              </li>
            </Link>
            <li>{t('common:contactus')}</li>
          </ul>
        </div>
      </nav>
      <div className="page-content contact-us">
        <div className="container">
          <TopBar />
          <section className="contact-section">
            <div className="row gutter-lg pb-3">
              <Faqs />
              <Contactform />
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Index;
