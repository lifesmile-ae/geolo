import React, { useEffect, useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import useWindowSize from '../../hooks/useWindowSize';
import { useTranslation } from 'next-i18next';
import axios from 'axios';

const PaymentForm = ({ orderdata }) => {
  const { t } = useTranslation('cart');
  const stripe = useStripe();
  const elements = useElements();
  const size = useWindowSize();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    orderdata.paymentType = 'stripe';

    const { data } = await axios.post(`/api/order`, orderdata, config);
    setIsLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${process.env.SITEURL}/complete?OrderId=${data.message._id}`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message);
    } else {
      setMessage('An unexpected error occured.');
    }
    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      {size.width < 767 ? (
        <div className="sticky-btn">
          <button
            disabled={isLoading || !stripe || !elements}
            id="submit"
            className="btn btn-block btn-primary btn-icon-right btn-rounded btn-checkout"
          >
            <span id="button-text">
              {isLoading ? (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <div className="loader" id="loader"></div>
                </div>
              ) : (
                <>{t('cart:paywithcard')}</>
              )}
            </span>
          </button>
        </div>
      ) : (
        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className="btn btn-block btn-primary btn-icon-right btn-rounded mt-4 btn-checkout"
        >
          <span id="button-text">
            {isLoading ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <div className="loader" id="loader"></div>
              </div>
            ) : (
              <>{t('cart:paywithcard')}</>
            )}
          </span>
        </button>
      )}

      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default PaymentForm;
