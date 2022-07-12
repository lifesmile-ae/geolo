import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useSelector } from 'react-redux';
import NotFound from '../components/NotFound';
import Ship from '../components/Auth/Shipping';
import { getSession } from 'next-auth/client';
import Shipping from '../models/shipping';
import dbConnect from '../utils/dbConnect';

const ShippingPage = ({ shippingadd, session }) => {
  const items = useSelector((state) => state.addcartItem.cart.cartItems);
  return (
    <>
      {items.length !== 0 ? (
        <Ship shippingadd={shippingadd} session={session} />
      ) : (
        <NotFound type={'emptybag'} />
      )}
    </>
  );
};

export default ShippingPage;

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  dbConnect();
  const shippingadd = await Shipping.findOne({
    userid: session?.user?._id,
  }).lean();
  return {
    props: {
      ...(await serverSideTranslations(context.locale)),
      shippingadd: JSON.parse(JSON.stringify(shippingadd)),
      session: session,
    },
  };
};
