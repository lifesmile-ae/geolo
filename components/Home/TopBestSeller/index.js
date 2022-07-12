import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import axios from 'axios';
import 'swiper/css/bundle';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getDiscountPrice } from '../../../utils/product';
import { useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next';

const Index = () => {
  const currency = useSelector((state) => state.siteCurrency.currency);
  const { t } = useTranslation('home');
  SwiperCore.use([Navigation]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get(`/api/product`).then(({ data }) => {
      setProducts(data.products);
    });
  }, []);
  const { locale } = useRouter();
  return (
    <div className="col-lg-3 mb-4">
      <div className="widget widget-products widget-products-bordered h-90">
        <div className="widget-body br-sm h-100">
          <h4
            className="
                      title-sm title-underline
                      font-weight-bolder
                      ls-normal
                      mb-2 
                    "
          >
            {t('home:topbestseller')}
          </h4>
          <Swiper
            navigation={true}
            className="swiper-container swiper-theme nav-top"
            slidesPerView={1}
            spaceBetween={20}
            breakpoints={{
              576: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              992: {
                slidesPerView: 1,
              },
            }}
          >
            <div className="swiper-wrapper row cols-lg-1 cols-md-3">
              <SwiperSlide className="product-widget-wrap">
                {products.map((product, index) => (
                  <div className="product product-widget bb-no" key={index}>
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
                      {/* <div className="ratings-container">
                        <div className="ratings-full">
                          <span
                            className="ratings"
                            style={{ width: '60%' }}
                          ></span>
                          <span className="tooltiptext tooltip-top"></span>
                        </div>
                      </div> */}
                      <div className="product-price">
                        {' '}
                        <ins className="new-price">
                          {currency}{' '}
                          {getDiscountPrice(product.price, 0, currency).toFixed(
                            2
                          )}
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
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Index;
