import nc from 'next-connect';
import dbConnect from '../../utils/dbConnect';

import onError from '../../middlewares/errors';
import { isAuthenticatedUser } from '../../middlewares/auth';

import { createReview, getReview } from '../../controllers/reviews';
const handler = nc({ onError });

dbConnect();

handler.post(createReview);
handler.get(getReview);

export default handler;
