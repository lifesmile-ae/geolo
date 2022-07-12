import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Payments from '../components/Payments';
import { getSession } from 'next-auth/client';

const Payment = ({ session }) => {
  return <Payments session={session} />;
};

export default Payment;

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
  return {
    props: {
      ...(await serverSideTranslations(context.locale)),
      session,
    },
  };
};
