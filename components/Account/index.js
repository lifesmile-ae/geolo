import React, { useState } from 'react';
import { TbLayoutDashboard } from 'react-icons/tb';
import { TbFileMinus } from 'react-icons/tb';
import {BiUser} from 'react-icons/bi';
import { TbMapPin } from 'react-icons/tb';
import { TbLanguage } from 'react-icons/tb';
import { TbUser } from 'react-icons/tb';
import {RiCoinsLine} from 'react-icons/ri';
import Profile from './profile';
import Address from './address';
import Orders from './orders';
import Returns from './returns';
import Points from './points';
import { signOut } from 'next-auth/client';
import { useTranslation } from 'next-i18next';
import useWindowSize from '../../hooks/useWindowSize';

const Myaccount = ({ sessionval }) => {
  const [active, setActive] = useState('profile');
  const size = useWindowSize();
  const logoutHandler = () => {
    signOut();
  };

  const { t } = useTranslation('account');

  return (
    <main className="main my-account">
      <div className="page-content pt-2">
        <div className="container">
          <div className="tab tab-vertical gutter-lg account-tab">
            
            {size.width > 768 ? (<ul className="nav account-nav-tabs mb-6" role="tablist">
              <li className="nav-item account-nav-item">
                <a
                  style={{ cursor: 'pointer' }}
                  className={`nav-link ${active === 'profile' && ' active'}`}
                  onClick={(e) => setActive('profile')}
                >
                  <BiUser className='react-icon-account' /> <span className='account-btn'>{t('account:profile')}</span>
                </a>
              </li>
              <li className="nav-item account-nav-item">
                <a
                  style={{ cursor: 'pointer' }}
                  className={`nav-link ${active === 'orders' && ' active'}`}
                  onClick={(e) => setActive('orders')}
                >
                  <TbFileMinus className='react-icon-account' />
                  <span className='account-btn'>{t('account:orders')}</span>
                </a>
              </li>

              <li className="nav-item account-nav-item">
                <a
                  style={{ cursor: 'pointer' }}
                  className={`nav-link ${active === 'address' && ' active'}`}
                  onClick={(e) => setActive('address')}
                >
                  <TbMapPin className='react-icon-account' /> <span className='account-btn'>{t('account:address')}</span>
                </a>
              </li>
              <li className="nav-item account-nav-item">
                <a
                  style={{ cursor: 'pointer' }}
                  className={`nav-link ${active === 'returns' && ' active'}`}
                  onClick={(e) => setActive('returns')}
                >
                  <TbLayoutDashboard
                     className='react-icon-account'
                  />{' '}
                  <span className='account-btn'>{t('account:returns')}</span>
                </a>
              </li>
              <li className="nav-item account-nav-item">
                <a
                  style={{ cursor: 'pointer' }}
                  className={`nav-link ${active === 'points' && ' active'}`}
                  onClick={(e) => setActive('points')}
                >
                  <RiCoinsLine className='react-icon-account' /> <span className='account-btn'>{t('account:smilepoints')}</span>
                </a>
              </li>
              <li className="link-item account-nav-item">
                <a className='btn btn-primary btn-rounded ml-2 mt-4' onClick={logoutHandler} style={{ cursor: 'pointer' }}>
                  {t('account:logout')}
                </a>
              </li>
            </ul>) : (<ul className="nav tab-horizontal account-nav-tabs mb-6" role="tablist">
              
              <li className="nav-item account-nav-item mobile-account-item">
                <a
                  style={{ cursor: 'pointer' }}
                  className={`nav-link ${active === 'profile' && ' active'}`}
                  onClick={(e) => setActive('profile')}
                >
                  <BiUser /> {t('account:profile')}
                </a>
              </li>
              <li className="nav-item account-nav-item mobile-account-item">
                <a
                  style={{ cursor: 'pointer' }}
                  className={`nav-link ${active === 'orders' && ' active'}`}
                  onClick={(e) => setActive('orders')}
                >
                  <TbFileMinus />
                  {t('account:orders')}
                </a>
              </li>

              <li className="nav-item account-nav-item mobile-account-item">
                <a
                  style={{ cursor: 'pointer' }}
                  className={`nav-link ${active === 'address' && ' active'}`}
                  onClick={(e) => setActive('address')}
                >
                  <TbMapPin /> {t('account:address')}
                </a>
              </li>
              <li className="nav-item account-nav-item mobile-account-item item-return">
                <a
                  style={{ cursor: 'pointer' }}
                  className={`nav-link ${active === 'returns' && ' active'}`}
                  onClick={(e) => setActive('returns')}
                >
                  <TbLayoutDashboard
                    style={{ fontSize: '1.6rem', paddingTop: '2px' }}
                  />{' '}
                  <span> {t('account:returns')}</span>
                </a>
              </li>
              <li className="nav-item account-nav-item mobile-account-item">
                <a
                  style={{ cursor: 'pointer' }}
                  className={`nav-link ${active === 'points' && ' active'}`}
                  onClick={(e) => setActive('points')}
                >
                  <RiCoinsLine /> {t('account:smilepoints')}
                </a>
              </li>
              <li className="link-item account-nav-item mobile-logout">
                <a className='btn btn-tertiary btn-rounded w-100' onClick={logoutHandler} style={{ cursor: 'pointer' }}>
                  {t('account:logout')}
                </a>
              </li>
              
              </ul>)}
            <div className="tab-content mb-6 mobile-margin">
              <Orders active={active} sessionval={sessionval} />

              <Profile active={active} sessionval={sessionval} />

              <Returns active={active} sessionval={sessionval} />

              <Address active={active} sessionval={sessionval} />

              <Points active={active} sessionval={sessionval} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Myaccount;

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}
