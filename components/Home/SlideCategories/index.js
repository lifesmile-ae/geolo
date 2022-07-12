import React from 'react';
import Image from 'next/image';
import 'swiper/css/bundle';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay } from 'swiper';
import SwiperCore, { Navigation, Pagination } from 'swiper';

const Index = ({ category }) => {
  const { locale } = useRouter();
  SwiperCore.use([Navigation, Pagination]);
  return (
    <div className="container pb-5">
      <Swiper
        spaceBetween={20}
        slidesPerView={2}
        loop={true}
        navigation={true}
        modules={[Autoplay, EffectFade]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        className="swiper-container swiper-theme nav-inner pg-inner swiper-nav-lg"
        grabCursor={true}
        breakpoints={{
          320: {
            slidesPerView: 3,
          },
          540: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 5,
          },
          992: {
            slidesPerView: 6,
          },
          1200: {
            slidesPerView: 9,
          },
        }}
      >
        <div className="category-wrapper row">
          {category?.categoryList?.map((data, i) => (
            <SwiperSlide key={i} className="category category-ellipse">
              <figure className="category-media">
                <Link href={`/product-category/${data.slug}`} passHref>
                  <a href="">
                    <Image
                      src={data.categoryImageMain}
                      alt={`${data.name}`}
                      width="200"
                      height="200"
                    />
                  </a>
                </Link>
              </figure>
              <div className="category-content">
                <h4 className="category-name">
                  <Link href={`/product-category/${data.slug}`} passHref>
                    <a href="">
                      {locale === 'en' && data.name}{' '}
                      {locale === 'ar' && data.arname}{' '}
                      {locale === 'ru' && data.runame}
                    </a>
                  </Link>
                </h4>
              </div>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
};

export default Index;
