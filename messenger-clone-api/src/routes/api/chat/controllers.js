import Message from '../../../models/Message';
import * as Helpers from '../../../utils/helpers';
import Conversation from '../../../models/Conversation';
import { getConversationTitle } from './middlewares';

export const getConversations = async (req, res, next) => {
  try {
    let results = [];

    const processPipelines = (query) => {
      return query
        .select('-nicknames')
        .populate('users', 'firstName lastName avatar online lastLogin')
        .populate({
          path: 'lastMessage',
          populate: {
            path: 'user',
            select: 'firstName lastName avatar'
          }
        })
    }

    if (req.params.id) {
      results = await processPipelines(Conversation.findById(req.params.id)).lean({ getters: true });

      results.title = getConversationTitle(results, req);
    } else {
      const { q } = req.query;

      // let pipeline = processPipelines(
      //   Conversation
      //     .find({ users: `${req.user._id}` })
      //     .sort('-updatedAt')
      // );

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
      ];

      if (q) {
        // pipeline = pipeline.find({
        //   $or: [
        //     { title: { $regex: q, $options: 'i' } },
        //     { 'users.firstName': { $regex: q, $options: 'i' } },
        //     { 'users.lastName': { $regex: q, $options: 'i' } },
        //   ]
        // });
      }

      results = await Conversation.aggregate(pipelines);

      results.forEach((item, index) => {
        results[index].title = getConversationTitle(item, req);
      });
    }

    res.json(Helpers.createResponse({
      results
    }));
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message
      .find({ conversationId: req.params.id })
      .sort('createdAt')
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
    const { text, id } = req.body;

    const message = await Message.create({
      text,
      user: req.user._id,
      conversationId: id,
    });

    res.json(Helpers.createResponse({
      results: message
    }));
  } catch (error) {
    next(error);
  }
};
