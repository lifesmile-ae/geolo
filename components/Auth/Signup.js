import React, { useState, useEffect } from 'react';
import isEmail from 'validator/lib/isEmail';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearErrors } from '../../redux/actions/userActions';
import { signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const Signup = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('common');
  const router = useRouter();
  const { redirect } = router.query;
  const { locale } = router;
  const { success, error, loading } = useSelector((state) => state.auth);
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [firstnameErr, setFirstnameErr] = useState('');
  const [lastnameErr, setLastnameErr] = useState('');

  useEffect(() => {
    if (success) {
      const abc = async () => {
        const result = await signIn('credentials', {
          redirect: false,
          email: email.toLowerCase(),
          password,
        });
        router.push(redirect || '/');
      };
      abc();
    }
    if (error) {
      setEmailErr(
        'Email already exists. Please login or use a different email.'
      );
      dispatch(clearErrors());
    }
  }, [success, error]);

  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });
  const { firstname, lastname, email, password } = user;

  const submitHandler = (e) => {
    e.preventDefault();
    if (email == '') {
      return setEmailErr('Email cannot be empty');
    }
    if (password == '') {
      return setPasswordErr('Password cannot be empty');
    }
    if (firstname == '') {
      return setFirstnameErr('First Name cannot be empty');
    }
    if (lastname == '') {
      return setLastnameErr('Last Name cannot be empty');
    }
    if (isEmail(email)) {
      const userData = {
        firstname: firstname.toLowerCase(),
        lastname: lastname.toLowerCase(),
        email: email.toLowerCase(),
        password,
        locale,
      };
      dispatch(registerUser(userData));
    } else {
      return setEmailErr('Not a valid Email');
    }
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setFirstnameErr('');
    setEmailErr('');
    setPasswordErr('');
    setLastnameErr('');
  };
  return (
    <form onSubmit={submitHandler}>
      <div className="form-group">
        <label> {t('common:youremail')}</label>
        <input
          type="text"
          className={`form-control ${emailErr !== '' ? 'error-border' : ''}`}
          name="email"
          value={email}
          onChange={onChange}
          autoComplete="off"
        />
        {emailErr !== '' ? <p className="invalid">{emailErr}</p> : ''}
      </div>
      <div className="form-group mb-5">
        <label>{t('common:password')}</label>
        <input
          type="password"
          className={`form-control ${passwordErr !== '' ? 'error-border' : ''}`}
          name="password"
          value={password}
          onChange={onChange}
          autoComplete="off"
        />
        {passwordErr !== '' ? <p className="invalid">{passwordErr}</p> : ''}
      </div>
      <div className="checkbox-content login-vendor">
        <div className="form-group mb-5">
          <label>{t('common:firstname')}</label>
          <input
            type="text"
            className={`form-control ${
              firstnameErr !== '' ? 'error-border' : ''
            }`}
            name="firstname"
            value={firstname}
            onChange={onChange}
            autoComplete="off"
          />
          {firstnameErr !== '' ? <p className="invalid">{firstnameErr}</p> : ''}
        </div>
        <div className="form-group mb-5">
          <label>{t('common:lastname')}</label>
          <input
            type="text"
            className={`form-control ${
              lastnameErr !== '' ? 'error-border' : ''
            }`}
            name="lastname"
            value={lastname}
            onChange={onChange}
            autoComplete="off"
          />
          {lastnameErr !== '' ? <p className="invalid">{lastnameErr}</p> : ''}
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-primary btn-rounded"
        style={{ width: '100%' }}
      >
        {loading ? <div className="loader"></div> : 'SIGNUP'}
      </button>
    </form>
  );
};

export default Signup;
