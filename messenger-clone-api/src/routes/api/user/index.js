import express from 'express';
import passport from 'passport';

import { userAvatarMulter } from './middlewares';
import { getUser, login, register, updateUser } from './controllers';

const router = express.Router();

router.route('/')
  .get(passport.authenticate('jwt', { session: false }), getUser)
  .put(
    passport.authenticate('jwt', { session: false }),
    userAvatarMulter.single('avatar'),
    updateUser,
  );

router.post('/login', login);

router.post('/register', register);

export default router;
