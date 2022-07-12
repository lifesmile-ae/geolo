import nc from 'next-connect';
import dbConnect from '../../../utils/dbConnect';

import { createMessage, getMessages } from '../../../controllers/chatspp';
import onError from '../../../middlewares/errors';

const handler = nc({ onError });

dbConnect();

handler.post(createMessage);

handler.get(getMessages);

export default handler;
