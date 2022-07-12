import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const Index = () => {
  const { t } = useTranslation('common');
  return (
    <div className="footer-top">
      <div className="row">
        <div className="col-lg-4 col-sm-6">
          <div className="widget widget-about">
            <a className="logo-footer">
              <Image
                src="/assets/image/logo/lifesmile-dark.svg"
                alt="logo-footer"
                width="100"
                height="70"
              />
            </a>
            <div className="widget-body">
              <p className="widget-about-title">{t('common:calloremail')}</p>
              <a href="tel:971521573960" className="widget-about-call">
                052-157-3960
              </a>

              <p className="widget-about-desc">
                <a
                  href="mailto:help@lifesmile.ae"
                  className="widget-about-call"
                >
                  help@lifesmile.ae
                </a>
              </p>

              <div className="social-icons social-icons-colored">
                <a
                  href="#"
                  className="social-icon social-facebook w-icon-facebook"
                ></a>
                <a
                  href="#"
                  className="social-icon social-twitter w-icon-twitter"
                ></a>
                <a
                  href="#"
                  className="social-icon social-instagram w-icon-instagram"
                ></a>
                <a
                  href="#"
                  className="social-icon social-youtube w-icon-youtube"
                ></a>
                <a
                  href="#"
                  className="social-icon social-pinterest w-icon-pinterest"
                ></a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6">
          <div className="widget">
            <h4 className="widget-title">{t('common:company')}</h4>
            <ul className="widget-body">
              <li>
                <Link href="/about" passHref>
                  <a>{t('common:aboutus')}</a>
                </Link>
              </li>
              <li>
                <Link href="/contact" passHref>
                  <a>{t('common:contactus')}</a>
                </Link>
              </li>
              <li>
                <a href="#">{t('common:carrer')}</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6">
          <div className="widget">
            <h4 className="widget-title">{t('common:myaccount')}</h4>
            <ul className="widget-body">
              <li>
                <a href="#">{t('common:trackmyorder')}</a>
              </li>
              <li>
                <a href="cart.html">{t('common:viewcart')}</a>
              </li>
              <li>
                <Link href="/login" passHref>
                  <a>{t('common:signin')}</a>
                </Link>
              </li>
              <li>
                <a href="#">{t('common:help')}</a>
              </li>
              <li>
                <a href="wishlist.html">{t('common:mywishlist')}</a>
              </li>
              <li>
                <a href="#">{t('common:privacypolicy')}</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6">
          <div className="widget">
            <h4 className="widget-title">{t('common:customerService')}</h4>
            <ul className="widget-body">
              <li>
                <a href="#">{t('common:customerService')}</a>
              </li>
              <li>
                <a href="#">{t('common:customerService')}</a>
              </li>
              <li>
                <a href="#">{t('common:support')}</a>
              </li>
              <li>
                <a href="#">{t('common:shipping')}</a>
              </li>
              <li>
                <a href="#">{t('common:termsandcondition')}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
