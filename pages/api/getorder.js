import nc from 'next-connect';
import dbConnect from '../../utils/dbConnect';

import onError from '../../middlewares/errors';

import { getOrder } from '../../controllers/order';
const handler = nc({ onError });

dbConnect();

handler.get(getOrder);

export default handler;
