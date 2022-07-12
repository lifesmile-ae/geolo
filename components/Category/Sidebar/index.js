import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const Index = () => {
  const { t } = useTranslation('cart');
  const router = useRouter();
  const [max, setMax] = useState('');
  const [min, setMin] = useState('');

  const formhandler = (e) => {
    e.preventDefault();
    router.push(
      `/product-category/${router.query.slug}?minPrice=${min}&maxPrice=${max}`
    );
  };

  return (
    <aside className="sidebar shop-sidebar sticky-sidebar-wrapper sidebar-fixed">
      <div className="sidebar-overlay"></div>
      <a className="sidebar-close" href="#">
        <i className="close-icon"></i>
      </a>

      <div className="sidebar-content scrollable">
        <div className="sticky-sidebar">
          <div className="widget widget-collapsible">
            <h3 className="widget-title">
              <span>{t('cart:price')}</span>
            </h3>
            <div className="widget-body">
              <form className="price-range" onSubmit={formhandler}>
                <input
                  type="number"
                  name="min_price"
                  className="min_price text-center"
                  value={min}
                  onChange={(e) => setMin(e.target.value)}
                />
                <span className="delimiter">-</span>
                <input
                  type="number"
                  name="max_price"
                  className="max_price text-center"
                  value={max}
                  onChange={(e) => setMax(e.target.value)}
                />
                <button type="submit" className="btn btn-primary btn-rounded">
                  {t('cart:go')}
                </button>
              </form>
              <ul className="filter-items search-ul">
                <li>
                  <Link
                    href={`/product-category/${router.query.slug}?minPrice=0&maxPrice=50`}
                    passHref
                  >
                    <a>AED 0.00 - AED 50.00</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/product-category/${router.query.slug}?minPrice=50&maxPrice=100`}
                    passHref
                  >
                    <a>AED 50.00 - AED 100.00</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/product-category/${router.query.slug}?minPrice=100&maxPrice=200`}
                    passHref
                  >
                    <a>AED 100.00 - AED 200.00</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/product-category/${router.query.slug}?minPrice=200&maxPrice=300`}
                    passHref
                  >
                    <a href="#">AED 200.00 - AED 300.00</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/product-category/${router.query.slug}?minPrice=200&maxPrice=300`}
                    passHref
                  >
                    <a href="#">AED 300.00 +</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* <div className="widget widget-collapsible">
            <h3 className="widget-title">
              <span>Size</span>
            </h3>
            <ul className="widget-body filter-items item-check mt-1">
              <li>
                <a href="#">Extra Large</a>
              </li>
              <li>
                <a href="#">Large</a>
              </li>
              <li>
                <a href="#">Medium</a>
              </li>
              <li>
                <a href="#">Small</a>
              </li>
            </ul>
          </div>

          <div className="widget widget-collapsible">
            <h3 className="widget-title">
              <span>Color</span>
            </h3>
            <ul className="widget-body filter-items item-check mt-1">
              <li>
                <a href="#">Black</a>
              </li>
              <li>
                <a href="#">Blue</a>
              </li>
              <li>
                <a href="#">Brown</a>
              </li>
              <li>
                <a href="#">Green</a>
              </li>
              <li>
                <a href="#">Grey</a>
              </li>
              <li>
                <a href="#">Orange</a>
              </li>
              <li>
                <a href="#">Yellow</a>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </aside>
  );
};

export default Index;
