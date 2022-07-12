import nc from 'next-connect';
import dbConnect from '../../../utils/dbConnect';

import {
  registerShipping,
  getShipping,
  updateShipping,
} from '../../../controllers/authControllers';
import onError from '../../../middlewares/errors';

const handler = nc({ onError });

dbConnect();
handler.get(getShipping);
handler.post(registerShipping);
handler.put(updateShipping);

export default handler;
