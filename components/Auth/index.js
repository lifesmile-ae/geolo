import React, { useState } from 'react';
import { useEffect } from 'react';
import Login from './Login';
import Signup from './Signup';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useTranslation } from 'next-i18next';

const Index = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const { redirect } = router.query;
  const [alertstatus, setAlertstatus] = useState(true);
  const [session, loading] = useSession();
  const [signin, setSignin] = useState(true);
  const [signout, setSignOut] = useState(false);

  const items = useSelector((state) => state.addcartItem.cart.cartItems);

  useEffect(() => {
    const saveCart = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const cartData = {
        user: session.user._id,
        cartItems: items,
      };
      const { data } = await axios.post('/api/cart', cartData, config);
      return data;
    };
    if (session) {
      const abc = saveCart();
      router.push(redirect || '/');
    }
    setInterval(() => {
      setAlertstatus(false);
    }, 3000);
  }, [session, items]);
  return (
    <div className="login-page mb-10 pb-1">
      <div className="page-content">
        <div className="container">
          {alertstatus && (
            <div className="alert alert-icon alert-warning alert-bg alert-inline alertstatus">
              <h4 className="alert-title">
                <i className="w-icon-exclamation-triangle"></i>
                {t('common:error')}!{' '}
              </h4>{' '}
              {t('common:logintoproceed')}
            </div>
          )}

          <div className="login-popup">
            <div className="tab tab-nav-boxed tab-nav-center tab-nav-underline">
              <ul className="nav nav-tabs text-uppercase" role="tablist">
                <li className="nav-item">
                  <a
                    style={{ cursor: 'pointer' }}
                    onClick={(e) => (setSignin(true), setSignOut(false))}
                    className={`nav-link ${signin && 'active'}`}
                  >
                    {t('common:signin')}
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    style={{ cursor: 'pointer' }}
                    onClick={(e) => (setSignin(false), setSignOut(true))}
                    className={`nav-link ${signout && 'active'}`}
                  >
                    {t('common:signup')}
                  </a>
                </li>
              </ul>
              <div className="tab-content">
                <div className={`tab-pane ${signin && 'active'}`} id="sign-in">
                  <Login />
                </div>
                <div className={`tab-pane ${signout && 'active'}`} id="sign-up">
                  <Signup />
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
