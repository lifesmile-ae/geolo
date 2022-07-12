import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Auth from '../components/Auth';
import { getSession } from 'next-auth/client';

const Login = () => {
  return <Auth />;
};

export default Login;

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  if (session) {
    return {
      redirect: {
        destination: '/shipping',
        permanent: false,
      },
    };
  }
  return {
    props: {
      ...(await serverSideTranslations(context.locale)),
    },
  };
};
