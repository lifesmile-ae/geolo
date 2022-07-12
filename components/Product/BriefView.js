import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getDiscountPrice } from '../../utils/product';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { addwishItem } from '../../redux/actions/wishActions';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useEffect, useState } from 'react';

const BriefView = ({ product }) => {
  const truncate = (str) => {
    return str.length > 30 ? str.substring(0, 25) + '...' : str;
  };
  const dispatch = useDispatch();
  const [wishItem, setWishItem] = useState();

  const currency = useSelector((state) => state.siteCurrency.currency);
  const { locale } = useRouter();
  const discountedPrice = getDiscountPrice(
    product.price,
    product.discount,
    currency
  );

  const wishItems = useSelector(
    (state) => state.wishListItems.wishList.wishItems
  );

  useEffect(() => {
    wishItems.map((item, i) =>
      item.id === product._id ? setWishItem(true) : setWishItem(false)
    );
  }, [wishItems, product]);

  const wishlistHandle = (id, name, image, currency, price, slug) => {
    const wishitem = { id, name, image, currency, price, slug };
    dispatch(addwishItem(wishitem));
  };

  return (
    <div className="product-wrap product text-center">
      <figure className="product-media">
        <Link href={`/product/${product.slug}`} passHref>
          <a>
            <div className="image">
              <Image
                src={product.thumbs[0].url}
                alt={`${product.name}`}
                width="300"
                height="338"
              />
            </div>
            <div className="image">
              <Image
                src={product.thumbs[1].url}
                alt={`${product.name}`}
                width="300"
                height="338"
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
        <div className="product-action-vertical">
          <button
            className="btn-product-icon"
            title="WishList"
            style={{ cursor: 'pointer' }}
            onClick={(e) =>
              wishlistHandle(
                product._id,
                product.name,
                product.thumbs[0].url,
                currency,
                discountedPrice,
                product.slug
              )
            }
          >
            {wishItem === true ? (
              <AiFillHeart style={{ fontSize: '2rem', color: '#b50000' }} />
            ) : (
              <AiOutlineHeart style={{ fontSize: '2rem' }} />
            )}
          </button>
        </div>
      </figure>
      <div className="product-details">
        <h3 className="product-name">
          <Link href={`/product/${product.slug}`} passHref>
            <a>
              {locale === 'en' && product.name}{' '}
              {locale === 'ar' && product.name_ar}{' '}
              {locale === 'ru' && product.name_ru}
            </a>
          </Link>
        </h3>
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

        <div className="product-pa-wrapper">
          <div className="product-price">
            <ins className="new-price">
              {' '}
              {currency}
              {discountedPrice.toFixed(2)}
            </ins>
            {discountedPrice.toFixed(2) !== product.price.toFixed(2) && (
              <del className="old-price old-price-med">
                {currency}
                {product.price.toFixed(2)}
              </del>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BriefView;
