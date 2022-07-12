import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import OrderDesktop from '../OrdersDesktop';
import OrderMobile from '../OrdersMobile';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { useSession } from 'next-auth/client';
import axios from 'axios';
import { useTranslation } from 'next-i18next';
import useWindowSize from '../../../hooks/useWindowSize';
import { useRouter } from 'next/router';
import { cartValue } from '../../../redux/actions/cartActions';

const Index = () => {
  const size = useWindowSize();
  const dispatch = useDispatch();
  const { t } = useTranslation('cart');
  const router = useRouter();
  const cartItems = useSelector((state) => state.addcartItem.cart.cartItems);
  const currency = useSelector((state) => state.siteCurrency.currency);
  const [coupon, setCoupon] = useState('');
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [session] = useSession();
  const [loading, setLoading] = useState(false);
  const [couponErr, setCouponErr] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    setSubtotal(
      cartItems
        .reduce((a, c) => a + c.productQuantity * c.discountedPrice, 0)
        .toFixed(2)
    );

    if (subtotal > 0 && subtotal < 100) {
      setShipping(20);
    } else if (subtotal > 100 && subtotal < 200) {
      setShipping(10);
    } else if (subtotal > 200) {
      setShipping(0);
    }
    setDiscount(((couponDiscount / 100) * subtotal).toFixed(2));
    setTotal(
      (Math.ceil(subtotal) - Math.ceil(discount) + Math.ceil(shipping)).toFixed(
        2
      )
    );
  }, [cartItems, subtotal, shipping, couponDiscount, discount]);

  const saveCart = async (path) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const cartData = {
      user: session.user._id,
      cartItems: cartItems,
    };
    const { data } = await axios.post('/api/cart', cartData, config);
    if (data.success) {
      router.push(path);
    }
  };

  const handleClick = (e, path) => {
    let cartvalue = {
      subtotal,
      total,
      shipping,
      discount,
      coupon,
    };
    dispatch(cartValue(cartvalue));
    if (session) {
      saveCart(path);
    } else {
      router.push(path);
    }
  };

  const applyCoupon = async () => {
    setLoading(true);
    let device = '';
    size.width < 767 ? (device = 'mobile') : (device = 'desktop');
    try {
      const code = coupon.toUpperCase();
      const { data } = await axios.get(`/api/coupon?code=${code}`);
      if (data.status === 'fail') {
        setLoading(false);
        setCouponErr(data.message);
      } else {
        setLoading(false);
        if (data.data.device.includes(device)) {
          setCouponErr('');
          setCouponDiscount(data.data.discount);
        } else {
          setCouponErr('Sorry !!! Coupon Code Invalid');
          return;
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <nav className={`breadcrumb-nav ${size.width < 767 && 'd-none'}`}>
        <div className="container">
          <ul className="breadcrumb shop-breadcrumb bb-no">
            <li className="active">
              <Link href="/checkout">
                <a>{t('cart:shoppingcart')}</a>
              </Link>
            </li>
            <li>
              <a>{t('cart:shippingaddress')}</a>
            </li>
            <li>
              <a>{t('cart:payment')}</a>
            </li>
            <li>
              <a>{t('cart:ordercomplete')}</a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container">
        <div className="row gutter-lg mb-10">
          <div className="col-lg-8">
            <div className="flex-container">
              {size.width < 767 ? (
                <OrderMobile
                  subtotal={subtotal}
                  total={total}
                  shipping={shipping}
                  discount={discount}
                />
              ) : (
                <OrderDesktop />
              )}
            </div>
          </div>
          <div className="col-lg-4">
            <div className="cartupdater d-none">
              <Image
                src="/assets/images/pages/loader.gif"
                height="100"
                width="200"
                alt="loader"
              />
            </div>
            <div className="checkout-steps">
              <h3>{t('cart:ordersummary')}</h3>
              <div className="input-wrapper-inline">
                <input
                  type="text"
                  name="coupon_code"
                  className="form-control form-control-md mr-1 mb-2 coupon-code"
                  placeholder={t('cart:couponCode')}
                  id="coupon_code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />

                {couponDiscount > 0 ? (
                  <button
                    type="button"
                    className="btn button btn-rounded btn-coupon mb-2 btn-primary"
                    name="apply_coupon"
                    value="Apply coupon"
                    onClick={(e) => (setCouponDiscount(0), setDiscount(0))}
                    style={{ display: 'flex' }}
                  >
                    {t('cart:remove')}
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn button btn-rounded btn-coupon mb-2 btn-primary"
                    name="apply_coupon"
                    value="Apply coupon"
                    onClick={(e) => applyCoupon()}
                    style={{ display: 'flex' }}
                  >
                    {loading ? <div className="loader"></div> : t('cart:apply')}
                  </button>
                )}
              </div>
              {couponErr !== '' && (
                <p className="invalid">{t('cart:couponErr')}</p>
              )}
              {couponDiscount > 0 && (
                <p className="success">{t('cart:couponadded')}</p>
              )}

              <div className="subtotal display-flex mt-1">
                <p className="subtotal-left">
                  {t('cart:subtotal')} (
                  {cartItems.reduce((a, c) => a + c.productQuantity, 0)}{' '}
                  {t('cart:items')})
                </p>
                <p className="subtotal-right flex-ml-auto font-weight-500">
                  {currency} {subtotal}
                </p>
              </div>
              <div className="discount display-flex mt--1">
                <p className="discount-left">
                  {t('cart:shipping')}
                  <span className="font-sm-12">
                    <Link href="/" passHref>
                      {t('cart:details')}
                    </Link>
                  </span>
                </p>
                <p className="discount-right flex-ml-auto font-weight-500">
                  {shipping === 0
                    ? t('cart:freeshipping')
                    : currency + ' ' + shipping}
                </p>
              </div>

              {discount > 0 && (
                <>
                  <div className="line"></div>
                  <div className="discount display-flex mt-1">
                    <p className="discount-left">{t('cart:coupondiscount')}</p>
                    <p className="discount-right flex-ml-auto font-weight-500">
                      {discount}
                    </p>
                  </div>
                </>
              )}

              <div className="line"></div>
              <div className="discount display-flex mt-3">
                <h3>{t('cart:total')}</h3>
                <p className="discount-right flex-ml-auto font-weight-500">
                  <span>
                    {currency} {total}
                  </span>
                </p>
              </div>
              {size.width > 767 && (
                <a
                  onClick={(e) => handleClick(e, '/login?redirect=/shipping')}
                  className="btn btn-block btn-primary btn-icon-right btn-rounded  btn-checkout"
                >
                  {t('cart:checkout')}
                  <i className="w-icon-long-arrow-right"></i>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
