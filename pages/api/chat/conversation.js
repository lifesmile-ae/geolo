import nc from 'next-connect';
import dbConnect from '../../../utils/dbConnect';

import {
  createConversation,
  getConversation,
  updateConversationType,
} from '../../../controllers/chatspp';
import onError from '../../../middlewares/errors';

const handler = nc({ onError });

dbConnect();

handler.post(createConversation);
handler.get(getConversation);

handler.put(updateConversationType);

export default handler;
