import React from 'react';
import { useTranslation } from 'next-i18next';

const Index = () => {
  const { t } = useTranslation('common');
  return (
    <div className="col-lg-6 mb-8 bg-grey pt-4 br-8">
      <h4 className="title mb-3 ml-3 mt-4">{t('common:sendmessage')}</h4>
      <form className="form contact-us-form" action="#" method="post">
        <div className="form-group">
          <label htmlFor="username">{t('common:yourname')}</label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email_1">{t('common:youremail')}</label>
          <input
            type="email"
            id="email_1"
            name="email_1"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">{t('common:yourmessage')}</label>
          <textarea
            id="message"
            name="message"
            cols="30"
            rows="5"
            className="form-control"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary btn-rounded float-right">
          {t('common:send')}
        </button>
      </form>
    </div>
  );
};

export default Index;
