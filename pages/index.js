import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Home from '../components/Home';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';

export default function Index({ category, query }) {
  const router = useRouter();

  console.log(router);
  // console.log(getCookie('country'));
  return (
    <div>
      <Home category={category} />
    </div>
  );
}

export async function getServerSideProps({ locale }) {
  const category = await fetch(`${process.env.SITEURL}/api/category`).then(
    (res) => res.json()
  );
  return {
    props: {
      ...(await serverSideTranslations(locale)),
      category,
    },
  };
}
