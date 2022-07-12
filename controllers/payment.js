import catchAsyncError from '../middlewares/catchAsyncError';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const paybycash = catchAsyncError(async (req, res, next) => {
  const { total, currency, type, paymentIntentId } = req.body;
  if (type === 'create') {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(total * 100),
      currency: currency,
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  }
  if (type === 'update') {
    const paymentIntent = await stripe.paymentIntents.update(paymentIntentId, {
      amount: parseInt(total * 100),
      currency: currency,
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  }
});

const getPaymentDetail = catchAsyncError(async (req, res, next) => {
  const { paymentIntentId } = req.query;
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  res.send({
    status: paymentIntent,
  });
});

export { paybycash, getPaymentDetail };
