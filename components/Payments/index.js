import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { useSession } from 'next-auth/client';
import StripeContainer from './StripeContainer';
import axios from 'axios';
import { clearCart, removeCartValue } from '../../redux/actions/cartActions';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import useWindowSize from '../../hooks/useWindowSize';
import { BsCreditCard2Back } from 'react-icons/bs';
import { GiTakeMyMoney } from 'react-icons/gi';

const Index = ({ session }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('cart');
  const router = useRouter();
  const size = useWindowSize();
  const cartItems = useSelector((state) => state.addcartItem.cart.cartItems);
  const currency = useSelector((state) => state.siteCurrency.currency);
  const cartValue = useSelector((state) => state.cartValue.cart.cartValue);
  const [subtotal, setSubtotal] = useState(cartValue.subtotal);
  const [total, setTotal] = useState(cartValue.total);
  const [shipping, setShipping] = useState(cartValue.shipping);

  const [paymentMethod, setPaymentMethod] = useState('credit');

  const [userPoint, setUserPoint] = useState(0);

  const [smilepay, setSmilepay] = useState(0);
  const [redeem, setRedeem] = useState(false);

  const [clientSecret, setClientSecret] = useState('');
  const [paymentIntentId, setPaymentIntentId] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');

  useEffect(() => {
    const getUserPoints = async () => {
      if (session) {
        const { data } = await axios.get(
          `/api/user/getpoints?userId=${session.user._id}`
        );
        setUserPoint(data.message.currentPoint);
      }
    };
    getUserPoints();
  }, [session]);

  useEffect(() => {
    fetch('/api/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ total, currency, type: 'create' }),
    })
      .then((res) => res.json())
      .then(
        (data) => (
          setClientSecret(data.clientSecret),
          setPaymentIntentId(data.paymentIntentId)
        )
      );
  }, [total, currency]);

  const orderdata = {
    subtotal: subtotal,
    shipping: shipping,
    user: session?.user._id,
    totalAmount: total,
    paymentStatus: 'pending',
    paymentType: 'cash',
    reedemedPoints: userPoint,
    reedemedAmount: smilepay,
    smilepoints: smilepay,
    currentPoint: userPoint,
    discount: cartValue.discount,
    coupon: cartValue.coupon,
    currency: currency,
    customerNotes: customerNotes,
  };

  useEffect(() => {
    const reddemed = Math.ceil(
      (process.env.SMILE_POINT_RATE * userPoint).toFixed(2)
    );
    setSmilepay(Math.ceil(reddemed.toFixed(2)));
    if (redeem) {
      fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          total: Math.ceil(total - reddemed),
          currency,
          type: 'update',
          paymentIntentId: paymentIntentId,
        }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
      setTotal(Math.ceil(total - reddemed));
    } else if (!redeem) {
      setTotal(Math.ceil(total + reddemed));
    }
  }, [redeem]);

  const paybycash = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(`/api/order`, orderdata, config);
    if (data.success) {
      dispatch(clearCart());
      dispatch(removeCartValue());
      router.push('/complete?OrderId=' + data.message._id);
    }
  };

  return (
    <div className="login-page mb-10 pb-1">
      <div className="page-content">
        <div className="container">
          {size.width > 768 && (
            <nav className="breadcrumb-nav">
              <div className="container">
                <ul className="breadcrumb shop-breadcrumb bb-no">
                  <li className="passed">
                    <Link href="/checkout">
                      <a>{t('cart:shoppingcart')}</a>
                    </Link>
                  </li>
                  <li className="passed">
                    <Link href="/shipping">
                      <a>{t('cart:shippingaddress')}</a>
                    </Link>
                  </li>
                  <li className="active">
                    <Link href="/payment">
                      <a>{t('cart:payment')}</a>
                    </Link>
                  </li>
                  <li>
                    <a>{t('cart:ordercomplete')}</a>
                  </li>
                </ul>
              </div>
            </nav>
          )}
          <div className="container">
            <div className="row gutter-lg mb-10">
              <div className="col-lg-2"></div>
              <div className="col-lg-6">
                {userPoint > 0 && (
                  <div className="switch-alert bg-grey mb-4 br-lg d-flex">
                    <label className="switch-btn mt-08">
                      <input
                        type="checkbox"
                        checked={redeem}
                        onChange={(e) => setRedeem(!redeem)}
                      />
                      <span className="switch-slider round"></span>
                    </label>
                    <p className="mb-0 text-grey">
                      <span className="font-weight-bold text-points">
                        {' '}
                        {t('cart:availablebalance')} {userPoint}{' '}
                      </span>{' '}
                      <br />
                      <span className="text-points">
                        {t('cart:smilepointseq')}{' '}
                        {(process.env.SMILE_POINT_RATE * userPoint).toFixed(2)}
                        {' ' + currency}.{' '}
                      </span>
                    </p>
                  </div>
                )}
                {redeem && (
                  <div className="alert alert-icon alert-success alert-bg alert-inline show-code-action mb-4">
                    <h4 className="alert-title">
                      <i className="fas fa-check"></i>
                      {t('cart:welldone')}
                    </h4>{' '}
                    {t('cart:reedemedmsg')}
                  </div>
                )}

                <div className="flex-container">
                  <div
                    className="tab tab-nav-boxed tab-nav-outline show-code-action"
                    style={{ width: '100%' }}
                  >
                    <div className="row">
                      <ul className="nav payment-tab" role="tablist">
                        <div className="col-lg-6 col-md-12">
                          <li className="nav-item">
                            <a
                              className={`nav-link ${
                                paymentMethod === 'credit' && 'active'
                              }`}
                              style={{ cursor: 'pointer' }}
                              onClick={() => setPaymentMethod('credit')}
                            >
                              <BsCreditCard2Back className="payment-icons" />
                              {t('cart:paywithcard')}
                            </a>
                          </li>
                        </div>
                        <div className="col-lg-6 col-md-12">
                          <li className="nav-item">
                            <a
                              className={`nav-link ${
                                paymentMethod === 'cash' && 'active'
                              }`}
                              style={{ cursor: 'pointer' }}
                              onClick={() => setPaymentMethod('cash')}
                            >
                              <GiTakeMyMoney className="payment-icons" />
                              {t('cart:paywithcash')}
                            </a>
                          </li>
                        </div>
                      </ul>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="tab-content mt-5 stripe-pay mb-4">
                          <div
                            className={`tab-pane ${
                              paymentMethod === 'credit' && 'active in'
                            }`}
                            id="tab1-4"
                          >
                            <StripeContainer
                              clientSecret={clientSecret}
                              orderdata={orderdata}
                            />
                          </div>
                          <div
                            className={`tab-pane ${
                              paymentMethod === 'cash' && 'active in'
                            }`}
                            id="tab1-5"
                          >
                            <div className="alert alert-icon alert-warning alert-bg alert-inline show-code-action">
                              {t('cart:chargenote')}
                            </div>
                            {size.width < 767 ? (
                              <div className="sticky-btn">
                                <a
                                  onClick={paybycash}
                                  className="btn btn-block btn-primary btn-icon-right btn-rounded btn-checkout"
                                >
                                  {t('cart:paywithcash')}
                                </a>
                              </div>
                            ) : (
                              <a
                                onClick={paybycash}
                                className="btn btn-block btn-primary btn-icon-right btn-rounded mt-4 btn-checkout"
                              >
                                {t('cart:paywithcash')}
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 mb-4">
                      <h4 className="text-left">Customer Notes</h4>
                      <textarea
                        rows="6"
                        className="customer-notes"
                        placeholder="Enter your notes here"
                        value={customerNotes}
                        onChange={(e) => setCustomerNotes(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
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
                  <div className="subtotal display-flex mt-1">
                    <p className="subtotal-left">
                      {t('cart:subtotal')} (
                      {cartItems.reduce((a, c) => a + c.productQuantity, 0)}{' '}
                      {t('cart:items')})
                    </p>
                    <p className="subtotal-right flex-ml-auto font-weight-500">
                      {subtotal} {currency}
                    </p>
                  </div>
                  <div className="discount display-flex mt--1">
                    <p className="discount-left">
                      {t('cart:shipping')}{' '}
                      <span className="font-sm-12">
                        <Link href="/" passHref>
                          {t('cart:details')}
                        </Link>
                      </span>
                    </p>
                    <p className="discount-right flex-ml-auto font-weight-500">
                      {shipping === 0
                        ? t('cart:freeshipping')
                        : shipping + ' ' + currency}
                    </p>
                  </div>

                  {cartValue.discount > 0 && (
                    <>
                      <div className="discount display-flex">
                        <p className="discount-left">
                          {t('cart:coupondiscount')}
                        </p>
                        <p className="discount-right flex-ml-auto font-weight-500">
                          {cartValue.discount} {currency}
                        </p>
                      </div>
                    </>
                  )}

                  {redeem && (
                    <>
                      <div className="discount display-flex">
                        <p className="discount-left">
                          {' '}
                          {t('cart:smilepoints')}
                        </p>
                        <p className="discount-right flex-ml-auto font-weight-500">
                          {smilepay} {currency}
                        </p>
                      </div>
                    </>
                  )}

                  <div className="line"></div>
                  <div className="line"></div>
                  <div className="discount display-flex mt-3">
                    <h3>{t('cart:total')}</h3>
                    <h3 className="discount-right flex-ml-auto font-weight-500">
                      {currency} {total}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
