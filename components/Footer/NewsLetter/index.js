import React from 'react';
import { useTranslation } from 'next-i18next';

const Index = () => {
  const { t } = useTranslation('common');
  return (
    <div className="footer-newsletter bg-dark pt-6 pb-6">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-xl-5 col-lg-6">
            <div className="icon-box icon-box-side text-white">
              <div className="icon-box-icon d-inline-flex">
                <i className="w-icon-envelop3"></i>
              </div>
              <div className="icon-box-content">
                <h4
                  className=" 
                    icon-box-title
                    text-white text-uppercase
                    font-weight-bold
                  "
                >
                  {t('common:subscribetous')}
                </h4>
                <p className="text-white">{t('common:getallinformation')}</p>
              </div>
            </div>
          </div>
          <div className="col-xl-7 col-lg-6 col-md-9 mt-4 mt-lg-0">
            <form
              action="#"
              method="get"
              className="
                input-wrapper input-wrapper-inline input-wrapper-rounded
              "
            >
              <input
                type="email"
                className="form-control mr-2 bg-white"
                name="email"
                id="email"
                placeholder={t('common:youremail')}
              />
              <button className="btn btn-secondary btn-rounded" type="submit">
                {t('common:subscribe')}
                <i className="w-icon-long-arrow-right"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
