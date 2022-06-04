import { io } from '../../../bin/www';
import * as Helpers from '../../../utils/helpers';
import { getConversationTitle } from './middlewares';
import Conversation from '../../../models/Conversation';
import { SocketEvents } from '../../../services/socket';
import Message, { fileGetter } from '../../../models/Message';

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
        // {
        //   $lookup: {
        //     from: 'users',
        //     localField: 'lastMessage.user',
        //     foreignField: '_id',
        //     as: 'lastMessage.user'
        //   },
        // },
        // { $unwind: '$lastMessage.user' },
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
    const messages = await Message
      .find({ conversationId: req.params.id })
      .sort('-createdAt')
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

    const { text } = req.body;

    if (!text && (!files || !files.length)) {
      return next(Error(req.t('error.failed_to_send_message')));
    }

    const message = await Message.create({
      text,
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

    io.emit(SocketEvents.NEW_MESSAGE, clonedMessage);

    res.json(Helpers.createResponse({
      results: clonedMessage
    }));

    const conversation = await conversationPipelines(Conversation.findByIdAndUpdate(id, {
      lastMessage: clonedMessage._id
    }, { new: true })).lean({ getters: true });

    conversation.title = getConversationTitle(conversation, req);

    conversation.nicknames = undefined;

    io.emit(SocketEvents.NEW_CONVERSATION, conversation);
  } catch (error) {
    next(error);
  }
};
