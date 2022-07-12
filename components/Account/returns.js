import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';

const Returns = ({ active, sessionval }) => {
  const [returns, setReturns] = useState(false);
  const { t } = useTranslation('account');
  return (
    <div
      className={`tab-pane ${active === 'returns' && ' active in'}`}
      id="account-dashboard"
    >
      {returns ? (
        <>
          <h2 className="greeting">
            {t('account:sorry')}
            <span className="text-dark font-weight-regular">
              {sessionval.user.firstname}
            </span>
          </h2>

          <p className="mb-4">{t('account:noneoftheitems')}</p>
          <a
            style={{ cursor: 'pointer' }}
            onClick={(e) => setReturns(!returns)}
            className="btn btn-dark btn-rounded btn-icon-right"
          >
            {t('account:back')}
            <i className="w-icon-long-arrow-left"></i>
          </a>
        </>
      ) : (
        <>
          {' '}
          <h2 className="greeting">
            {t('account:hi')}{' '}
            <span className="text-dark font-weight-regular">
              {sessionval.user.firstname}
            </span>
          </h2>
          <p className="mb-4">{t('account:notissued')}</p>
          <a
            style={{ cursor: 'pointer' }}
            onClick={(e) => setReturns(!returns)}
            className="btn btn-dark btn-rounded btn-icon-right"
          >
            {t('account:createnewreturn')}
            <i className="w-icon-long-arrow-right"></i>
          </a>
        </>
      )}
    </div>
  );
};

export default Returns;
