import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

const Index = () => {
  const { t } = useTranslation('product', 'home');
  return (
    <div className="container">
      <div className="row category-banner-wrapper pt-6 pb-8">
        <div className="col-md-4 mb-4">
          <Link href="/product-category/pots-and-casserole" passHref>
            <div className="banner banner-fixed category-banner-2 br-xl lh-0">
              <figure style={{ borderRadius: '3rem' }}>
                <Image
                  src="https://res.cloudinary.com/lifesmile/image/upload/v1655123530/cookware-banner_qieqeb.png"
                  alt="Category Banner"
                  width="610"
                  height="200"
                />
              </figure>
              <div className="banner-content y-50 pt-1">
                <h5 className="banner-subtitle font-weight-bold text-uppercase">
                  {t('product:nonstick')}
                </h5>
                <h3
                  className="
                      banner-title
                      font-weight-bolder
                      text-capitalize
                    "
                >
                  {t('product:cookware')}
                  <br />
                  {t('product:sets')}
                </h3>
                <Link href="/product-category/pots-and-casserole" passHref>
                  <a className="btn btn-dark btn-link btn-underline btn-icon-right">
                    {t('home:shopnow')}
                    <i className="w-icon-long-arrow-right"></i>
                  </a>
                </Link>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-4 mb-4">
          <Link href="/product-category/plates-and-bowls" passHref>
            <div className="banner banner-fixed category-banner-1 br-xl lh-0">
              <figure style={{ borderRadius: '3rem' }}>
                <Image
                  src="https://res.cloudinary.com/lifesmile/image/upload/v1655123877/dinner-set1_ylqzwf.png"
                  alt="Category Banner"
                  width="610"
                  height="200"
                />
              </figure>
              <div className="banner-content y-50 pt-1">
                <h5 className="banner-subtitle font-weight-bold text-uppercase">
                  {t('product:trending')}
                </h5>
                <h3 className="banner-title font-weight-bolder text-capitalize text-white">
                  {t('product:dinnerware')}
                  <br />
                  {t('product:collection')}
                </h3>
                <Link href="/product-category/plates-and-bowls" passHref>
                  <a className="btn btn-white btn-link btn-underline btn-icon-right">
                    {t('home:shopnow')}
                    <i className="w-icon-long-arrow-right"></i>
                  </a>
                </Link>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-4 mb-4">
          <Link href="/product-category/kettles" passHref>
            <div className="banner banner-fixed category-banner-1 br-xl lh-0">
              <figure>
                <Image
                  src="https://res.cloudinary.com/lifesmile/image/upload/new-arrival_1_c2v2tv.png"
                  alt="Category Banner"
                  width="610"
                  height="200"
                />
              </figure>
              <div className="banner-content y-50 pt-1">
                <h5 className="banner-subtitle font-weight-bold text-uppercase text-dark-80">
                  {t('product:bigdiscount')}
                </h5>
                <h3
                  className="
                      banner-title
                      font-weight-bolder
                      text-capitalize text-dark
                    "
                >
                  {t('product:enamelware')}
                  <br />
                  {t('product:collection')}
                </h3>
                <Link href="/product-category/kettles" passHref>
                  <a className="btn btn-dark btn-link btn-underline btn-icon-right">
                    {t('home:shopnow')}
                    <i className="w-icon-long-arrow-right"></i>
                  </a>
                </Link>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
