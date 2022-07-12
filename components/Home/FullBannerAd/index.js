import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

const Index = () => {
  const { locale } = useRouter();
  const { t } = useTranslation('home');
  return (
    <div className="container">
      <div
        className="banner banner-fashion br-sm mb-9"
        style={{
          backgroundImage: `url(https://res.cloudinary.com/lifesmile/image/upload/v1655182834/4_zop8g4.jpg)`,
        }}
      >
        <div className="banner-content align-items-center">
          <div className="content-left d-flex align-items-center mb-3">
            <div
              className="
                    banner-price-info
                    font-weight-bolder
                    text-secondary text-uppercase
                    lh-1
                    ls-25
                  "
            >
              10
              <sup className="font-weight-bold">%</sup>
              <sub className="font-weight-bold ls-25">Off</sub>
            </div>
            <hr className="banner-divider bg-white mt-0 mb-0 mr-1" />
          </div>
          <div className="content-right d-flex align-items-center flex-1 flex-wrap">
            <div className="banner-info mb-0 mr-auto pr-4 mb-3">
              <h3
                className="
                      banner-title
                      text-white
                      font-weight-bolder
                      text-uppercase
                      ls-25
                    "
              >
                For all Collections
              </h3>
              <p className="text-white mb-0">
                Use code
                <span
                  className="
                        text-dark
                        bg-white
                        font-weight-bold
                        ls-50
                        pl-1
                        pr-1
                        d-inline-block
                      "
                >
                  SMILE <strong>10</strong>
                </span>
                to get best offer.
              </p>
            </div>
            <Link href="/product-category/cutlery" passHref>
              <a
                className="
                    btn btn-white btn-outline btn-rounded btn-icon-right
                  "
              >
                {locale === 'ar' && <i className="w-icon-long-arrow-left"></i>}
                {t('home:shopnow')}{' '}
                {locale === 'en' && <i className="w-icon-long-arrow-right"></i>}
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
