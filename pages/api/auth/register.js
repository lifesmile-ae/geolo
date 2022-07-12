import nc from 'next-connect';
import dbConnect from '../../../utils/dbConnect';

import { registerUser, updateUser } from '../../../controllers/authControllers';
import onError from '../../../middlewares/errors';

const handler = nc({ onError });

dbConnect();

handler.post(registerUser);
handler.put(updateUser);

export default handler;
