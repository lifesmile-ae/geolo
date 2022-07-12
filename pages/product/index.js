import React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ProductSearch from '../../components/ProductSearch';

import NotFound from '../../components/NotFound';

const Index = ({ product }) => {
  const { t } = useTranslation('home', 'common');
  return (
    <>
      {product.products.length === 0 ? (
        <NotFound type="productnotfound" />
      ) : (
        <ProductSearch products={product.products} />
      )}
    </>
  );
};

export default Index;

export async function getServerSideProps({ locale, query }) {
  const product = await fetch(
    `${process.env.SITEURL}/api/product?search=${query.search}&limit=10`
  ).then((res) => res.json());

  return {
    props: {
      ...(await serverSideTranslations(locale)),
      product,
    },
  };
}
