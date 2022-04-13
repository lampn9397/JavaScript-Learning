import express from 'express';
import * as yup from 'yup';

import User from '../../models/User';
import * as Helpers from '../../utils/helpers';

const router = express.Router();

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

    return res.json(Helpers.createResponse({
      results: user
    }));
  } catch (error) {
    next(error);
  }
});

export default router;
