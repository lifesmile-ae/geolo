import nc from 'next-connect';
import dbConnect from '../../../utils/dbConnect';

import onError from '../../../middlewares/errors';

import { singleProduct } from '../../../controllers/product';

const handler = nc({ onError });

dbConnect();

handler.get(singleProduct);

export default handler;
