import React from 'react';
import { useTranslation } from 'next-i18next';

const Specification = ({ active, product }) => {
  const { t } = useTranslation('product');
  return (
    <div
      className={`tab-pane ${active == 'specification' ? 'active' : ''}`}
      id="product-tab-specification"
    >
      <ul className="list-none">
        <li>
          <label> {t('product:guarantee')}</label>
          <p>
            {product.guarantee === null
              ? t('product:none')
              : product.guarantee + t('product:yearguarantee')}
          </p>
        </li>
        <li>
          <label>{t('product:material')}</label>
          <p>{t(`product:${product.material}`)}</p>
        </li>
        <li>
          <label>{t('product:features')}</label>
          <ul>
            {product.feature.map((a, index) => (
              <li key={index}>{t(`product:${a.value}`)}</li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Specification;
