import express from 'express';

import { chatMulter, checkObjectId, checkUserPermissionToChat } from './middlewares';
import { getConversations, sendMessage, getMessages, createConversation } from './controllers';

const router = express.Router();

router.route('/')
  .get(getConversations)
  .post(
    chatMulter.array('files'),
    createConversation,
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
  )
  .post(
    checkObjectId('id', 'params'),
    checkUserPermissionToChat('id', 'params'),
    chatMulter.array('files'),
    sendMessage,
  );

export default router;
