import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import About from '../components/About';

export default function Aboutus() {
  return (
    <div>
      <About />
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}
