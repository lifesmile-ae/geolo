import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Cart from '../components/Checkout/Cart';
import { useSelector } from 'react-redux';
import NotFound from '../components/NotFound';

//Creating Logins

export default function Checkoutpage() {
  const items = useSelector((state) => state.addcartItem.cart.cartItems);
  return (
    <div>{items.length !== 0 ? <Cart /> : <NotFound type={'emptybag'} />}</div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale)),
    },
  };
}
