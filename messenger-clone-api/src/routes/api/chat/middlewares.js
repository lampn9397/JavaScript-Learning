import multer from 'multer';
import mongoose from 'mongoose';

import * as Helpers from '../../../utils/helpers';
import Conversation from '../../../models/Conversation';

const storage = multer.diskStorage({
  destination: 'public/images/chat_files/',
  filename: (req, file, cb) => {
    const fileExtensionArray = file.originalname.split('.');

    const fileExtension = fileExtensionArray[fileExtensionArray.length - 1];

    cb(null, `${Date.now()}.${fileExtension}`);
  },
});

export const chatMulter = multer({
  storage,
  limits: {
    // files: 1,
    fileSize: 10485760, // 10 MB
  },
});

export const checkObjectId = (fieldName = 'id', parentFieldName = 'params') => (req, res, next) => {
  const isObjectId = mongoose.isValidObjectId(req[parentFieldName][fieldName]);

  if (!isObjectId) {
    return res.status(404).end();
  }

  next();
}

export const checkUserPermissionToChat = (fieldName = 'id', parentFieldName = 'params') => async (req, res, next) => {
  try {
    const conversation = await Conversation
      .findById(req[parentFieldName][fieldName])
      .lean({ getters: true });

    if (!conversation) {
      return res.status(404).end();
    }

    if (conversation.users.findIndex((x) => x.equals(req.user._id)) === -1) {
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

export const getConversationTitle = (conversation, req) => {
  let { title } = conversation;

  if (!title) {
    const otherUserNickname = conversation.nicknames?.find((x) => !x.user.equals(req.user._id));

    if (otherUserNickname) {
      title = otherUserNickname.nickname;
    } else {
      const otherUser = conversation.users.find((x) => !x._id.equals(req.user._id));

      title = `${otherUser.firstName} ${otherUser.lastName}`;
    }
  }

  return title;
}
