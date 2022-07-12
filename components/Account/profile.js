import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useTranslation } from 'next-i18next';

const Profile = ({ active, sessionval }) => {
  const [loader, setLoader] = useState(false);
  const { t } = useTranslation('account');
  const [user, setUser] = useState({
    language: sessionval?.user?.language,
    firstname: sessionval?.user?.firstname,
    lastname: sessionval?.user?.lastname,
    email: sessionval?.user?.email,
    oldpassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const {
    language,
    firstname,
    lastname,
    email,
    oldpassword,
    newPassword,
    confirmPassword,
  } = user;

  const [firstnameErr, setFirstnameErr] = useState('');
  const [lastnameErr, setLastnameErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [oldpasswordErr, setOldpasswordErr] = useState('');
  const [confirmPasswordErr, setConfirmPasswordErr] = useState('');

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setFirstnameErr('');
    setLastnameErr('');
    setEmailErr('');
    setOldpasswordErr('');
    setConfirmPasswordErr('');
  };

  const submitHandler = (e) => {
    setLoader(true);
    e.preventDefault();
    if (firstname == '') {
      return setFirstnameErr('First Name cannot be empty');
    }
    if (lastname == '') {
      return setLastnameErr('Last Name cannot be empty');
    }
    if (email == '') {
      return setEmailErr('Email cannot be empty');
    }
    if (newPassword !== confirmPassword) {
      return setConfirmPasswordErr('Password does not match');
    }

    let profileData = {
      userid: sessionval?.user?._id,
      language,
      firstname,
      lastname,
      email,
      oldpassword,
      newPassword,
      confirmPassword,
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = axios
      .put('/api/auth/register', profileData, config)
      .then((res) => {
        setLoader(false);
        toast.success('Profile Updated Successfully');
      })
      .catch(({ data }) => {
        setLoader(false);
        toast.error(data.message);
      });
  };

  return (
    <div
      className={`tab-pane ${active === 'profile' && ' active in'}`}
      id="account-details"
    >
      
      <form className="form account-details-form" onSubmit={submitHandler}>
        <div className="row">
          <div className="col-md-3 col-sm-12">
            <div className="form-group">
              <label htmlFor="firstname"> {t('account:firstname')}</label>
              <input
                type="text"
                name="firstname"
                value={firstname}
                onChange={onChange}
                className={`form-control form-control-md ${
                  firstnameErr !== '' ? 'error-border' : ''
                }`}
              />
              {firstnameErr !== '' ? (
                <p className="invalid">{firstnameErr}</p>
              ) : (
                ''
              )}
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="lastname"> {t('account:lastname')}</label>
              <input
                type="text"
                name="lastname"
                value={lastname}
                onChange={onChange}
                className={`form-control form-control-md ${
                  lastnameErr !== '' ? 'error-border' : ''
                }`}
              />
              {lastnameErr !== '' ? (
                <p className="invalid">{lastnameErr}</p>
              ) : (
                ''
              )}
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="lastname">
                {' '}
                {t('account:preferredlanguage')}
              </label>
              <select
                name="language"
                className="form-control form-control-md rounded-corners"
                value={language}
                onChange={onChange}
              >
                <option value="en">English</option>
                <option value="ar">Arabic</option>
                <option value="ru">Russian</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-group mb-6">
          <div className="row">
            <div className="col-md-9">
              <label htmlFor="email"> {t('account:emailaddress')}</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                className={`form-control form-control-md ${
                  emailErr !== '' ? 'error-border' : ''
                }`}
              />
              {emailErr !== '' ? <p className="invalid">{emailErr}</p> : ''}
            </div>
          </div>
        </div>

        <h4 className="title title-password ls-25 font-weight-bold">
          {t('account:passwordchange')}
        </h4>
        <div className="form-group">
          <div className="row">
            <div className="col-md-9">
              <label className="text-dark" htmlFor="oldpassword">
                {t('account:currentpassword')} 
              </label>
              <input
                type="password"
                className={`form-control form-control-md ${
                  oldpasswordErr !== '' ? 'error-border' : ''
                }`}
                name="oldpassword"
                autoComplete="new-password"
                value={oldpassword}
                onChange={onChange}
              />
              {oldpasswordErr !== '' ? (
                <p className="invalid">{oldpasswordErr}</p>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-md-9">
              <label className="text-dark" htmlFor="newPassword">
                {t('account:newpassword')} 
              </label>
              <input
                type="password"
                className="form-control form-control-md"
                name="newPassword"
                autoComplete="newPassword"
                value={newPassword}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
        <div className="form-group mb-10">
          <div className="row">
            <div className="col-md-9">
              <label className="text-dark" htmlFor="confirmPassword">
                {t('account:confirmpassword')}
              </label>
              <input
                type="password"
                className={`form-control form-control-md ${
                  confirmPasswordErr !== '' ? 'error-border' : ''
                }`}
                name="confirmPassword"
                autoComplete="confirmPassword"
                value={confirmPassword}
                onChange={onChange}
              />
              {confirmPasswordErr !== '' ? (
                <p className="invalid">{confirmPasswordErr}</p>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-dark btn-rounded btn-sm mb-4">
          {loader ? (
            <div className="loader"></div>
          ) : (
            t('account:confirmpassword')
          )}
        </button>
      </form>
    </div>
  );
};

export default Profile;
