import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ContactUs from '../components/ContactUs';

const Contact = () => {
  return (
    <div>
      <ContactUs />
    </div>
  );
};

export default Contact;

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}
