import React, { useState } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { hidemobilesidebar } from '../../../redux/actions/siteActions';

const Index = ({ category }) => {
  const dispatch = useDispatch();
  const [catMenu, setCatMenu] = useState(true);
  return (
    <div className="mobile-menu-wrapper">
      <div className="mobile-menu-overlay"></div>

      <a
        href="#"
        className="mobile-menu-close"
        onClick={() => dispatch(hidemobilesidebar())}
      >
        <i className="close-icon"></i>
      </a>

      <div className="mobile-menu-container scrollable">
        <div className="tab">
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item">
              <Link href="/" passHref>
                <a
                  className={`nav-link ${catMenu && `active`}`}
                  onClick={(e) => {
                    setCatMenu(true);
                  }}
                >
                  Categories
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="tab-content">
          <div
            className={`${catMenu ? 'tab-pane active in' : 'tab-pane'}`}
            id="categories"
          >
            <ul className="mobile-menu">
              {category?.categoryList?.map((data, i) => (
                <li key={i}>
                  <Link href={`/product-category/${data.slug}`} passHref>
                    <a onClick={() => dispatch(hidemobilesidebar())}>
                      {' '}
                      <i className={data.categoryIcon}></i>
                      {data.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
