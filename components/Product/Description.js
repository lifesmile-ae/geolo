import React from 'react';
import { useRouter } from 'next/router';

const Description = ({ active, product }) => {
  const { locale } = useRouter();
  return (
    <div
      className={`tab-pane ${active == 'description' ? 'active' : ''}`}
      id="product-tab-description"
    >
      <div className="row mb-4">
        <div className="col-md-12 mb-5">
          {locale === 'en' && (
            <p
              className="mb-4"
              dangerouslySetInnerHTML={{
                __html: product?.description,
              }}
            ></p>
          )}
          {locale === 'ar' && (
            <p
              className="mb-4"
              dangerouslySetInnerHTML={{
                __html:
                  product?.description_ar === 'false'
                    ? product?.description
                    : product?.description_ar,
              }}
            ></p>
          )}
          {locale === 'ru' && (
            <p
              className="mb-4"
              dangerouslySetInnerHTML={{
                __html:
                  product?.description_ru === 'false'
                    ? product?.description
                    : product?.description_ru,
              }}
            ></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Description;
