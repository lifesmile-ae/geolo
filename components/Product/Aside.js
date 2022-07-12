import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getDiscountPrice } from '../../utils/product';
import { useSelector } from 'react-redux';

const Aside = () => {
  const currency = useSelector((state) => state.siteCurrency.currency);
  const [productOne, setProductOne] = useState([]);
  const [productTwo, setProductTwo] = useState([]);
  const { locale } = useRouter();
  const { t } = useTranslation('common');
  SwiperCore.use([Navigation, Pagination]);

  useEffect(() => {
    axios.get(`/api/product?limit=8`).then(({ data }) => {
      setProductOne(data.products.slice(0, 4));
      setProductTwo(data.products.slice(4, 8));
    });
  }, []);
  return (
    <aside
      className="
          sidebar
          product-sidebar
          sidebar-fixed
          right-sidebar
          sticky-sidebar-wrapper
        "
    >
      <div className="sidebar-content scrollable">
        <div className="sticky-sidebar">
          <div className="widget widget-icon-box mb-6">
            <div className="icon-box icon-box-side">
              <span className="icon-box-icon text-dark">
                <i className="w-icon-truck"></i>
              </span>
              <div className="icon-box-content">
                <h4 className="icon-box-title">
                  {' '}
                  {t('common:freeshippingandreturn')}
                </h4>
                <p> {t('common:forallorders')}</p>
              </div>
            </div>
            <div className="icon-box icon-box-side">
              <span className="icon-box-icon text-dark">
                <i className="w-icon-bag"></i>
              </span>
              <div className="icon-box-content">
                <h4 className="icon-box-title">{t('common:securepayment')}</h4>
                <p>{t('common:weensure')}</p>
              </div>
            </div>
            <div className="icon-box icon-box-side">
              <span className="icon-box-icon text-dark">
                <i className="w-icon-money"></i>
              </span>
              <div className="icon-box-content">
                <h4 className="icon-box-title">{t('common:moneyback')}</h4>
                <p>{t('common:withinthirty')}</p>
              </div>
            </div>
          </div>

          <div className="widget widget-banner mb-9">
            <div className="banner banner-fixed br-sm">
              <figure>
                <Image
                  src="/assets/image/banner3.jpg"
                  alt="Banner"
                  width="266"
                  height="220"
                />
              </figure>
              <div className="banner-content">
                <div
                  className="
                      banner-price-info
                      font-weight-bolder
                      text-white
                      lh-1
                      ls-25
                    "
                >
                  <sup className="font-weight-bold">Smile</sup>
                  <sub className="font-weight-bold text-uppercase ls-25">
                    Points
                  </sub>
                </div>
                <h4
                  className="
                      banner-subtitle
                      text-white
                      font-weight-bolder
                      text-uppercase
                      mb-0
                    "
                >
                  {t('common:oneverypurchase')}
                </h4>
              </div>
            </div>
          </div>

          <div className="widget widget-products">
            <div className="title-link-wrapper mb-2">
              <h4 className="title title-link font-weight-bold">
                {t('common:moreproducts')}
              </h4>
            </div>

            <div className="swiper nav-top">
              <Swiper
                spaceBetween={20}
                slidesPerView={1}
                className="swiper-theme nav-top"
                navigation={{
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                }}
              >
                <div className="swiper-wrapper">
                  <SwiperSlide className="widget-col">
                    {productOne.map((product, index) => (
                      <div className="product product-widget" key={index}>
                        <figure className="product-media">
                          <Link href={`/product/${product.slug}`} passHref>
                            <a>
                              <div className="image">
                                <Image
                                  src={product.thumbs[0].url}
                                  alt="Product"
                                  width="110"
                                  height="113"
                                />
                              </div>
                              <div className="image">
                                <Image
                                  src={product.thumbs[1].url}
                                  alt="Product"
                                  width="110"
                                  height="113"
                                  className="image"
                                />
                              </div>
                            </a>
                          </Link>
                        </figure>
                        <div className="product-details">
                          <h4 className="product-name">
                            <Link href={`/product/${product.slug}`} passHref>
                              <a>
                                {' '}
                                {locale === 'en' && product.name}
                                {locale === 'ar' && product.name_ar}
                                {locale === 'ru' && product.name_ru}
                              </a>
                            </Link>
                          </h4>
                          {product.reviews.length > 0 && (
                            <div className="ratings-container">
                              <div className="ratings-full">
                                <span
                                  className="ratings"
                                  style={{
                                    width: `${
                                      (product.reviews.reduce(
                                        (total, next) => total + next.rating,
                                        0
                                      ) /
                                        product.reviews.length) *
                                      20
                                    }%`,
                                  }}
                                ></span>
                              </div>
                              <span className="rating-reviews">
                                ({product.reviews.length} reviews)
                              </span>
                            </div>
                          )}
                          <div className="product-price">
                            {' '}
                            <ins className="new-price">
                              {currency}{' '}
                              {getDiscountPrice(
                                product.price,
                                0,
                                currency
                              ).toFixed(2)}
                            </ins>
                            {product.discount !== null && (
                              <del className="old-price old-price-product-detail">
                                {currency}{' '}
                                {getDiscountPrice(
                                  product.price,
                                  product.discount,
                                  currency
                                ).toFixed(2)}
                              </del>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </SwiperSlide>
                  <SwiperSlide className="widget-col">
                    {productTwo.map((product, index) => (
                      <div className="product product-widget" key={index}>
                        <figure className="product-media">
                          <Link href={`/product/${product.slug}`} passHref>
                            <a>
                              <div className="image">
                                <Image
                                  src={product.thumbs[0].url}
                                  alt="Product"
                                  width="110"
                                  height="113"
                                />
                              </div>
                              <div className="image">
                                <Image
                                  src={product.thumbs[1].url}
                                  alt="Product"
                                  width="110"
                                  height="113"
                                  className="image"
                                />
                              </div>
                            </a>
                          </Link>
                        </figure>
                        <div className="product-details">
                          <h4 className="product-name">
                            <Link href={`/product/${product.slug}`} passHref>
                              <a>
                                {' '}
                                {locale === 'en' && product.name}
                                {locale === 'ar' && product.name_ar}
                                {locale === 'ru' && product.name_ru}
                              </a>
                            </Link>
                          </h4>
                          {product.reviews.length > 0 && (
                            <div className="ratings-container">
                              <div className="ratings-full">
                                <span
                                  className="ratings"
                                  style={{
                                    width: `${
                                      (product.reviews.reduce(
                                        (total, next) => total + next.rating,
                                        0
                                      ) /
                                        product.reviews.length) *
                                      20
                                    }%`,
                                  }}
                                ></span>
                              </div>
                              <span className="rating-reviews">
                                ({product.reviews.length} reviews)
                              </span>
                            </div>
                          )}
                          <div className="product-price">
                            {' '}
                            <ins className="new-price">
                              {currency}{' '}
                              {getDiscountPrice(
                                product.price,
                                0,
                                currency
                              ).toFixed(2)}
                            </ins>
                            {product.discount !== null && (
                              <del className="old-price old-price-product-detail">
                                {currency}{' '}
                                {getDiscountPrice(
                                  product.price,
                                  product.discount,
                                  currency
                                ).toFixed(2)}
                              </del>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </SwiperSlide>
                </div>
                <button className="swiper-button-next"></button>
                <button className="swiper-button-prev"></button>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
