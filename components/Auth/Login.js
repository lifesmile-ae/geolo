import React, { useState } from 'react';
import { signIn } from 'next-auth/client';
import isEmail from 'validator/lib/isEmail';
import { useTranslation } from 'next-i18next';

const Login = () => {
  const { t } = useTranslation('common');
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { email, password } = user;
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  const loginHandler = async (e) => {
    e.preventDefault();
    if (email == '') {
      return setEmailErr('Email cannot be empty');
    }
    if (password == '') {
      return setPasswordErr('Password cannot be empty');
    }
    if (!isEmail(email)) {
      return setEmailErr('Email is not valid');
    }
    const result = await signIn('credentials', {
      redirect: false,
      email: email.toLowerCase(),
      password,
    });
    if (result.error) {
      const errormsg = result.error.split(',');
      errormsg[0] == 1 && setEmailErr(errormsg[1]);
      errormsg[0] == 2 && setPasswordErr(errormsg[1]);
    }
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setEmailErr('');
    setPasswordErr('');
  };
  return (
    <form onSubmit={loginHandler}>
      <div className="form-group">
        <label>{t('common:emailaddress')}</label>
        <input
          type="text"
          className={`form-control ${emailErr !== '' ? 'error-border' : ''}`}
          name="email"
          value={email}
          onChange={onChange}
        />
        {emailErr !== '' ? <p className="invalid">{emailErr}</p> : ''}
      </div>
      <div className="form-group mb-0">
        <label>{t('common:password')}</label>
        <input
          type="password"
          className={`form-control ${passwordErr !== '' ? 'error-border' : ''}`}
          name="password"
          value={password}
          onChange={onChange}
        />
        {passwordErr !== '' ? <p className="invalid">{passwordErr}</p> : ''}
      </div>
      <div className="form-checkbox d-flex align-items-center justify-content-between">
        <input
          type="checkbox"
          className="custom-checkbox"
          id="remember1"
          name="remember1"
          required=""
        />
        <label htmlFor="remember1">{t('common:rememberme')}</label>
        <a href="#">{t('common:lostpassword')}</a>
      </div>
      <button
        type="submit"
        className="btn btn-primary btn-rounded"
        style={{ width: '100%' }}
      >
        {t('common:signin')}
      </button>
    </form>
  );
};

export default Login;
