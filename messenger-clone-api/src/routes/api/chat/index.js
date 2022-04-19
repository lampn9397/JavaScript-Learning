import express from 'express';
import passport from 'passport';

import { chatMulter } from './middlewares';
import { getConversations, sendMessage } from './controllers';

const router = express.Router();

router.route('/')
  .get(
    passport.authenticate('jwt', { session: false }),
    getConversations
  )
  .post(
    passport.authenticate('jwt', { session: false }),
    chatMulter.array('files'),
    sendMessage,
  );

export default router;
