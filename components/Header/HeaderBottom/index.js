import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { FiMapPin } from 'react-icons/fi';
import { TbDiscount2 } from 'react-icons/tb';

const Index = ({ category }) => {
  const router = useRouter();
  const { locale } = useRouter();

  const { t } = useTranslation('common');
  return (
    <div className="header-bottom sticky-content fix-top sticky-header has-dropdown">
      <div className="container">
        <div className="inner-wrap">
          <div className="header-left">
            <div
              className="dropdown category-dropdown has-border"
              data-visible="true"
            >
              <Link href="/" passHref>
                <a
                  className="category-toggle text-dark"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="true"
                  data-display="static"
                  title="Browse Categories"
                >
                  <i className="w-icon-category"></i>
                  <span>{t('common:browsecategory')}</span>
                </a>
              </Link>
              <div className="dropdown-box">
                <ul className="menu vertical-menu category-menu">
                  {category
                    ? category?.categoryList?.map((data, i) => (
                        <li key={data._id}>
                          <Link
                            href={`/product-category/${data.slug}`}
                            passHref
                          >
                            <a style={{ cursor: 'pointer' }}>
                              <i className={data.categoryIcon}></i>
                              {locale == 'en' && data.name}
                              {locale == 'ar' && data.arname}
                              {locale == 'ru' && data.runame}
                            </a>
                          </Link>
                        </li>
                      ))
                    : 'No category To show'}
                </ul>
              </div>
            </div>
            <nav className="main-nav">
              <ul className="menu active-underline">
                <Link href="/" passHref>
                  <li className={router.route === '/' ? 'active' : ''}>
                    <a style={{ cursor: 'pointer' }}>Home</a>
                  </li>
                </Link>
                <Link href="/contact" passHref>
                  <li className={router.route === '/contact' ? 'active' : ''}>
                    <a style={{ cursor: 'pointer' }}>{t('common:contactus')}</a>
                  </li>
                </Link>
                <Link href="/about" passHref>
                  <li className={router.route === '/about' ? 'active' : ''}>
                    <a style={{ cursor: 'pointer' }}>{t('common:about')}</a>
                  </li>
                </Link>
              </ul>
            </nav>
          </div>
          <div className="header-right">
            <Link href="/track" passHref>
              <a
                style={{ cursor: 'pointer' }}
                className="d-xl-show nav-btn-ls1"
              >
                <FiMapPin className="react-icon" />
                {t('common:trackorder')}
              </a>
            </Link>

            <a style={{ cursor: 'pointer' }} className="nav-btn-ls1">
              <TbDiscount2 className="react-icon-discount" />{' '}
              {t('common:dailydeals')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
