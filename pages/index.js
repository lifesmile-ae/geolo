import Home from '../components/Home';
import { useRouter } from 'next/router';

export const getServerSideProps = ({ query }) => ({
  props: query,
});

export default function Index({ city, region, country }) {
  const router = useRouter();
  console.log(router.query);
  return (
    <div>
      <h1>
        Hello this is ${city} from ${region} with ${country}
      </h1>
    </div>
  );
}
