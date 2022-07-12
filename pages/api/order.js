import nc from 'next-connect';
import dbConnect from '../../utils/dbConnect';

import onError from '../../middlewares/errors';
import { isAuthenticatedUser } from '../../middlewares/auth';

import { createOrder, getallOrder, updateOrder } from '../../controllers/order';
const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).post(createOrder);

handler.get(getallOrder);

handler.put(updateOrder);

export default handler;
