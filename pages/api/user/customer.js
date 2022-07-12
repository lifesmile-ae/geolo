import nc from 'next-connect';
import dbConnect from '../../../utils/dbConnect';

import { registerCustomer } from '../../../controllers/authControllers';
import onError from '../../../middlewares/errors';

const handler = nc({ onError });

dbConnect();

handler.post(registerCustomer);

export default handler;
