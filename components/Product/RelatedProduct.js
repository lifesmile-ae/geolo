import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { getDiscountPrice } from '../../utils/product';

const RelatedProduct = ({ category }) => {
  const currency = useSelector((state) => state.siteCurrency.currency);
  SwiperCore.use([Navigation, Pagination]);
  const { t } = useTranslation('product', 'common');
  const { locale, query } = useRouter();
  const [relatedProduct, setRelatedProduct] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/category/${category.slug}?limit=4&except=${query.slug}`)
      .then(({ data }) => {
        setRelatedProduct(data.getProduct);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className="vendor-product-section">
      <div className="title-link-wrapper mb-4">
        <h4 className="title text-left">{t('product:relatedproducts')}</h4>
        <Link href={`/product-category/${category.slug}`} passHref>
          <a
            className="
              btn btn-dark btn-link btn-slide-right btn-icon-right
            "
          >
            {t('common:moreproducts')}
            <i className="w-icon-long-arrow-right"></i>
          </a>
        </Link>
      </div>
      <Swiper
        spaceBetween={20}
        slidesPerView={2}
        breakpoints={{
          576: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          992: {
            slidesPerView: 4,
          },
        }}
      >
        <div className="swiper-wrapper row cols-lg-4 cols-md-4 cols-sm-3 cols-2">
          {relatedProduct.map((product, index) => (
            <SwiperSlide className="product" key={index}>
              <figure className="product-media">
                <Link href={`/product/${product.slug}`} passHref>
                  <a>
                    <div className="image">
                      <Image
                        src={product.thumbs[0].url}
                        alt="Product"
                        width="300"
                        height="338"
                      />
                    </div>
                    <div className="image">
                      <Image
                        src={product.thumbs[1].url}
                        alt="Product"
                        width="300"
                        height="338"
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
                <div className="ratings-container">
                  <div className="ratings-full">
                    <span className="ratings" style={{ width: '100%' }}></span>
                    <span className="tooltiptext tooltip-top"></span>
                  </div>
                  <a href="product-default.html" className="rating-reviews">
                    (3 reviews)
                  </a>
                </div>
                <div className="product-pa-wrapper">
                  <div className="product-price">
                    <ins className="new-price">
                      {currency}{' '}
                      {getDiscountPrice(product.price, 0, currency).toFixed(2)}
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
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </section>
  );
};

export default RelatedProduct;
