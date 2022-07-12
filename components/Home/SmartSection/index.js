import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { getDiscountPrice } from '../../../utils/product';

const Index = ({ title, image, saletype, description, link, slug }) => {
  const { locale } = useRouter();
  const { t } = useTranslation('home');
  const currency = useSelector((state) => state.siteCurrency.currency);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get(`/api/category/${slug}`).then(({ data }) => {
      setProducts(data.getProduct);
    });
  }, []);

  return (
    <div className="container">
      <div className="product-wrapper-1 mb-5">
        <div className="title-link-wrapper pb-1 mb-4">
          <h2 className="title ls-normal mb-0">{title}</h2>
          <Link href={link} passHref>
            <a className="font-size-normal font-weight-bold ls-25 mb-0">
              {locale === 'ar' && <i className="w-icon-long-arrow-left"></i>}
              {t('home:moreproducts')}{' '}
              {(locale === 'en' || locale === 'ru') && (
                <i className="w-icon-long-arrow-right"></i>
              )}
            </a>
          </Link>
        </div>
        <div className="row">
          <div className="col-lg-3 col-sm-4 mb-4">
            <div
              className="banner h-100 br-sm"
              style={{
                backgroundImage: image,
              }}
            >
              <div className="banner-content content-top">
                <h5 className="banner-subtitle font-weight-normal mb-2 text-white">
                  {saletype}
                </h5>
                <hr className="banner-divider bg-white mb-2" />
                <h3
                  className="
              banner-title
              font-weight-bolder
              ls-25
              text-uppercase 
              text-white
            "
                >
                  {description}
                  <br />
                  <span className="font-weight-normal text-capitalize text-white">
                    Collection
                  </span>
                </h3>
                <Link href={link} passHref>
                  <a className="btn btn-white btn-outline btn-rounded btn-sm">
                    shop Now
                  </a>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-lg-9 col-sm-8">
            <div className="row cols-xl-5 cols-lg-4 cols-2">
              {products.map((product, index) => (
                <div className="product-wrap product text-center" key={index}>
                  <figure className="product-media">
                    <Link href={`/product/${product.slug}`} passHref>
                      <a>
                        <div className="image">
                          <Image
                            src={product.thumbs[0].url}
                            alt="Product"
                            width="216"
                            height="243"
                          />
                        </div>
                        <div className="image">
                          <Image
                            src={product.thumbs[1].url}
                            alt="Product"
                            width="216"
                            height="243"
                            className="image"
                          />
                        </div>
                      </a>
                    </Link>
                    {product.discount && (
                      <div className="product-label-group">
                        <label className="product-label label-discount">
                          {product.discount}% Off
                        </label>
                      </div>
                    )}
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
                      <a href="product-default.html" className="rating-reviews">
                        (3 reviews)
                      </a>
                    </div> */}
                    <div className="product-price">
                      <div className="product-price">
                        {' '}
                        <ins className="new-price">
                          {currency}{' '}
                          {getDiscountPrice(
                            product.price,
                            product.discount,
                            currency
                          ).toFixed(2)}
                        </ins>
                        {product.discount !== null && (
                          <del className="old-price old-price-product-detail old-price-med">
                            {currency}{' '}
                            {getDiscountPrice(
                              product.price,
                              0,
                              currency
                            ).toFixed(2)}
                          </del>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
