import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

const Index = () => {
  const { t } = useTranslation('common');
  return (
    <div className="footer-bottom container">
      <div className="footer-left">
        <p className="copyright">
          {t('common:copyright')} © {new Date().getFullYear()} Lifesmile.{' '}
          {t('common:allrightsreserved')}.
        </p>
      </div>
      <div className="footer-right">
        <span className="payment-label mr-lg-8">{t('common:safepayment')}</span>
        <figure className="payment">
          <Image
            src="/assets/image/payment.png"
            alt="payment"
            width="159"
            height="25"
          />
        </figure>
      </div>
    </div>
  );
};

export default Index;
