import jwt from 'jsonwebtoken';

import User from '../../../models/User';
import { jwtOptions } from '../../../app';
import * as Helpers from '../../../utils/helpers';

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id, '-password')
      .lean({ getters: true });

    res.json(Helpers.createResponse({
      results: user
    }));
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    let { username, password } = req.body;

    username = username?.trim();

    password = password?.trim();

    if (!username || !password) {
      return res.status(400).json(Helpers.createResponse({
        ok: false,
        message: req.t('error.input_login'),
      }));
    }

    const filter = {
      $or: [{ username }, { email: username }]
    };

    const user = await User.findOne(filter, null, { lean: true });

    if (!user || user.password !== password) {
      return res.status(400).json(Helpers.createResponse({
        ok: false,
        message: req.t('error.incorrect_login'),
      }));
    }

    const payload = { id: user._id };

    const token = jwt.sign(payload, jwtOptions.secretOrKey);

    res.json(Helpers.createResponse({ results: token }));
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    let {
      username,
      password,
      firstName,
      lastName,
      gender,
      // avatar,
      phone,
      email,
      // online,
      // lastLogin,
    } = req.body;

    username = username?.trim();

    phone = phone?.trim();

    const filter = {
      $or: [{ username }, { email: username }]
    };

    const isUserExisted = await User.exists(filter);

    if (isUserExisted) {
      return res.status(400).json(Helpers.createResponse({
        ok: false,
        message: req.t('error.user_existed')
      }));
    }

    const user = await User.create({
      username,
      password,
      firstName,
      lastName,
      gender,
      phone,
      email,
    });

    const payload = { id: user._id };

    const token = jwt.sign(payload, jwtOptions.secretOrKey);

    res.json(Helpers.createResponse({ results: token }));
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const updateFields = {
      ...req.body,
    };

    if (req.file) {
      updateFields.avatar = req.file.filename;
    }

    await User.updateOne({ _id: req.user._id }, updateFields, { runValidators: true });

    res.json(Helpers.createResponse({
      message: req.t('result.update_successfully'),
    }));
  } catch (error) {
    next(error);
  }
};
