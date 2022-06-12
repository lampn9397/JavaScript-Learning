import jwt from 'jsonwebtoken';

import User, { avatarGetter } from '../../../models/User';
import { jwtOptions } from '../../../app';
import * as Helpers from '../../../utils/helpers';
import { FileTypes } from '../../../models/File';

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
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      phone: req.body.phone,
      email: req.body.email,
      language: req.body.language,
    };

    if (req.file) {
      updateFields.avatar = {
        name: req.file.filename,
        type: FileTypes.USER_AVATAR,
      };
    }

    const user = await User
      .findByIdAndUpdate(req.user._id, updateFields, { new: true, runValidators: true })
      .select('-password')
      .lean({ getter: true });

    user.avatar = avatarGetter(user.avatar, user);

    res.json(Helpers.createResponse({
      results: user,
      message: req.t('result.update_successfully'),
    }));
  } catch (error) {
    next(error);
  }
};
