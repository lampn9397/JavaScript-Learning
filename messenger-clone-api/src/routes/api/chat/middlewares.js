import multer from 'multer';
import mongoose from 'mongoose';

import * as Helpers from '../../../utils/helpers';
import Conversation from '../../../models/Conversation';

const storage = multer.diskStorage({
  destination: 'public/images/',
  filename: (req, file, cb) => {
    const fileExtensionArray = file.originalname.split('.');

    const fileExtension = fileExtensionArray[fileExtensionArray.length - 1];

    cb(null, `${req.user._id}.${fileExtension}`);
  },
});

export const chatMulter = multer({
  storage,
  limits: {
    files: 1,
    fileSize: 2097152, // 2 MB
  },
  fileFilter: function (req, file, cb) {
    const isImage = file.mimetype.startsWith('image/');

    if (!isImage) {
      return cb(new Error('Invalid avatar image!'));
    }

    cb(null, true);
  },
});

export const checkObjectId = (idFieldName = 'id') => (req, res, next) => {
  const isObjectId = mongoose.isValidObjectId(req.params[idFieldName]);

  if (!isObjectId) {
    return res.status(404).end();
  }

  next();
}

export const checkUserPermissionToChat = (chatFieldName = 'id', dataFieldName = 'params') => async (req, res, next) => {
  try {
    const conversation = await Conversation
      .findById(req[dataFieldName][chatFieldName])
      .lean({ getters: true });

    if (!conversation) {
      return res.status(404).end();
    }

    if (!conversation.users.indexOf(req.user._id)) {
      return res.status(401).end();
    }

    next();
  } catch (error) {
    res.status(400).json(Helpers.createResponse({
      ok: false,
      message: error.message,
    }));
  }
}
