import nc from 'next-connect';
import dbConnect from '../../../utils/dbConnect';

import onError from '../../../middlewares/errors';

import { getPoints } from '../../../controllers/points';
const handler = nc({ onError });

dbConnect();

handler.get(getPoints);

export default handler;
