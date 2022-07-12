import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Home from '../components/Home';

export default function Index({ category, query }) {
  console.log(query);
  return (
    <div>
      <Home category={category} />
    </div>
  );
}

export async function getServerSideProps({ locale, query }) {
  const category = await fetch(`${process.env.SITEURL}/api/category`).then(
    (res) => res.json()
  );

  return {
    props: {
      ...(await serverSideTranslations(locale)),
      category,
      query,
    },
  };
}
