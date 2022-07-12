import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Track from '../components/Track';

export default function Trackorder() {
  return (
    <div>
      <Track />
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
