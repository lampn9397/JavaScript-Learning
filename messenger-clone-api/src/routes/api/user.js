import * as yup from 'yup';
import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

import User from '../../models/User';
import { jwtOptions } from '../../app';
import * as Helpers from '../../utils/helpers';

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const token = authorization.split(' ')[1];

    const jwtPayload = jwt.verify(token, jwtOptions.secretOrKey);

    const user = await User.findById(jwtPayload.id, null, { lean: true });

    return res.json(Helpers.createResponse({
      results: user
    }));
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    let { username, password } = req.body;

    username = username?.trim();

    password = password?.trim();

    if (!username || !password) {
      return res.status(400).json(Helpers.createResponse({
        ok: false,
        message: 'Please input information to login.'
      }));
    }

    const filter = {
      $or: [{ username }, { email: username }]
    };

    const user = await User.findOne(filter, null, { lean: true });

    if (!user || user.password !== password) {
      return res.status(400).json(Helpers.createResponse({
        ok: false,
        message: 'Incorrect username or password.'
      }));
    }

    const payload = { id: user._id };

    const token = jwt.sign(payload, jwtOptions.secretOrKey);

    return res.json(Helpers.createResponse({
      results: token
    }));
  } catch (error) {
    next(error);
  }
});

export default router;
