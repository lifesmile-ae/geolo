import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'next-i18next';

const Address = ({ active, sessionval }) => {
  const [address, setAddress] = useState([]);
  useEffect(() => {
    axios
      .get(`/api/auth/shipping?user=${sessionval.user._id}`)
      .then(({ data }) => {
        setAddress(data.message);
      });
  }, []);
  const { t } = useTranslation('account');
  return (
    <div
      className={`tab-pane ${active === 'address' && ' active in'}`}
      id="account-addresses"
    >
      <p className="mb-1">{t('account:followingaddress')}</p>
      <div className="row">
        {address.length > 0 ? (
          <div className="col-sm-6 mb-6">
            {address.map((item, index) => (
              <div
                className="ecommerce-address billing-address pr-lg-8"
                key={index}
              >
                <h4 className="title title-underline ls-25 font-weight-bold">
                  {t('account:billingaddress')}
                </h4>
                <address className="mb-4">
                  <table className="address-table">
                    <tbody>
                      <tr>
                        <th>{t('account:name')}</th>
                        <td>{item.fullname}</td>
                      </tr>
                      <tr>
                        <th>{t('account:street')}</th>
                        <td>{item.street}</td>
                      </tr>
                      <tr>
                        <th>{t('account:apartment')}</th>
                        <td>{item.apartment}</td>
                      </tr>
                      <tr>
                        <th>{t('account:mobile')}</th>
                        <td>{item.mobile}</td>
                      </tr>
                      <tr>
                        <th>{t('account:country')}</th>
                        <td>{item.country}</td>
                      </tr>
                    </tbody>
                  </table>
                </address>
              </div>
            ))}
          </div>
        ) : (
          <div className="col-sm-6 mb-6">
            <div className="ecommerce-address billing-address pr-lg-8">
              <h4 className="title title-underline ls-25 font-weight-bold">
                {t('account:notsetaddress')}
              </h4>
              <a
                href="#"
                className="btn btn-link btn-underline btn-icon-right text-primary"
              >
                {t('account:addnewaddress')}
                <i className="w-icon-long-arrow-right"></i>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Address;
