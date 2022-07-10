import mongoose from 'mongoose';

import { io } from '../../../bin/www';
import * as Helpers from '../../../utils/helpers';
import { getConversationTitle } from './middlewares';
import Conversation from '../../../models/Conversation';
import { SocketEvents } from '../../../services/socket';
import Message, { fileGetter, messageTypes } from '../../../models/Message';

const conversationPipelines = (query) => {
  return query
    // .select('-nicknames')
    .populate('users', 'firstName lastName avatar online lastLogin')
    .populate({
      path: 'lastMessage',
      populate: {
        path: 'user',
        select: 'firstName lastName avatar'
      }
    })
}

export const getConversations = async (req, res, next) => {
  try {
    let results = [];

    if (req.params.id) {
      results = await conversationPipelines(Conversation.findById(req.params.id))
        .lean({ getters: true });

      results.title = getConversationTitle(results, req);

      results.nicknames = undefined;
    } else {
      const { q } = req.query;

      const pipelines = [
        { $match: { users: req.user._id } },
        {
          $lookup: {
            from: 'users',
            localField: 'users',
            foreignField: '_id',
            as: 'users',
            pipeline: [
              {
                $project: {
                  'firstName': 1,
                  'lastName': 1,
                  'online': 1,
                  'lastLogin': 1,
                  avatar: { $concat: [Helpers.getImageRootUrl(), '/', { $toLower: '$avatar.type' }, '/', '$avatar.name'] },
                }
              }
            ]
          },
        },
      ];

      if (q) {
        pipelines.push({
          $match: {
            $or: [
              { title: { $regex: q, $options: 'i' } },
              { 'users.firstName': { $regex: q, $options: 'i' } },
              { 'users.lastName': { $regex: q, $options: 'i' } },
            ]
          }
        });
      }

      pipelines.push(...[
        {
          $lookup: {
            from: 'messages',
            localField: 'lastMessage',
            foreignField: '_id',
            as: 'lastMessage',
            pipeline: [
              { $project: { conversationId: 0, updatedAt: 0 } }
            ]
          },
        },
        { $unwind: '$lastMessage' },
        {
          $lookup: {
            from: 'users',
            localField: 'lastMessage.user',
            foreignField: '_id',
            as: 'lastMessage.user',
            pipeline: [
              {
                $project: {
                  'firstName': 1,
                  'lastName': 1,
                  'online': 1,
                  'lastLogin': 1,
                  avatar: { $concat: [Helpers.getImageRootUrl(), '/', { $toLower: '$avatar.type' }, '/', '$avatar.name'] },
                }
              }
            ]
          },
        },
        { $unwind: '$lastMessage.user' },
        {
          $project: {
            createdAt: 0,
            'nicknames._id': 0,
          }
        },
        {
          $sort: {
            updatedAt: -1
          }
        }
      ]);

      results = await Conversation.aggregate(pipelines);

      results.forEach((item, index) => {
        results[index].title = getConversationTitle(item, req);
        results[index].nicknames = undefined;
      });
    }

    res.json(Helpers.createResponse({ results }));
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
    } = req.query;

    const filter = { conversationId: req.params.id };

    const options = {
      limit,
      skip: (page - 1) * limit,
      sort: '-createdAt',
    };

    const messages = await Message
      .find(filter, null, options)
      // .sort('-createdAt')
      .select('-conversationId')
      .lean({ getters: true });

    res.json(Helpers.createResponse({
      results: messages
    }));
  } catch (error) {
    next(error);
  }
};

export const sendMessage = async (req, res, next) => {
  try {
    const { user, files } = req;

    const { id } = req.params;

    const { text, type: messageType = messageTypes.MESSAGE } = req.body;

    if (!text && (!files || !files.length)) {
      return next(Error(req.t('error.failed_to_send_message')));
    }

    const message = await Message.create({
      text,
      type: messageType,
      user: user._id,
      conversationId: id,
      files: (files ?? []).map((x) => {
        let type = 'CHAT_FILE';

        if (x.mimetype.startsWith('image/')) {
          type = 'CHAT_IMAGE';
        } else if (x.mimetype.startsWith('video/')) {
          type = 'CHAT_VIDEO';
        }

        return { name: x.filename, type };
      }),
    });

    const clonedMessage = message.toJSON();

    clonedMessage.files = clonedMessage.files.map(fileGetter);

    res.json(Helpers.createResponse({
      results: clonedMessage
    }));

    const conversation = await conversationPipelines(Conversation.findByIdAndUpdate(id, {
      lastMessage: clonedMessage._id
    }, { new: true })).lean({ getters: true });

    conversation.users.forEach((item) => {
      // EMIT NEW MESSAGE
      io.in(`user_${item._id}`).emit(SocketEvents.NEW_MESSAGE, clonedMessage);

      // EMIT CONVERSATION UPDATE
      const title = getConversationTitle(conversation, { user: item });

      io.in(`user_${item._id}`).emit(SocketEvents.NEW_CONVERSATION, { ...conversation, title });
    });
  } catch (error) {
    next(error);
  }
};

export const createConversation = async (req, res, next) => {
  try {
    const { user, files } = req;

    const { text, receiver, type: messageType = messageTypes.MESSAGE } = req.body;

    const users = [user._id, receiver];

    const conversationId = new mongoose.Types.ObjectId();

    const message = await Message.create({
      text,
      conversationId,
      user: user._id,
      type: messageType,
      files: (files ?? []).map((x) => {
        let type = 'CHAT_FILE';

        if (x.mimetype.startsWith('image/')) {
          type = 'CHAT_IMAGE';
        } else if (x.mimetype.startsWith('video/')) {
          type = 'CHAT_VIDEO';
        }

        return { name: x.filename, type };
      }),
    });

    await Conversation.create({
      _id: conversationId,
      users,
      // nicknames: users.map((x) => ({
      //   user: x,
      //   nickname: '',
      // })),
      lastMessage: message._id,
    });

    const clonedMessage = message.toJSON();

    clonedMessage.files = clonedMessage.files.map(fileGetter);

    const conversation = await conversationPipelines(Conversation.findByIdAndUpdate(conversationId, {
      lastMessage: clonedMessage._id
    }, { new: true })).lean({ getters: true });

    res.json(Helpers.createResponse({
      results: conversation
    }));

    conversation.users.forEach((item) => {
      // EMIT NEW MESSAGE
      io.in(`user_${item._id}`).emit(SocketEvents.NEW_MESSAGE, clonedMessage);

      // EMIT CONVERSATION UPDATE
      const title = getConversationTitle(conversation, { user: item });

      io.in(`user_${item._id}`).emit(SocketEvents.NEW_CONVERSATION, { ...conversation, title });
    });
  } catch (error) {
    next(error);
  }
}
