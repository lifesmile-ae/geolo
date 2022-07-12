import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Account from '../components/Account';
import { getSession } from 'next-auth/client';

//Creating Logins

export default function accountPage({ sessionval }) {
  return (
    <div>
      <Account sessionval={sessionval} />
    </div>
  );
}

export async function getServerSideProps(context) {
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
      sessionval: session,
      ...(await serverSideTranslations(context.locale)),
    },
  };
}
