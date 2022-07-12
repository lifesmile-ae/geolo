import React, { useState } from 'react';
import Description from './Description';
import Specification from './Specification';
import Reviews from './Reviews';
import { useTranslation } from 'next-i18next';

const Content = ({ product, count }) => {
  const { t } = useTranslation('product');
  const [activeTab, SetActiveTab] = useState('description');
  return (
    <div className="tab tab-nav-boxed tab-nav-underline product-tabs">
      <ul className="nav nav-tabs" role="tablist">
        <li className="nav-item">
          <a
            style={{ cursor: 'pointer' }}
            onClick={() => SetActiveTab('description')}
            className={`nav-link ${activeTab == 'description' ? 'active' : ''}`}
          >
            {t('product:description')}
          </a>
        </li>
        <li className="nav-item">
          <a
            style={{ cursor: 'pointer' }}
            onClick={() => SetActiveTab('specification')}
            className={`nav-link ${
              activeTab == 'specification' ? 'active' : ''
            }`}
          >
            {t('product:specification')}
          </a>
        </li>
        <li className="nav-item">
          <a
            style={{ cursor: 'pointer' }}
            onClick={() => SetActiveTab('review')}
            className={`nav-link ${activeTab == 'review' ? 'active' : ''}`}
          >
            {t('product:customerreviews')} ({count})
          </a>
        </li>
      </ul>
      <div className="tab-content">
        <Description active={activeTab} product={product} />
        <Specification active={activeTab} product={product} />
        <Reviews active={activeTab} productid={product.slug} />
      </div>
    </div>
  );
};

export default Content;
