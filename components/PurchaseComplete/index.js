import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { clearCart, removeCartValue } from '../../redux/actions/cartActions';
import { useDispatch } from 'react-redux';

const Index = ({ order }) => {
  const { t } = useTranslation('cart');
  const router = useRouter();
  const dispatch = useDispatch();
  const [paymentIntent, setPaymentIntent] = useState(null);

  useEffect(() => {
    if (router.query.payment_intent) {
      axios
        .get(`/api/payment?paymentIntentId=${router.query.payment_intent}`)
        .then(({ data }) => {
          setPaymentIntent(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [router.query.payment_intent]);

  useEffect(() => {
    if (paymentIntent) {
      const data = {
        orderId: router.query.OrderId,
        paymentStatus: paymentIntent.status.status,
      };
      axios
        .put(`/api/order`, data)
        .then(({ data }) => {
          if (data.success) {
            dispatch(clearCart());
            dispatch(removeCartValue());
            router.push('/complete?OrderId=' + router.query.OrderId);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [paymentIntent]);

  const orderStatus = (order) => {
    let stats = '';
    order?.message?.orderStatus?.map((a) => {
      if (a.isCompleted === false) {
        stats = a.type;
      }
    });
    return stats;
  };
  return (
    <>
      <div className="page-content mb-10 pb-2 mt-8">
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <div className="order-success text-center font-weight-bold">
                {t('cart:thankyou')}
                <div className="order-process-text font-weight-normal">
                  {t('cart:processingorder')}
                </div>
              </div>
              <div className="order-details-wrapper mb-5 mt-5">
                <h4 className="title text-uppercase ls-25 mb-5">
                  {t('cart:orderDetails')}
                </h4>
                <table className="order-table">
                  <thead>
                    <tr>
                      <th className="text-dark"> {t('cart:product')}</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.message.cartitems.cartItems.map((a, i) => (
                      <tr key={i}>
                        <td>
                          <Link href={`/product/${a.slug}`} passHref>
                            <a>{a.name}</a>
                          </Link>
                          <strong> x {a.productQuantity}</strong>
                          <br />
                          {t('cart:itemcode')} {a.productCode}
                        </td>
                        <td>
                          {a.currency} {a.discountedPrice} x {a.productQuantity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th> {t('cart:subtotal')}</th>
                      <td>
                        {order.message.currency} {order.message.subtotal}
                      </td>
                    </tr>
                    <tr>
                      <th>{t('cart:shipping')}</th>
                      <td>
                        {' '}
                        {order.message.shipping === 0
                          ? t('cart:freeshipping')
                          : order.message.currency +
                            ' ' +
                            order.message.shipping}
                      </td>
                    </tr>
                    <tr>
                      <th>{t('cart:smilepointredeemed')}</th>
                      <td>
                        {order.message.smilepoints
                          ? order.message.smilepoints
                          : 0}
                        {'  '}
                        {t('cart:smilepoints')}
                      </td>
                    </tr>

                    {order.message.discount > 0 && (
                      <tr>
                        <th>
                          {' '}
                          {t('cart:coupondiscount')} <br />({' '}
                          {order.message.coupon})
                        </th>
                        <td>
                          {order.message.currency} {order.message.discount}
                        </td>
                      </tr>
                    )}
                    <tr className="total">
                      <th className="border-no">Total:</th>
                      <td className="border-no">
                        {' '}
                        {order.message.totalAmount}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            <div className="col-md-3">
              <ul className="order-view list-style-none">
                <li>
                  <label>{t('cart:orderno')}</label>
                  <strong>#{order?.message?.invoiceNumber}</strong>
                </li>
                <li>
                  <label>{t('cart:status')}</label>
                  <strong style={{ textTransform: 'capitalize' }}>
                    {orderStatus(order)}
                  </strong>
                </li>
                <li>
                  <label>{t('cart:date')}</label>
                  <strong>
                    {dayjs(order?.message?.createdAt).format('MMMM D, YYYY')}
                  </strong>
                </li>
                <li>
                  <label>{t('cart:total')}</label>
                  <strong>{order.message.totalAmount}</strong>
                </li>
                <li>
                  <label>{t('cart:paymentmethod')}</label>
                  <strong>
                    {order.message.paymentType === 'cash' ? (
                      <>{t('cart:cashondelivery')}</>
                    ) : (
                      <>{t('cart:bankpayment')}</>
                    )}
                  </strong>
                </li>
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8"></div>
          </div>
          <Link href="/" passHref>
            <a className="btn btn-dark btn-rounded btn-icon-left btn-back mt-6">
              <i className="w-icon-long-arrow-left"></i>
              {t('cart:continueShopping')}
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Index;
