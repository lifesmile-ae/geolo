import React, { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { FreeMode, Navigation, Thumbs } from 'swiper';

import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';

const ImageThumb = ({ badge, discount, productImage }) => {
  SwiperCore.use([FreeMode, Navigation, Thumbs]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <div className="product-gallery product-gallery-sticky">
      <Swiper
        className="swiper-container product-single-swiper swiper-theme nav-inner"
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
      >
        <div className="swiper-wrapper row cols-1 gutter-no">
          {productImage?.map((data, i) => (
            <SwiperSlide key={i}>
              <figure className="product-image">
                <InnerImageZoom
                  src={data.url}
                  zoomSrc={data.url}
                  alt="Electronics Black Wrist Watch"
                  width={800}
                  height={900}
                  fullscreenOnMobile={true}
                  zoomType="hover"
                  key={i}
                />
              </figure>
            </SwiperSlide>
          ))}
        </div>
        <div className="product-label-group">
          {badge !== 'none' && (
            <label className="product-label label-hot">{badge}</label>
          )}
          {discount && (
            <label className="product-label label-discount">
              {discount}% Off
            </label>
          )}
        </div>
      </Swiper>

      <Swiper
        className="product-thumbs-wrap swiper-container"
        onSwiper={setThumbsSwiper}
        navigation={{
          prevEl: '.picheja',
          nextEl: '.aageja',
        }}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        spaceBetween={10}
      >
        <div className="product-thumbs swiper-wrapper row cols-4 gutter-sm">
          {productImage?.map((data, i) => (
            <SwiperSlide className="product-thumb" key={i}>
              <Image
                src={data.url}
                alt="Product Thumb"
                width="800"
                height="900"
                key={i}
              />
            </SwiperSlide>
          ))}
        </div>
        <div className="swiper-button-prev picheja"></div>
        <div className="swiper-button-next aageja"></div>
      </Swiper>
    </div>
  );
};

export default ImageThumb;
