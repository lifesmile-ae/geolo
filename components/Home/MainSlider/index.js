import React from 'react';
import 'swiper/css/bundle';
import { EffectFade, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/css/effect-fade';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import useWindowSize from '../../../hooks/useWindowSize';
import { useEffect, useState } from 'react';

const NewSlider = () => {
  const [imageone, setImageOne] = useState();
  const [imageTwo, setImageTwo] = useState();
  const [imageThree, setImageThree] = useState();
  const { t } = useTranslation('home');
  const size = useWindowSize();
  SwiperCore.use([Navigation, Pagination]);

  useEffect(() => {
    if (size.width < 575) {
      setImageOne(
        'https://res.cloudinary.com/lifesmile/image/upload/fry-mob_d0zuof.jpg'
      );
      setImageTwo(
        'https://res.cloudinary.com/lifesmile/image/upload/dinner-mob_l7gn9x.jpg'
      );
      setImageThree(
        'https://res.cloudinary.com/lifesmile/image/upload/cakemold-mob_gl7jso.jpg'
      );
    } else {
      setImageOne(
        'https://res.cloudinary.com/lifesmile/image/upload/fry-desktop_xosor9.jpg'
      );
      setImageTwo(
        'https://res.cloudinary.com/lifesmile/image/upload/dinner-desktop_gqn24k.jpg'
      );
      setImageThree(
        'https://res.cloudinary.com/lifesmile/image/upload/cakemold-desktop_tocjwo.jpg'
      );
    }
  }, [size]);

  return (
    <div className="container pb-2">
      <div className="intro-section mb-2">
        <div className="row">
          <div className="intro-slide-wrapper col-lg-9">
            <Swiper
              spaceBetween={0}
              slidesPerView={1}
              effect={'fade'}
              modules={[Autoplay, EffectFade]}
              pagination={{
                el: '.swiper-pagination',
                clickable: true,
              }}
              navigation={true}
              loop={true}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              grabCursor={true}
              className="swiper-container swiper-theme animation-slider pg-inner pg-xxl-hide pg-show pg-white nav-xxl-show nav-hide"
            >
              <SwiperSlide
                className="swiper-slide banner banner-fixed intro-slide intro-slide1 br-lg text-center alihamxa"
                style={{
                  backgroundImage: `url(
                    ${imageone}
                 )`,
                  backgroundColor: '#5B98B7',
                  opacity: 0.7,
                }}
              >
                <div className="banner-content y-50">
                  <h3 className="banner-subtitle text-capitalize text-white font-weight-normal ls-0">
                    {t('home:upto10off')}
                  </h3>
                  <h4 className="banner-title font-weight-bolder text-uppercase text-white d-block ls-normal">
                    {t('home:frypanset')}
                  </h4>
                  <Link href="/product-category/fry-pans" passHref>
                    <a className="btn btn-white btn-rounded btn-icon-right br-xs">
                      {t('home:shopnow')}
                      <i className="w-icon-long-arrow-right"></i>
                    </a>
                  </Link>
                </div>
              </SwiperSlide>
              <SwiperSlide
                className="swiper-slide banner banner-fixed intro-slide intro-slide2 br-lg"
                style={{
                  backgroundImage: `url(${imageTwo})`,
                  backgroundColor: '#DFE0E4',
                }}
              >
                <div className="banner-content">
                  <div>
                    <h3 className="banner-title text-capitalize text-dark font-weight-normal mb-1">
                      {t('home:newarrival')}
                    </h3>
                    <h4 className="banner-price-info text-capitalize text-dark mb-4 ls-25">
                      {t('home:dinnerwarefrom')}
                      <br />
                      <strong className="text-secondary"> AED 250</strong>
                    </h4>
                    <Link href="/product-category/plates-and-bowls" passHref>
                      <a className="btn btn-primary btn-rounded btn-icon-right">
                        {t('home:discovernow')}
                        <i className="w-icon-long-arrow-right"></i>
                      </a>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide
                className="swiper-slide banner banner-fixed intro-slide intro-slide3 br-lg"
                style={{
                  backgroundImage: `url(
                 ${imageThree}
                )`,
                  backgroundColor: '#ECECEC',
                }}
              >
                <div className="banner-content y-50">
                  <div>
                    <h3 className="banner-title text-capitalize text-white font-weight-normal">
                      {t('home:cakemolds')}
                    </h3>
                    <h4 className="banner-price-info text-white ls-25">
                      <strong>{t('home:getupto')}</strong>
                      <br />
                      70% {t('home:off')}
                    </h4>
                    <div className="d-flex">
                      <Link href="/product-category/cake-mold" passHref>
                        <a className="btn btn-white btn-rounded btn-icon-right mt-4 mr-6">
                          {t('home:shopnow')}
                          <i className="w-icon-long-arrow-right"></i>
                        </a>
                      </Link>
                      <img
                        src="/assets/image/sale-sm.png"
                        alt="sale"
                        width="196"
                        height="136"
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <div className="swiper-pagination"></div>
            </Swiper>
          </div>
          <div className="intro-banner-wrapper col-lg-3 mt-4">
            <div className="banner banner-fixed intro-banner col-lg-12 br-lg mb-4 side-banner-1">
              <figure>
                <img
                  src="https://res.cloudinary.com/lifesmile/image/upload/v1655122733/banner-1_u3k13u.jpg"
                  alt="Category Banner"
                  width="680"
                  height="180"
                  style={{ backgroundColor: '#E4E7EC' }}
                />
              </figure>
              <div className="banner-content side-content-1">
                <h3 className="banner-title text-white text-uppercase ls-25">
                  {t('home:cutlery')}
                </h3>
                <Link href="/product-category/cutlery" passHref>
                  <a className="btn btn-white btn-link btn-underline btn-icon-right">
                    {t('home:shopnow')}
                    <i className="w-icon-long-arrow-right"></i>
                  </a>
                </Link>
              </div>
            </div>
            <div className="banner banner-fixed intro-banner col-lg-12 intro-banner2 mb-4 br-lg">
              <figure>
                <img
                  src="https://res.cloudinary.com/lifesmile/image/upload/v1655122771/banner-2_ocgah2.jpg"
                  alt="Category Banner"
                  width="680"
                  height="180"
                  style={{ backgroundColor: '#33363B' }}
                />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewSlider;
