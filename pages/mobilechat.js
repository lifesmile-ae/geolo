import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Mobile from '../components/Chat/mobile';
import useWindowSize from '../hooks/useWindowSize';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const MobileChat = () => {
  const router = useRouter();
  const size = useWindowSize();
  useEffect(() => {
    if (size.width > 768) {
      router.push('/');
    }
  }, [size, router]);
  return <Mobile />;
};

export default MobileChat;

export const getServerSideProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale)),
    },
  };
};
