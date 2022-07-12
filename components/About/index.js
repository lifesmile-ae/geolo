import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

const Index = () => {
  const { t } = useTranslation('common');
  return (
    <>
      <>
        <nav className="breadcrumb-nav mb-10 pb-1">
          <div className="container">
            <ul className="breadcrumb">
              <Link href="/" passHref>
                <li>
                  <a href="">{t('common:home')}</a>
                </li>
              </Link>
              <li>{t('common:aboutus')}</li>
            </ul>
          </div>
        </nav>
        <div className="page-content">
          <section className="boost-section pb-10">
            <div className="container mt-10 mb-9">
              <div className="row align-items-center mb-10">
                <div className="col-md-6 mb-8">
                  <figure className="br-lg cert-image">
                    <Image
                      src="/assets/image/cert.png"
                      alt="Banner"
                      width="510"
                      height="750"
                    />
                  </figure>
                </div>
                <div className="col-md-6 pl-lg-8 mb-8 mty-8">
                  <h4 className="title text-left">{t('common:aboutone')}</h4>
                  <p className="mb-6">{t('common:abouttwo')}</p>

                  <p className="mb-6">{t('common:aboutthree')}</p>

                  <p className="mb-6">{t('common:aboutfour')}</p>

                  <p className="mb-6">{t('common:aboutfive')}</p>
                  <a href="#" className="btn btn-tertiary btn-rounded">
                    {t('common:visitourstore')}
                  </a>
                </div>
              </div>

              <div className="awards-wrapper bg-grey p-0 br-lg">
                <h4 className="title title-center font-weight-bold mb-10 pb-1 ls-25">
                  Certificates
                </h4>
                <div className="row cols-xl-3 cols-lg-3 cols-md-2 cols-1">
                  <div className="image-box-wrapper">
                    <div className="image-box text-center">
                      <figure>
                        <Image
                          src="/assets/image/iso-web.svg"
                          alt="Award Image"
                          width="109"
                          height="105"
                          className="cert-img"
                        />
                      </figure>
                      <p>ISO 9001:2015 approved</p>
                    </div>
                  </div>
                  <div className="image-box-wrapper">
                    <div className="image-box text-center">
                      <figure>
                        <Image
                          src="/assets/image/ecas-web.svg"
                          alt="Award Image"
                          width="109"
                          height="105"
                          className="cert-img"
                        />
                      </figure>
                      <p>Ecas approved</p>
                    </div>
                  </div>
                  <div className="image-box-wrapper mt-3">
                    <div className="image-box text-center">
                      <figure>
                        <Image
                          src="/assets/image/gmark-web.svg"
                          alt="Award Image"
                          width="109"
                          height="105"
                          className="cert-img-gmark"
                        />
                      </figure>
                      <p>Gmark approved</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="container d-flex j-c-c">
            <section className="introduce mb-10 pb-10 mt-10">
              <h2 className="title title-center">{t('common:aboutvideo')}</h2>
              <p className=" mx-auto text-center">{t('common:aboutvidesub')}</p>
              <div className="row justify-content-center align-items-center">
                <div className="col-xl-12 col-lg-12 mobile-iframe">
                  <iframe
                    className="br-lg mt-10 custom-max-width-100"
                    title="LifeSmile Kitchenware"
                    width="1240"
                    height="540"
                    src="https://www.youtube.com/embed/90z04WagBdo?feature=oembed"
                    frameBorder={0}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen=""
                  ></iframe>
                </div>
              </div>
            </section>
          </div>
        </div>
      </>
    </>
  );
};

export default Index;
