import Home from '../components/Home';

export const getServerSideProps = ({ query }) => ({
  props: query,
});

export default function Index({ city, region, country }) {
  return (
    <div>
      <h1>
        Hello this is ${city} from ${region} with ${country}
      </h1>
    </div>
  );
}
