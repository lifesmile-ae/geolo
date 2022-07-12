import nc from 'next-connect';
import dbConnect from '../../../utils/dbConnect';

import onError from '../../../middlewares/errors';

import { allProducts } from '../../../controllers/product';

const handler = nc({ onError });

dbConnect();

handler.get(allProducts);

export default handler;
