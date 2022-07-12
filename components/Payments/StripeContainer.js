import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';

const StripeContainer = ({ clientSecret, orderdata }) => {
  const [stripePromise, setStripePromise] = useState(() =>
    loadStripe(process.env.STRIPE_PUBLISHABLE_KEY)
  );
  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#0570de',
      colorBackground: '#ffffff',
      colorText: '#30313d',
      colorDanger: '#df1b41',
      fontFamily: 'Inter, sans-serif',
      spacingUnit: '4px',
      borderRadius: '10px',
      // See all possible variables below
    },
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      {clientSecret ? (
        <div className="row">
          <Elements options={options} stripe={stripePromise} key={clientSecret}>
            <PaymentForm orderdata={orderdata} />
          </Elements>
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div className="loader" id="loader"></div>
        </div>
      )}
    </>
  );
};

export default StripeContainer;
