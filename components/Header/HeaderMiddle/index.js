import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { showmobilesidebar } from '../../../redux/actions/siteActions';
import {
  showcartsidebar,
  hidecartsidebar,
  removecartItem,
} from '../../../redux/actions/cartActions';
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Index = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('home');
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loader, setLoader] = useState(false);
  const [searchOverlay, setSearchOverlay] = useState(false);
  const cartState = useSelector((state) => state.cartSidebar.cart);
  const cartItems = useSelector((state) => state.addcartItem.cart.cartItems);
  const wishItems = useSelector(
    (state) => state.wishListItems.wishList.wishItems
  );

  const handleClick = (e, path) => {
    if (path === '/checkout') {
      dispatch(hidecartsidebar());
    }
  };

  const searchHandler = (e) => {
    e.preventDefault();
    setSearchText('');
    setSearchOverlay(false);
    router.push(`/product?search=${searchText}`);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setLoader(true);
    axios.get(`/api/product?search=${e.target.value}`).then(({ data }) => {
      setLoader(false);
      setSuggestions(data);
    });
  };

  return (
    <div className="header-middle">
      <div className="container">
        <div className="header-left mr-md-4">
          <a
            href="#"
            className="mobile-menu-toggle  w-icon-hamburger"
            aria-label="menu-toggle"
            onClick={() => dispatch(showmobilesidebar())}
          ></a>
          <Link href="/" passHref>
            <a className="logo ml-lg-0">
              <img
                src="/assets/image/logo/lifesmile.svg"
                alt="logo"
                width="100"
                height="45"
              />
            </a>
          </Link>
          <div
            className={searchOverlay ? 'opened' : ''}
            onClick={(e) => {
              setSearchOverlay(false), setSearchText('');
            }}
          >
            <div className="search-overlay"></div>
          </div>

          <form
            method="post"
            onSubmit={searchHandler}
            className={`header-search hs-expanded hs-round d-md-flex input-wrapper ${
              cartState === 'show' && 'z-index-low'
            }`}
          >
            <input
              type="text"
              className="form-control"
              name="search-box"
              placeholder={t('home:searchtext')}
              onFocus={(event) => {
                event.target.setAttribute('autocomplete', 'off');
              }}
              value={searchText}
              onChange={handleSearch}
              required
              autoComplete="new-searcher"
              onClick={(e) => setSearchOverlay(true)}
            />
            <button className="btn btn-search" type="submit">
              <i className="w-icon-search"></i>
            </button>
            <div
              className={`live-search-list ${searchText === '' && 'd-none'}`}
            >
              <div className="autocomplete-suggestions">
                {loader && (
                  <div className="w-loading">
                    <i></i>
                  </div>
                )}

                {suggestions?.products?.length !== 0 ? (
                  suggestions?.products?.map((item, i) => (
                    <div className="autocomplete-suggestion" key={i}>
                      <Image
                        className="search-image"
                        height={60}
                        width={60}
                        alt={item.name}
                        src={item.thumbs[0].url}
                      />
                      <Link href={`/product/${item.slug}`} passHref>
                        <div
                          className="search-info"
                          onClick={(e) => {
                            setSearchText('');
                            setSearchOverlay(false);
                          }}
                        >
                          <div className="search-name">{item.name}</div>
                          <span className="search-price">
                            <span className="woocommerce-Price-amount amount">
                              <bdi>
                                <span className="woocommerce-Price-currencySymbol">
                                  AED
                                </span>
                                {item.price}{' '}
                              </bdi>
                            </span>
                          </span>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="autocomplete-suggestion">
                    <div className="search-info">
                      <div className="search-name">Product Not Found</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
        <div className="header-right ml-4">
          <div className="header-call d-xs-show d-lg-flex align-items-center">
            <a href="tel:#" className="w-icon-call"></a>
            <div className="call-info d-lg-show">
              <h4 className="chat font-weight-normal font-size-md text-normal ls-normal text-white mb-0">
                <a
                  href="mailto:ecommerce@lifesmile.ae"
                  className="text-capitalize"
                >
                  {t('home:livechat')}
                </a>{' '}
                {t('home:or')}
              </h4>
              <a
                href="tel:+971521573960"
                className="phone-number font-weight-bolder ls-50"
              >
                {t('home:number')}
              </a>
            </div>
          </div>
          <Link href="/wishlist" passHref>
            <a className="wishlist label-down link d-xs-show cart-toggle">
              <i className="w-icon-heart">
                <span className="wish-count">{wishItems.length}</span>
              </i>
              <span className="wishlist-label d-lg-show">Wishlist</span>
            </a>
          </Link>

          <div
            className={`dropdown cart-dropdown cart-offcanvas mr-0 mr-lg-2 ${
              cartState === 'show' ? 'opened' : ''
            }`}
          >
            <div
              className="cart-overlay"
              onClick={() => dispatch(hidecartsidebar())}
            ></div>
            <a
              className="cart-toggle label-down link"
              onClick={() => dispatch(showcartsidebar())}
              style={{ cursor: 'pointer' }}
            >
              <i className="w-icon-cart">
                <span className="cart-count">{cartItems.length}</span>
              </i>
              <span className="cart-label">{t('home:cart')}</span>
            </a>
            <div className="dropdown-box">
              {cartItems.length === 0 ? (
                <>
                  {' '}
                  <div className="emptycart">
                    <Image
                      src="/assets/image/empty-cart.png"
                      height="140"
                      width="160"
                      alt="Hello"
                    />
                  </div>
                  <div className="cart-empty-header mt-2">
                    {t('home:cartisempty')}
                  </div>
                  <a
                    onClick={() => dispatch(hidecartsidebar())}
                    className="btn btn-primary btn-tertiary btn-rounded mt-4"
                    style={{ cursor: 'pointer' }}
                  >
                    {t('home:continueshopping')}
                    <i className="w-icon-long-arrow-right"></i>
                  </a>
                </>
              ) : (
                <>
                  <div className="cart-header">
                    <span>{t('home:shoppingcart')}</span>
                    <a
                      className="btn-close"
                      onClick={() => dispatch(hidecartsidebar())}
                      style={{ cursor: 'pointer' }}
                    >
                      {t('home:close')}
                      <i className="w-icon-long-arrow-right"></i>
                    </a>
                  </div>
                  <div className="products product-more">
                    {cartItems?.map((item, i) => (
                      <div className="product product-cart" key={i}>
                        <div className="product-detail">
                          <Link href={item.slug} passHref>
                            <a className="product-name">{item.name}</a>
                          </Link>
                          <div className="price-box">
                            <span className="product-quantity">
                              {item.productQuantity}
                            </span>
                            <span className="product-price">
                              {item.currency} {item.discountedPrice.toFixed(2)}
                            </span>
                          </div>
                          <span style={{ fontWeight: '400' }}>
                            [{item.productCode}]
                          </span>
                        </div>
                        <figure className="product-media">
                          <div className="image">
                            <a>
                              <Image
                                src={item.productImage}
                                alt="product"
                                height="100"
                                width="94"
                              />
                            </a>
                          </div>
                        </figure>
                        <button
                          className="btn btn-link btn-close"
                          aria-label="button"
                          onClick={() =>
                            dispatch(removecartItem(item.productCode))
                          }
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="cart-total">
                    <label>
                      {t('home:subtotal')}(
                      {cartItems.reduce((a, c) => a + c.productQuantity, 0)}{' '}
                      {t('home:items')}) :{' '}
                    </label>
                    <span className="price">
                      {cartItems[0]?.currency}{' '}
                      {cartItems
                        .reduce(
                          (a, c) => a + c.productQuantity * c.discountedPrice,
                          0
                        )
                        .toFixed(2)}
                    </span>
                  </div>
                  <div className="cart-action cart-action-column">
                    <Link href="/checkout">
                      <a
                        onClick={(e) => handleClick(e, '/checkout')}
                        className="btn btn-primary btn-rounded"
                      >
                        {t('home:checkout')}
                      </a>
                    </Link>
                    <a
                      onClick={() => dispatch(hidecartsidebar())}
                      className="btn btn-primary btn-tertiary btn-rounded"
                    >
                      {t('home:continueshopping')}
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
