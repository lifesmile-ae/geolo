import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';
import {TbDownload} from 'react-icons/tb';

const Orders = ({ active, sessionval }) => {
  const [orders, setOrders] = useState([]);
  const { t } = useTranslation('account');
  useEffect(() => {
    axios
      .get('/api/order?userId=' + sessionval.user._id)
      .then((res) => {
        setOrders(res.data.message);
      })
      .catch(({ data }) => {
        toast.error(data.message);
      });
  }, []);

  const getdetail = (arr) => {
    const abc = arr.slice(-1)[0];
    return abc.type;
  };
  return (
    <div
      className={`tab-pane ${active === 'orders' && ' active in'}`}
      id="account-orders"
    >

      <table className="shop-table account-orders-table mb-6">
        <thead>
          <tr>
            <th className="order-id"> {t('account:orders')}</th>
            <th className="order-date"> {t('account:date')}</th>
            <th className="order-status"> {t('account:status')}</th>
            <th className="order-total">{t('account:total')}</th>
            <th className="order-actions">{t('account:actions')}</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order, i) => (
            <tr key={i}>
              <td className="order-id">#{order.invoiceNumber}</td>
              <td className="order-date">
                {dayjs(order.createdAt).format('MMMM D, YYYY')}
              </td>
              <td
                className="order-status"
                style={{ textTransform: 'capitalize' }}
              >
                {getdetail(order.orderStatus)}
              </td>
              <td className="order-total">
                <span className="order-price">
                  {order.cartitems.cartItems[0].currency} {order.totalAmount}
                </span>{' '}
                {t('account:for')}
                <span className="order-quantity">
                  {' '}
                  {order.cartitems.cartItems.length}
                </span>{' '}
                {t('account:item')}
              </td>
              <td className="order-action">
                <a
                  href="#"
                  className="btn-icon btn-success btn-sm btn-rounded"
                >
                  <TbDownload className='download-icon'/>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
