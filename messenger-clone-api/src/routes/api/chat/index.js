import express from 'express';
import passport from 'passport';

import { chatMulter, checkObjectId, checkUserPermissionToChat } from './middlewares';
import { getConversations, sendMessage, getMessages,  } from './controllers';

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
    checkObjectId('id'),
    checkUserPermissionToChat('id', 'params'),
    getMessages
  );

export default router;
