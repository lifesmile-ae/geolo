import React from 'react';
import MainSlider from './MainSlider';
import ShortFeature from './ShortFeature';
import SlideCategories from './SlideCategories';
import BannerAds from './BannerAds';
import ProductSlider from './ProductSlider';
import DealoftheDay from './DealoftheDay';
import TopBestSeller from './TopBestSeller';
import SmartSection from './SmartSection';
import FullBannerAd from './FullBannerAd';
import { useTranslation } from 'next-i18next';

const Index = ({ category }) => {
  const { t } = useTranslation('product', 'home');
  return (
    <>
      <MainSlider />
      <ShortFeature />
      <SlideCategories category={category} />
      <BannerAds />

      {/* <ProductSlider
        title={t('product:recommendedforyou')}
        moreurl={'/recommended'}
        products={products}
      /> */}

      <ProductSlider
        title={'Fry Pans'}
        moreurl={'product-category/fry-pans'}
        category="fry-pans"
      />

      <div className="container">
        <div className="row mb-8">
          <DealoftheDay />
          <TopBestSeller />
        </div>
      </div>

      <ProductSlider
        title={'Pots & Casserole'}
        moreurl={'product-category/pots-and-casserole'}
        category="pots-and-casserole"
      />

      <SmartSection
        image={`url(https://res.cloudinary.com/lifesmile/image/upload/v1655126528/2_zgmnh1.jpg)`}
        title={t('product:dinnerware')}
        saletype={t('product:weekendsale')}
        description={t('home:newarrival')}
        link="product-category/plates-and-bowls"
        slug="plates-and-bowls?limit=10"
      />

      <FullBannerAd />

      <SmartSection
        image={`url(https://res.cloudinary.com/lifesmile/image/upload/v1655126585/3_koarkn.jpg)`}
        title={t('home:cakemolds')}
        saletype={t('product:weekendsale')}
        description={t('home:newarrival')}
        link="product-category/cake-mold"
        slug="cake-mold?sub=6229a76c9c3f5ccc6acad4f2&limit=10"
      />
    </>
  );
};

export default Index;
