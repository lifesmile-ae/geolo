import React from 'react';
import { useState, useEffect } from 'react';
import validator from 'validator';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useTranslation } from 'next-i18next';
import useWindowSize from '../../hooks/useWindowSize';

const Ship = ({ shippingadd, session }) => {
  const router = useRouter();
  const size = useWindowSize();

  const { t } = useTranslation('cart');
  const [countries, setCountries] = useState([]);

  const [country, setCountry] = useState(
    shippingadd !== null && shippingadd.country
  );
  const [street, setStreet] = useState(
    shippingadd !== null ? shippingadd.street : ''
  );
  const [apartment, setApartment] = useState(
    shippingadd !== null ? shippingadd.apartment : ''
  );
  const [mobile, setMobile] = useState(
    shippingadd !== null ? shippingadd.mobile : ''
  );
  const [fullname, setFullname] = useState(
    shippingadd !== null ? shippingadd.fullname : ''
  );

  const [apartmentErr, setApartmentErr] = useState('');
  const [streetErr, setStreetErr] = useState('');
  const [mobileErr, setMobileErr] = useState('');
  const [fullnameErr, setFullnameErr] = useState('');

  useEffect(() => {
    if (shippingadd == null) {
      axios
        .get('https://geolocation-db.com/json/')
        .then(({ data }) => {
          setCountry(data.country_code);
        })
        .catch((err) => {
          setCountry({ country: 'AE' });
        });
    }

    fetch('https://restcountries.com/v2/all')
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
      });
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (street == '') {
      return setStreetErr('Please enter your home address...');
    }
    if (mobile == '') {
      return setMobileErr('Please enter your mobile number');
    }
    if (
      !validator.isMobilePhone(mobile, 'ar-AE' | 'en-US' | 'ar-EG' | 'ar-SY')
    ) {
      return setMobileErr('Please provide a valid mobile number');
    }
    if (mobile.length < 9 || mobile.length > 10) {
      return setMobileErr('Please provide a valid mobile number');
    }
    if (fullname == '') {
      return setFullnameErr('Please enter your full name');
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const value = {
      country,
      street,
      apartment,
      mobile,
      fullname,
      userid: session.user._id,
    };

    if (shippingadd === null) {
      const { data } = await axios.post('/api/auth/shipping', value, config);
      if (data.success) {
        router.push('/payment');
      } else {
        return setStreetErr('Something Wrong Please Try Again');
      }
    }
    if (shippingadd !== null) {
      const { data } = await axios.put('/api/auth/shipping', value, config);
      if (data.success) {
        router.push('/payment');
      } else {
        return setStreetErr('Something Wrong Please Try Again');
      }
    }
  };

  return (
    <div className="login-page mb-15 pb-1">
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
                  <li className="active">
                    <Link href="/shipping">
                      <a>{t('cart:shippingaddress')}</a>
                    </Link>
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
          )}

          <section className="mb-10 pb-1">
            <div className="accordion accordion-bg accordion-gutter-md accordion-border show-code-action">
              <div className="card">
                <div className="card-header">
                  <a href="#collapse1-1" className="collapse">
                    {t('cart:editaddress')}
                  </a>
                </div>
                <div id="collapse1-1" className="card-body expanded">
                  <form onSubmit={submitHandler}>
                    <div className="col-lg-12">
                      <div className="row mt-6">
                        {' '}
                        <div className="col-lg-6 pr-lg-4 mb-4">
                          <h4>{t('cart:locationinfo')}</h4>
                          <div className="row gutter-sm">
                            <div className="form-group mb-4">
                              <label className="text-dark font-weight-500">
                                {t('cart:countryregion')}
                              </label>
                              <div className="select-box">
                                <select
                                  name="country"
                                  className="form-control form-control-md rounded-corners mt-2"
                                  value={country}
                                  onChange={(e) => setCountry(e.target.value)}
                                >
                                  {countries.map((item) => (
                                    <option
                                      key={item.name}
                                      value={item.alpha2Code}
                                    >
                                      {item.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div className="form-group">
                              <label className="text-dark font-weight-500">
                                {t('cart:address')}
                              </label>
                              <input
                                type="text"
                                placeholder="House number and street name"
                                className={`form-control form-control-md mb-2 rounded-corners mt-2 ${
                                  streetErr !== '' ? 'error-border' : ''
                                }`}
                                name="street"
                                value={street}
                                onChange={(e) => {
                                  setStreet(e.target.value), setStreetErr('');
                                }}
                              />
                              {streetErr !== '' ? (
                                <p className="invalid">{streetErr}</p>
                              ) : (
                                ''
                              )}
                              <input
                                type="text"
                                placeholder="Apartment, suite, unit, etc. (optional)"
                                className={`form-control form-control-md mb-2 rounded-corners ${
                                  apartmentErr !== '' ? 'error-border' : ''
                                }`}
                                name="apartment"
                                value={apartment}
                                onChange={(e) => {
                                  setApartment(e.target.value),
                                    setApartmentErr('');
                                }}
                              />
                              {apartmentErr !== '' ? (
                                <p className="invalid">{apartmentErr}</p>
                              ) : (
                                ''
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 pr-lg-4 mb-4">
                          <h4>{t('cart:personalinfo')} </h4>
                          <div className="row gutter-sm">
                            <div className="col-lg-12">
                              <div className="row">
                                <div className="col-lg-3">
                                  <div className="cst-chev form-group mb-4">
                                    <label className="text-dark font-weight-500">
                                      {t('cart:code')}
                                    </label>
                                    <select
                                      name="countryCode"
                                      className="form-control form-control-md rounded-corners mt-2"
                                      value={country}
                                      onChange={(e) =>
                                        setCountry(e.target.value)
                                      }
                                    >
                                      {countries.map((item) => (
                                        <option
                                          key={item.name}
                                          value={item.alpha2Code}
                                        >
                                          +{item.callingCodes}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                                <div className="col-lg-9">
                                  <label className="text-dark font-weight-500">
                                    {t('cart:mobile')}
                                  </label>
                                  <input
                                    type="text"
                                    size="10"
                                    className={`form-control form-control-md mb-2 rounded-corners mt-2 ${
                                      mobileErr !== '' ? 'error-border' : ''
                                    }`}
                                    name="mobile"
                                    value={mobile}
                                    onChange={(e) => {
                                      setMobile(e.target.value),
                                        setMobileErr('');
                                    }}
                                  />
                                  {mobileErr !== '' ? (
                                    <p className="invalid">{mobileErr}</p>
                                  ) : (
                                    ''
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="form-group">
                              <label className="text-dark font-weight-500">
                                {t('cart:fullname')}
                              </label>
                              <input
                                type="text"
                                placeholder="Full Name"
                                className={`form-control form-control-md mb-2 rounded-corners mt-2 ${
                                  fullnameErr !== '' ? 'error-border' : ''
                                }`}
                                name="fullname"
                                value={fullname}
                                onChange={(e) => {
                                  setFullname(e.target.value),
                                    setFullnameErr('');
                                }}
                              />
                              {fullnameErr !== '' ? (
                                <p className="invalid">{fullnameErr}</p>
                              ) : (
                                ''
                              )}
                            </div>
                            {size.width < 767 ? (
                              <div className="col-lg-12 sticky-btn">
                                <button
                                  className="btn btn-primary btn-full-width btn-rounded "
                                  type="submit"
                                >
                                  {shippingadd !== null
                                    ? t('cart:continue')
                                    : t('cart:saveaddress')}
                                  <i className="w-icon-long-arrow-right"></i>
                                </button>
                              </div>
                            ) : (
                              <div className="col-lg-12">
                                <button
                                  className="btn btn-primary btn-full-width btn-rounded"
                                  type="submit"
                                >
                                  {shippingadd !== null
                                    ? t('cart:continue')
                                    : t('cart:saveaddress')}
                                  <i className="w-icon-long-arrow-right"></i>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Ship;
