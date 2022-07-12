import nc from 'next-connect';
import dbConnect from '../../utils/dbConnect';

import onError from '../../middlewares/errors';
import { isAuthenticatedUser } from '../../middlewares/auth';

import { getCoupon, postCoupon } from '../../controllers/coupon';
const handler = nc({ onError });

dbConnect();

handler.get(getCoupon);
handler.post(postCoupon);

export default handler;
