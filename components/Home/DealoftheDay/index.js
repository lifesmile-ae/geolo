import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { FreeMode, Navigation, Thumbs } from 'swiper';
import Image from 'next/image';
import MyTimer from '../../../utils/countdownTimer';
import axios from 'axios';
import { useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { getDiscountPrice } from '../../../utils/product';

const Test = () => {
  const { locale } = useRouter();
  const currency = useSelector((state) => state.siteCurrency.currency);
  SwiperCore.use([FreeMode, Navigation, Thumbs]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [thumbsSwiperOne, setThumbsSwiperOne] = useState(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const { t } = useTranslation('home', 'product');
  const [productOne, setProductOne] = useState([]);
  const [productTwo, setProductTwo] = useState([]);

  useEffect(() => {
    axios.get('/api/product/belle-cake-pan-24x24x10cm').then(({ data }) => {
      setProductOne(data.product);
    });
    axios
      .get('/api/product/petal-cake-pan-cake-mold-flower-shaped')
      .then(({ data }) => {
        setProductTwo(data.product);
      });
  }, []);

  return (
    <div className="col-lg-9 mb-4">
      <div className="single-product h-100 br-sm">
        <h4 className="title-sm title-underline font-weight-bolder ls-normal">
          {t('home:dealoftheday')}
        </h4>
        <div className="swiper">
          <Swiper
            className="swiper-container swiper-theme nav-top swiper-nav-lg"
            spaceBetween={20}
            slidesPerView={1}
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
          >
            <div className="swiper-wrapper row cols-1 gutter-no">
              <SwiperSlide>
                <div className="product product-single row">
                  <div className="col-md-6">
                    <div className="product-gallery product-gallery-sticky product-gallery-vertical">
                      <Swiper
                        navigation={true}
                        modules={[Thumbs]}
                        thumbs={{ swiper: thumbsSwiper }}
                        className="product-single-swiper swiper-theme nav-inner"
                      >
                        <div className="swiper-wrapper row cols-1 gutter-no">
                          {productOne?.previewImages?.map((image, index) => (
                            <SwiperSlide key={index}>
                              <figure className="product-image">
                                <Image
                                  src={image.url}
                                  alt="Product Image"
                                  width="800"
                                  height="900"
                                />
                              </figure>
                            </SwiperSlide>
                          ))}
                        </div>
                        {productOne?.discount && (
                          <div className="product-label-group">
                            <label className="product-label label-discount">
                              {productOne?.discount}% {t('home:off')}
                            </label>
                          </div>
                        )}
                      </Swiper>
                      <Swiper
                        className="product-thumbs-wrap"
                        direction="vertical"
                        watchSlidesProgress
                        onSwiper={setThumbsSwiper}
                        modules={[Thumbs]}
                        breakpoints={{
                          0: {
                            direction: 'horizontal',
                            slidesPerView: 4,
                          },
                          992: {
                            direction: 'vertical',
                            slidesPerView: 'auto',
                          },
                        }}
                      >
                        <div className="product-thumbs swiper-wrapper row cols-lg-1 cols-4 gutter-sm">
                          {productOne?.thumbs?.map((image, index) => (
                            <SwiperSlide className="product-thumb" key={index}>
                              <Image
                                src={image.url}
                                alt="Product thumb"
                                width="60"
                                height="68"
                              />
                            </SwiperSlide>
                          ))}
                        </div>
                      </Swiper>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="product-details scrollable">
                      <h2 className="product-title mb-1">
                        <Link href={`/product/${productOne?.slug}`} passHref>
                          <a>
                            {locale === 'en' && productOne?.name}
                            {locale === 'ar' && productOne?.name_ar}
                            {locale === 'ru' && productOne?.name_ru}
                          </a>
                        </Link>
                      </h2>

                      <hr className="product-divider" />

                      <div className="product-price">
                        <ins className="new-price">
                          {currency}{' '}
                          {getDiscountPrice(
                            productOne?.price,
                            productOne?.discount,
                            currency
                          ).toFixed(2)}
                        </ins>
                        {productOne?.discount !== null && (
                          <del className="old-price old-price-product-detail old-price-big">
                            {currency}{' '}
                            {getDiscountPrice(
                              productOne?.price,
                              0,
                              currency
                            ).toFixed(2)}
                          </del>
                        )}
                      </div>

                      <div className="product-countdown-container flex-wrap">
                        <label className="mr-2 text-default">
                          {t('home:offerendsin')}
                        </label>
                        <div className="product-countdown countdown-compact">
                          <MyTimer
                            expiryTimestamp={Date.now() + 1000 * 60 * 60 * 4}
                          />
                        </div>
                      </div>

                      <div className="product-short-desc">
                        {locale === 'en' && (
                          <ul
                            className="list-type-check list-style-none"
                            dangerouslySetInnerHTML={{
                              __html: productOne.shortdescription,
                            }}
                          ></ul>
                        )}
                        {locale === 'ar' && (
                          <ul
                            className="list-type-check list-style-none"
                            dangerouslySetInnerHTML={{
                              __html: productOne.shortdescription_ar,
                            }}
                          ></ul>
                        )}
                        {locale === 'ru' && (
                          <ul
                            className="list-type-check list-style-none"
                            dangerouslySetInnerHTML={{
                              __html: productOne.shortdescription_ru,
                            }}
                          ></ul>
                        )}
                      </div>

                      <div className="product-form pt-4">
                        <Link href={`/product/${productOne?.slug}`} passHref>
                          <button className="btn btn-primary btn-cart">
                            <i className="w-icon-cart"></i>
                            <span>{t('product:addtocart')}</span>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="product product-single row">
                  <div className="col-md-6">
                    <div className="product-gallery product-gallery-sticky product-gallery-vertical">
                      <Swiper
                        navigation={true}
                        modules={[Thumbs]}
                        thumbs={{ swiper: thumbsSwiperOne }}
                        className="product-single-swiper swiper-theme nav-inner"
                      >
                        <div className="swiper-wrapper row cols-1 gutter-no">
                          {productTwo?.previewImages?.map((image, index) => (
                            <SwiperSlide key={index}>
                              <figure className="product-image">
                                <Image
                                  src={image.url}
                                  alt="Product Image"
                                  width="800"
                                  height="900"
                                />
                              </figure>
                            </SwiperSlide>
                          ))}
                        </div>
                        {productTwo?.discount && (
                          <div className="product-label-group">
                            <label className="product-label label-discount">
                              {productTwo?.discount}% {t('home:off')}
                            </label>
                          </div>
                        )}
                      </Swiper>
                      <Swiper
                        className="product-thumbs-wrap"
                        direction="vertical"
                        watchSlidesProgress
                        onSwiper={setThumbsSwiperOne}
                        modules={[Thumbs]}
                        breakpoints={{
                          0: {
                            direction: 'horizontal',
                            slidesPerView: 4,
                          },
                          992: {
                            direction: 'vertical',
                            slidesPerView: 'auto',
                          },
                        }}
                      >
                        <div className="product-thumbs swiper-wrapper row cols-lg-1 cols-4 gutter-sm">
                          {productTwo?.thumbs?.map((image, index) => (
                            <SwiperSlide className="product-thumb" key={index}>
                              <Image
                                src={image.url}
                                alt="Product thumb"
                                width="60"
                                height="68"
                              />
                            </SwiperSlide>
                          ))}
                        </div>
                      </Swiper>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="product-details scrollable">
                      <h2 className="product-title mb-1">
                        <Link href={`/product/${productTwo?.slug}`} passHref>
                          <a>
                            {locale === 'en' && productTwo?.name}
                            {locale === 'ar' && productTwo?.name_ar}
                            {locale === 'ru' && productTwo?.name_ru}
                          </a>
                        </Link>
                      </h2>

                      <hr className="product-divider" />

                      <div className="product-price">
                        <ins className="new-price">
                          {currency}{' '}
                          {getDiscountPrice(
                            productOne?.price,
                            productOne?.discount,
                            currency
                          ).toFixed(2)}
                        </ins>
                        {productOne?.discount !== null && (
                          <del className="old-price old-price-product-detail old-price-big">
                            {currency}{' '}
                            {getDiscountPrice(
                              productOne?.price,
                              0,
                              currency
                            ).toFixed(2)}
                          </del>
                        )}
                      </div>

                      <div className="product-countdown-container flex-wrap">
                        <label className="mr-2 text-default">
                          {t('home:offerendsin')}
                        </label>
                        <div className="product-countdown countdown-compact">
                          <MyTimer
                            expiryTimestamp={Date.now() + 1000 * 60 * 60 * 4}
                          />
                        </div>
                      </div>

                      <div className="product-short-desc">
                        {locale === 'en' && (
                          <ul
                            className="list-type-check list-style-none"
                            dangerouslySetInnerHTML={{
                              __html: productTwo.shortdescription,
                            }}
                          ></ul>
                        )}
                        {locale === 'ar' && (
                          <ul
                            className="list-type-check list-style-none"
                            dangerouslySetInnerHTML={{
                              __html: productTwo.shortdescription_ar,
                            }}
                          ></ul>
                        )}
                        {locale === 'ru' && (
                          <ul
                            className="list-type-check list-style-none"
                            dangerouslySetInnerHTML={{
                              __html: productTwo.shortdescription_ru,
                            }}
                          ></ul>
                        )}
                      </div>

                      <div className="product-form pt-4">
                        <Link href={`/product/${productTwo?.slug}`} passHref>
                          <button className="btn btn-primary btn-cart">
                            <i className="w-icon-cart"></i>
                            <span>{t('product:addtocart')}</span>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </div>
            <button ref={prevRef} className="swiper-button-prev"></button>
            <button ref={nextRef} className="swiper-button-next"></button>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Test;
