import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PurchaseComplete from '../components/PurchaseComplete';

const Contact = ({ order }) => {
  return (
    <div>
      <PurchaseComplete order={order} />
    </div>
  );
};

export default Contact;

export async function getServerSideProps(ctx) {
  const order = await fetch(
    `${process.env.SITEURL}/api/getorder?orderId=${ctx.query.OrderId}`
  ).then((res) => res.json());

  if (order.success === false) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(ctx.locale)),
      order,
    },
  };
}
