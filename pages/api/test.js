import nc from 'next-connect';
import dbConnect from '../../utils/dbConnect';

import onError from '../../middlewares/errors';

import { createTest } from '../../controllers/tester';
const handler = nc({ onError });

dbConnect();

handler.post(createTest);

export default handler;
