import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import WishLists from '../components/WishLists';

const WishList = () => {
  return (
    <div>
      <WishLists />
    </div>
  );
};

export default WishList;

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}
