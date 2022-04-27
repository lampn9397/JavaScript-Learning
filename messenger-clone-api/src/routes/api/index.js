import express from 'express';
import passport from 'passport';

import user from './user';
import chat from './chat';

const router = express.Router();

router.use('/user', user);

router.use('/chat',
  passport.authenticate('jwt', { session: false }),
  chat,
);

export default router;
