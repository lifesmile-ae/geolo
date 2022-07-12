import React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Product from '../../components/Product';

import NotFound from '../../components/NotFound';

const Index = ({ product }) => {
  const { t } = useTranslation('home', 'common');
  return <>{product.success ? <Product product={product} /> : <NotFound />}</>;
};

export default Index;

export async function getServerSideProps({ locale, query }) {
  const product = await fetch(
    `${process.env.SITEURL}/api/product/${query.slug}`
  ).then((res) => res.json());

  return {
    props: {
      ...(await serverSideTranslations(locale)),
      product,
    },
  };
}
