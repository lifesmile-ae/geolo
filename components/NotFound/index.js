import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const Index = ({ type }) => {
  const { t } = useTranslation('common');
  const [image, setImage] = useState('404.png');
  useEffect(() => {
    if (type === 'emptybag') {
      setImage('Empty-Bag.png');
    } else if (type === 'productnotfound') {
      setImage('no-product-found.png');
    } else {
      setImage('404.png');
    }
  }, [type]);
  return (
    <div className="page-content error-404">
      <div className="container">
        <div className="banner">
          <figure>
            <Image
              src={`/assets/image/${image}`}
              alt="Error 404"
              width="820"
              height="460"
            />
          </figure>
          <div className="banner-content text-center">
            <h2 className="banner-title">
              <span className="text-secondary">{t('common:oops')}</span>{' '}
              {type === 'emptybag'
                ? t('common:cartisempty')
                : t('common:somethingwentwronghere')}
            </h2>
            {type !== 'productnotfound' && (
              <p className="text-light">
                {type === 'emptybag'
                  ? t('common:gobackandshop')
                  : t('common:pagenotfound')}
              </p>
            )}

            <Link href="/">
              <a className="btn btn-dark btn-rounded btn-icon-right">
                {t('common:gobackhome')}
                <i className="w-icon-long-arrow-right"></i>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
