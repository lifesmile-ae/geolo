import React from 'react';
import { useTranslation } from 'next-i18next';

const Index = () => {
  const { t } = useTranslation('common');
  return (
    <>
      <section className="content-title-section mb-10">
        <h3 className="title title-center mb-3">
          {t('common:contactinformation')}
        </h3>
        <p className="text-center">{t('common:contactheading')}</p>
      </section>
      <section className="contact-information-section mb-10">
        <div
          className="swiper-container swiper-theme"
          data-swiper-options="{
                   'spaceBetween': 20,
                   'slidesPerView': 1,
                   'breakpoints': {
                       '480': {
                           'slidesPerView': 2
                       },
                       '768': {
                           'slidesPerView': 3
                       },
                       '992': {
                           'slidesPerView': 4
                       }
                   }
               }"
        >
          <div
            className="
           swiper-wrapper
           row
           cols-xl-4 cols-md-3 cols-sm-2 cols-1
         "
          >
            <div className="swiper-slide icon-box text-center icon-box-primary">
              <span className="icon-box-icon icon-email">
                <i className="w-icon-envelop-closed"></i>
              </span>
              <div className="icon-box-content">
                <h4 className="icon-box-title">{t('common:emailaddress')}</h4>
                <p className='lsline-height'>ecommerce@lifesmile.ae <br /> help@lifesmile.ae</p>
              </div>
            </div>
            <div className="swiper-slide icon-box text-center icon-box-primary">
              <span className="icon-box-icon icon-headphone">
                <i className="w-icon-headphone"></i>
              </span>
              <div className="icon-box-content">
                <h4 className="icon-box-title">{t('common:phonenumber')}</h4>
                <p className='lsline-height'>(+971) 52 157 3960 / (+971) 042-255143 <br /> (+971) 50 392 4709 / (+971) 50 392 4053</p>
              </div>
            </div>
            <div className="swiper-slide icon-box text-center icon-box-primary">
              <span className="icon-box-icon icon-map-marker">
                <i className="w-icon-map-marker"></i>
              </span>
              <div className="icon-box-content">
                <h4 className="icon-box-title">{t('common:address')}</h4>
                <p>Murshid Bazar, Deira, Dubai - UAE</p>
              </div>
            </div>
            <div className="swiper-slide icon-box text-center icon-box-primary">
              <span className="icon-box-icon icon-fax">
                <i className="w-icon-fax"></i>
              </span>
              <div className="icon-box-content">
                <h4 className="icon-box-title">{t('common:fax')}</h4>
                <p>(+971) 04-2255949</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="divider mb-10 pb-1" />
    </>
  );
};

export default Index;
