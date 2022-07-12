import axios from 'axios';
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';

const Points = ({ active, sessionval }) => {
  const [points, setPoints] = useState([]);
  useEffect(() => {
    axios
      .get('/api/auth/points?user=' + sessionval.user._id)
      .then(({ data }) => {
        setPoints(data.message);
      })
      .catch(({ data }) => {});
  }, []);
  const { t } = useTranslation('account');
  return (
    <div
      className={`tab-pane ${active === 'points' && ' active in'}`}
      id="account-orders"
    >
      <div className="icon-box icon-box-side icon-box-light">
        <span className="icon-box-icon icon-orders">
          <i className="w-icon-orders"></i>
        </span>
        <div className="icon-box-content">
          <h4 className="icon-box-title text-capitalize ls-normal mb-0">
            {t('account:youhavecurrently')} {points.currentPoint}{' '}
            {t('account:smilepoints')}
          </h4>
        </div>
      </div>

      <table className="shop-table account-orders-table mb-6">
        <thead>
          <tr>
            <th className="order-id"></th>
            <th className="order-date"> {t('account:date')}</th>
            <th className="order-status"> {t('account:status')}</th>
            <th className="order-total"> {t('account:points')}</th>
          </tr>
        </thead>
        <tbody>
          {points?.pointsLog?.map((point, i) => (
            <tr key={i}>
              <td className="order-id">#{i + 1}</td>
              <td className="order-date">
                {dayjs(point.date).format('MMMM D, YYYY')}
              </td>
              <td
                className="order-status"
                style={{ textTransform: 'capitalize' }}
              >
                {point.message}
              </td>
              <td className="order-total">
                <span className="order-price">{point.points}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Points;
