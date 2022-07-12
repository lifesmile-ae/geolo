import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Category from '../../components/Category';

const Index = ({ product }) => {
  return <Category products={product} />;
};

export default Index;

export async function getServerSideProps({ locale, query }) {
  const page = query.page ? query.page : 1;
  const limit = query.limit ? query.limit : 12;
  const sub = query.sub ? query.sub : '';
  const minPrice = query.minPrice ? query.minPrice : 1;
  const maxPrice = query.maxPrice ? query.maxPrice : 10000;

  const product = await fetch(
    `${process.env.SITEURL}/api/category/${query.slug}?page=${page}&limit=${limit}&sub=${sub}&minPrice=${minPrice}&maxPrice=${maxPrice}`
  ).then((res) => res.json());
  if (product.status === 'no_data') {
    return {
      redirect: {
        destination: `/product-category/${query.slug}`,
        permanent: false,
      },
    };
  }
  product.limit = limit;
  return {
    props: {
      ...(await serverSideTranslations(locale)),
      product,
    },
  };
}
