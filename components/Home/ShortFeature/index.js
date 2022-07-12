import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import { useTranslation } from 'next-i18next';

const Index = () => {
  const { t } = useTranslation('common');
  return (
    <div className="container">
      <Swiper
        className="swiper-container icon-box-wrapper br-sm mt-6 mb-6 bg-grey"
        slidesPerView={1}
        breakpoints={{
          576: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
      >
        <div className="swiper-wrapper row cols-md-4 cols-sm-3 cols-1">
          <SwiperSlide className="icon-box icon-box-side icon-box-primary">
            <span className="icon-box-icon icon-shipping">
              <i className="w-icon-truck"></i>
            </span>
            <div className="icon-box-content">
              <h4 className="icon-box-title font-weight-bold mb-1">
                {t('common:freeshippingandreturn')}
              </h4>
              <p className="text-default"> {t('common:forallorders')}</p>
            </div>
          </SwiperSlide>
          <SwiperSlide className="icon-box icon-box-side icon-box-primary">
            <span className="icon-box-icon icon-payment">
              <i className="w-icon-bag"></i>
            </span>
            <div className="icon-box-content">
              <h4 className="icon-box-title font-weight-bold mb-1">
                {t('common:securepayment')}
              </h4>
              <p className="text-default"> {t('common:weensure')}</p>
            </div>
          </SwiperSlide>
          <SwiperSlide
            className="icon-box
                  icon-box-side icon-box-primary icon-box-money"
          >
            <span className="icon-box-icon icon-money">
              <i className="w-icon-money"></i>
            </span>
            <div className="icon-box-content">
              <h4 className="icon-box-title font-weight-bold mb-1">
                {t('common:cashondelivery')}
              </h4>
              <p className="text-default">{t('common:noextracharge')}</p>
            </div>
          </SwiperSlide>
          <SwiperSlide className="icon-box icon-box-side icon-box-primary icon-box-chat">
            <span className="icon-box-icon icon-chat">
              <i className="w-icon-chat"></i>
            </span>
            <div className="icon-box-content">
              <h4 className="icon-box-title font-weight-bold mb-1">
                {t('common:customersupport')}
              </h4>
              <p className="text-default"> {t('common:calloremail')}</p>
            </div>
          </SwiperSlide>
        </div>
      </Swiper>
    </div>
  );
};

export default Index;
