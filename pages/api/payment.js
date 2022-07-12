import nc from 'next-connect';
import dbConnect from '../../utils/dbConnect';

import onError from '../../middlewares/errors';
import { isAuthenticatedUser } from '../../middlewares/auth';

import { paybycash, getPaymentDetail } from '../../controllers/payment';
const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).post(paybycash);

handler.get(getPaymentDetail);

export default handler;
