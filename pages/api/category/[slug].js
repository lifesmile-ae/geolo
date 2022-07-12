import nc from 'next-connect';
import dbConnect from '../../../utils/dbConnect';

import onError from '../../../middlewares/errors';

import { singleCategory } from '../../../controllers/category';

const handler = nc({ onError });

dbConnect();

//Get all products from a category
handler.get(singleCategory);

export default handler;
