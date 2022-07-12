import nc from 'next-connect';
import dbConnect from '../../../utils/dbConnect';

import onError from '../../../middlewares/errors';

import { getCategory } from '../../../controllers/category';

const handler = nc({ onError });

dbConnect();

handler.get(getCategory);

export default handler;
