import nc from 'next-connect';
import dbConnect from '../../utils/dbConnect';

import onError from '../../middlewares/errors';
import { isAuthenticatedUser } from '../../middlewares/auth';

import { getfromInvoice } from '../../controllers/order';
const handler = nc({ onError });

dbConnect();

handler.get(getfromInvoice);

export default handler;
