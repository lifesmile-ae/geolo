import React from 'react';
import { useTranslation } from 'next-i18next';

const Index = () => {
  const { t } = useTranslation('faq');
  return (
    <div className="col-lg-6 mb-8">
      <h4 className="title mb-3">{t('faq:peopleaskthese')}</h4>
      <div
        className="
            accordion
            accordion-bg
            accordion-gutter-md
            accordion-border
          "
      >
        <div className="card">
          <div className="card-header">
            <a href="#collapse1" className="expand">
              {t('faq:cancelmyorder')}
            </a>
          </div>
          <div id="collapse1" className="card-body expanded">
            <p className="mb-0">{t('faq:cancelorderexplain')}</p>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <a href="#collapse2" className="expand">
              {t('faq:shipmentdelayed')}
            </a>
          </div>
          <div id="collapse2" className="card-body collapsed">
            <p className="mb-0">{t('faq:delayedexplain')}</p>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <a href="#collapse3" className="expand">
              {t('faq:needtobuy')}
            </a>
          </div>
          <div id="collapse3" className="card-body collapsed">
            <p className="mb-0">{t('faq:needtobuyexplain')}</p>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <a href="#collapse4" className="expand">
              {t('faq:trackorder')}
            </a>
          </div>
          <div id="collapse4" className="card-body collapsed">
            <p className="mb-0">{t('faq:trackorderexplain')}</p>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <a href="#collapse5" className="expand">
              {t('faq:moneyreturns')}
            </a>
          </div>
          <div id="collapse5" className="card-body collapsed">
            <p className="mb-0">{t('faq:moneyreturnsexplain')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
