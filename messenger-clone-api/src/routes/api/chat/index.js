import express from 'express';

import { chatMulter, checkObjectId, checkUserPermissionToChat } from './middlewares';
import { getConversations, sendMessage, getMessages, } from './controllers';

const router = express.Router();

router.route('/')
  .get(getConversations)
  .post(
    checkUserPermissionToChat('id', 'body'),
    chatMulter.array('files'),
    sendMessage,
  );

router.route('/:id')
  .get(
    checkObjectId('id', 'params'),
    checkUserPermissionToChat('id', 'params'),
    getConversations,
  )

router.route('/:id/message')
  .get(
    checkObjectId('id', 'params'),
    checkUserPermissionToChat('id', 'params'),
    getMessages
  );

export default router;
