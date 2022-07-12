import React from 'react';
import { signOut } from 'next-auth/client';
import { useTranslation } from 'next-i18next';
import { useSession } from 'next-auth/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BiUser } from 'react-icons/bi';

const Index = () => {
  const { t } = useTranslation('home');
  const [session, loading] = useSession();
  const { locale } = useRouter();
  const logoutHandler = () => {
    signOut();
  };

  return (
    <div className="header-top">
      <div className="container">
        <div className="header-left">
          <p className="welcome-msg">{t('home:welcome_msg')}</p>
        </div>
        <div className="header-right">
          {/* <div className="dropdown">
            <a href="#currency">{t('home:aed')}</a>
            <div className="dropdown-box">
              <a href="#aed">{t('home:aed')}</a>
              <a href="#usd">{t('home:usd')}</a>
            </div>
          </div> */}

          <div className="dropdown">
            <a href="#language">&nbsp;{t(`home:${locale}`)}</a>
            <div className="dropdown-box">
              <a href="/en">&nbsp;{t('home:en')}</a>
              <a href="/ar">&nbsp;{t('home:ar')}</a>
              {/* <a href="/ru">&nbsp;{t('home:ru')}</a> */}
            </div>
          </div>
          <span className="divider d-lg-show"></span>

          {session ? (
            <Link href="/account" passHref>
              <a>
                <BiUser className="react-icon-user" />
                {t('home:welcome') + ',  ' + session.user.firstname}
              </a>
            </Link>
          ) : (
            <>
              {' '}
              <Link href="/login" passHref>
                <a className="d-lg-show login sign-in">
                  <BiUser className="react-icon-user" />
                  {t('home:Signin')}
                </a>
              </Link>
              <span className="delimiter d-lg-show">/</span>
              <Link href="/login" passHref>
                <a
                  className="ml-0 d-lg-show login register"
                  style={{ cursor: 'pointer' }}
                  onClick={logoutHandler}
                >
                  {t('home:register')}
                </a>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
