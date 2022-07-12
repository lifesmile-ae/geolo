import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const FooterBottomMobile = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  return (
    <>
      {router.pathname === '/' && (
        <div className="footer-bottom container footer-mob">
          <div className="footer-left">
            <p className="copyright">
              {t('common:copyright')} © {new Date().getFullYear()} Life Smile.{' '}
              {t('common:allrightsreserved')}.
            </p>
          </div>
          <div className="footer-right">
            <span className="payment-label mr-lg-8">
              {t('common:safepayment')}
            </span>
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
      )}
    </>
  );
};

export default FooterBottomMobile;
