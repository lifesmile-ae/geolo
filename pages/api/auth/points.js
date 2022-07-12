import nc from 'next-connect';
import dbConnect from '../../../utils/dbConnect';

import { getPoints } from '../../../controllers/authControllers';
import onError from '../../../middlewares/errors';

const handler = nc({ onError });

dbConnect();
handler.get(getPoints);

export default handler;
