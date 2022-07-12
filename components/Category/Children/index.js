import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useWindowSize from '../../../hooks/useWindowSize';

const Index = ({ category }) => {
  const { locale, query } = useRouter();
  const { t } = useTranslation('common');
  const size = useWindowSize();
  SwiperCore.use([Navigation, Pagination]);
  return (
    <div className="shop-default-category category-ellipse-section mb-6">
      <Swiper
        spaceBetween={20}
        slidesPerView={2}
        className={`swiper-container swiper-theme shadow-swiper ${
          size.width > 768 && 'ls-swiper'
        }`}
        navigation={true}
        breakpoints={{
          480: {
            slidesPerView: 3,
          },
          576: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 6,
          },
          992: {
            slidesPerView: 7,
          },
          1200: {
            slidesPerView: 8,
            spaceBetween: 30,
          },
        }}
        pagination={{
          el: '.swiper-pagination',
          clickable: true,
        }}
      >
        <div className="swiper-wrapper row gutter-lg cols-xl-8 cols-lg-7 cols-md-6 cols-sm-4 cols-xs-3 cols-2">
          {category?.map((data, i) => (
            <SwiperSlide className="category-wrap" key={i}>
              <div className="category category-ellipse">
                <figure className="category-media flat-categories">
                  <Link
                    href={`/product-category/${query.slug}?sub=${data._id}`}
                    passHref
                  >
                    <a>
                      <Image
                        src={data.categoryImageSecond}
                        alt="Categroy"
                        width="190"
                        height="190"
                      />
                    </a>
                  </Link>
                </figure>
                <div className="category-content">
                  <h4 className="category-name">
                    <Link
                      href={`/product-category/${query.slug}?subcategory=${data._id}`}
                      passHref
                    >
                      <a>
                        {' '}
                        {locale == 'en' && data.name}
                        {locale == 'ar' && data.arname}
                        {locale == 'ru' && data.runame}
                      </a>
                    </Link>
                  </h4>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </div>
        <div className="swiper-pagination"></div>
      </Swiper>
    </div>
  );
};

export default Index;
