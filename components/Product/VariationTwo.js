import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useSingle from '../../hooks/useSingle';
import ProductColor from './elements/ProductColor';
import SizeVariation from './elements/SizeVariation';
import { getDiscountPrice } from '../../utils/product';
import ImageThumb from './ImageThumb';
import { useDispatch, useSelector } from 'react-redux';
import { showcartsidebar, addcartItem } from '../../redux/actions/cartActions';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import useWindowSize from '../../hooks/useWindowSize';

const VariationTwo = ({ product, category, average, count }) => {
  const currency = useSelector((state) => state.siteCurrency.currency);
  const dispatch = useDispatch();
  const { locale } = useRouter();
  const size = useWindowSize();
  const { t } = useTranslation('product');
  const {
    guarantee,
    material,
    name,
    name_ar,
    name_ru,
    slug,
    badge,
    feature,
    sku,
    ratings,
    reviews,
    discount,
    discountDuration,
    categories,
    shortdescription,
    shortdescription_ar,
    shortdescription_ru,
    variations,
    variationtype,
  } = product;

  const {
    productColor,
    productCode,
    productSize,
    productPrice,
    productStock,
    productImage,
    productColorHandler,
    productSizeHandler,
    productQuantity,
    setProductQuantity,
    productQuantityIncrement,
    productQuantityDecrement,
  } = useSingle(product);

  const originalPrice = getDiscountPrice(productPrice, 0, currency);
  const discountedPrice = getDiscountPrice(productPrice, discount, currency);

  const buttonhandler = (e) => {
    e.preventDefault();
    dispatch(showcartsidebar());
    const cart = {
      name,
      currency,
      slug,
      name_ar,
      productColor,
      productSize,
      productCode,
      discountedPrice,
      productStock,
      productQuantity,
      productImage: productImage[0].url,
    };
    dispatch(addcartItem(cart));
  };

  return (
    <>
      <div className="col-md-5 mb-4 mb-md-8">
        {productImage && (
          <ImageThumb
            badge={badge}
            discount={discount}
            productImage={productImage}
            key={1}
          />
        )}
      </div>
      <div className="col-md-6 mb-4 mb-md-8">
        <div
          className="product-details"
          data-sticky-options="{'minWidth': 767}"
        >
          <h1 className="product-title">
            {locale === 'en' && name}
            {locale === 'ar' && name_ar}
            {locale === 'ru' && name_ru}
          </h1>
          <div className="product-bm-wrapper">
            <figure className="brand">
              <Image
                src="/uploads/website/certificate.jpg"
                alt="Brand"
                width="105"
                height="48"
              />
            </figure>
            <div className="product-meta">
              <div className="product-categories">
                {t('product:category')}:{' '}
                {
                  <span className="product-category">
                    <Link href={`/product-category/${category.slug}`}>
                      <a>
                        {locale === 'en' && category.name}
                        {locale === 'ar' && category.arname}
                        {locale === 'ru' && category.runame}
                      </a>
                    </Link>
                  </span>
                }
                {categories.map((data, i) => (
                  <span className="product-category" key={i}>
                    <Link
                      href={`/product-category/${category.slug}?sub=${data._id}`}
                      passHref
                    >
                      <a>
                        {locale === 'en' && data.name}
                        {locale === 'ar' && data.arname}
                        {locale === 'ru' && data.runame}
                      </a>
                    </Link>
                  </span>
                ))}
              </div>
              <div className="product-sku">
                {t('product:itemcode')}: <span> {productCode}</span>
              </div>
            </div>
          </div>

          <hr className="product-divider" />

          <div className="product-price">
            <ins className="new-price">
              {currency} {discountedPrice.toFixed(2)}
            </ins>
            {discountedPrice != productPrice && (
              <del className="old-price old-price-product-detail old-price-big">
                {currency} {originalPrice.toFixed(2)}
              </del>
            )}
          </div>

          {count !== 0 && (
            <div className="ratings-container">
              <div className="ratings-full">
                <span
                  className="ratings"
                  style={{ width: `${average[0].averageRate * 20}%` }}
                ></span>
              </div>
              <a href="#product-tab-reviews" className="rating-reviews">
                ({count} Reviews)
              </a>
            </div>
          )}
          <div className="widget widget-icon-box mb-6 bg-grey mt-6">
            <div className="row">
              {guarantee !== null && (
                <div className="col-md-6">
                  <div className="icon-box icon-box-side product-widget">
                    <div className="icon-box-content">
                      <p className="text-dark">
                        {guarantee} {t('product:yearguarantee')}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {material !== null && (
                <div className="col-md-6">
                  <div className="icon-box icon-box-side product-widget">
                    <div className="icon-box-content">
                      <p className="text-dark"> {t(`product:${material}`)}</p>
                    </div>
                  </div>
                </div>
              )}

              {feature.map((item, index) => (
                <div className="col-md-6" key={index}>
                  <div className="icon-box icon-box-side product-widget">
                    <div className="icon-box-content">
                      <p className="text-dark">{t(`product:${item.value}`)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="product-short-desc">
            {locale === 'en' && (
              <ul
                className="list-type-check list-style-none"
                dangerouslySetInnerHTML={{
                  __html: shortdescription,
                }}
              ></ul>
            )}
            {locale === 'ar' && (
              <ul
                className="list-type-check list-style-none"
                dangerouslySetInnerHTML={{
                  __html:
                    shortdescription_ar === 'false'
                      ? shortdescription
                      : shortdescription_ar,
                }}
              ></ul>
            )}
            {locale === 'ru' && (
              <ul
                className="list-type-check list-style-none"
                dangerouslySetInnerHTML={{
                  __html:
                    shortdescription_ru === 'false'
                      ? shortdescription
                      : shortdescription_ru,
                }}
              ></ul>
            )}
          </div>

          <hr className="product-divider" />
          {variations != null && (
            <>
              {' '}
              {variationtype == 'color' && (
                <div className="product-form product-variation-form product-color-swatch">
                  <label>{t(`product:color`)}:</label>
                  <ProductColor
                    product={product}
                    productColor={productColor}
                    className="d-flex align-items-center product-variations"
                    productColorHandler={productColorHandler}
                  />
                </div>
              )}
              {variationtype == 'size' && (
                <div className="product-form product-variation-form product-size-swatch">
                  <label className="mb-1">{t(`product:size`)}:</label>
                  <SizeVariation
                    className="flex-wrap d-flex align-items-center product-variations"
                    product={product}
                    productSize={productSize}
                    productSizeHandler={productSizeHandler}
                  />
                </div>
              )}
            </>
          )}

          <div className="fix-bottom product-sticky-content sticky-content">
            {size.width < 767 ? (
              <div className="sticky-btn">
                <div className="product-form container">
                  <div className="product-qty-form">
                    <div className="input-group">
                      <input
                        className="quantity form-control"
                        type="number"
                        min="1"
                        max="1000"
                        value={productQuantity}
                        size={productStock}
                        readOnly
                      />
                      <button
                        className="quantity-plus w-icon-plus"
                        onClick={productQuantityIncrement}
                      ></button>
                      <button
                        className="quantity-minus w-icon-minus"
                        onClick={productQuantityDecrement}
                      ></button>
                    </div>
                  </div>
                  <button
                    className={`btn btn-primary btn-cart ${
                      productStock == 0 ? 'disabled' : ''
                    }`}
                    onClick={buttonhandler}
                  >
                    <i className="w-icon-cart"></i>
                    <span>
                      {productStock == 0
                        ? t(`product:outofstock`)
                        : t(`product:addtocart`)}
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="product-form container">
                <div className="product-qty-form">
                  <div className="input-group">
                    <input
                      className="quantity form-control"
                      type="number"
                      min="1"
                      max="1000"
                      value={productQuantity}
                      size={productStock}
                      readOnly
                    />
                    <button
                      className="quantity-plus w-icon-plus"
                      onClick={productQuantityIncrement}
                    ></button>
                    <button
                      className="quantity-minus w-icon-minus"
                      onClick={productQuantityDecrement}
                    ></button>
                  </div>
                </div>
                <button
                  className={`btn btn-primary btn-cart ${
                    productStock == 0 ? 'disabled' : ''
                  }`}
                  onClick={buttonhandler}
                >
                  <i className="w-icon-cart"></i>
                  <span>
                    {productStock == 0
                      ? t(`product:outofstock`)
                      : t(`product:addtocart`)}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default VariationTwo;
