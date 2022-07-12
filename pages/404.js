import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import NotFound from '../components/NotFound';

export default function Index() {
  return (
    <div>
      <NotFound />
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
