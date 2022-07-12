import React, { useEffect, useState } from 'react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import BriefView from '../../Product/BriefView';

import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import axios from 'axios';

const Index = ({ title, moreurl, category }) => {
  const [product, setProduct] = useState([]);
  const { locale } = useRouter();
  const { t } = useTranslation('home');
  SwiperCore.use([Navigation, Pagination]);

  useEffect(() => {
    axios.get(`/api/category/${category}?limit=8`).then(({ data }) => {
      setProduct(data);
    });
  }, []);

  return (
    <div className="container product-wrapper-1 mb-5">
      <div className="title-link-wrapper pb-1 mb-4">
        <h2 className="title ls-normal mb-0">{title}</h2>
        <Link href={`${moreurl}`} passHref>
          <a className="font-size-normal font-weight-bold ls-25 mb-0">
            {locale === 'ar' && <i className="w-icon-long-arrow-left"></i>}{' '}
            {t('home:moreproducts')}{' '}
            {(locale === 'en' || locale === 'ru') && (
              <i className="w-icon-long-arrow-right"></i>
            )}
          </a>
        </Link>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <Swiper
            spaceBetween={10}
            navigation={true}
            slidesPerView={2}
            loop={true}
            breakpoints={{
              540: {
                slidesPerView: 3,
              },
              992: {
                slidesPerView: 5,
              },
              1200: {
                slidesPerView: 6,
              },
            }}
            className="swiper-container swiper-theme nav-inner pg-inner swiper-nav-lg"
          >
            <div className="swiper-wrapper row cols-lg-5 cols-md-4 cols-sm-3 cols-2">
              {product?.getProduct?.map((product, i) => (
                <SwiperSlide className="product-col" key={i}>
                  <BriefView product={product} />
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Index;
