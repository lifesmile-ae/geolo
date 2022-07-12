import nc from 'next-connect';
import dbConnect from '../../utils/dbConnect';

import onError from '../../middlewares/errors';
import { isAuthenticatedUser } from '../../middlewares/auth';
import { createCart } from '../../controllers/cart';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).post(createCart);

export default handler;
