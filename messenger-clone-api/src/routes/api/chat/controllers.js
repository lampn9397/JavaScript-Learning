import Message from '../../../models/Message';
import * as Helpers from '../../../utils/helpers';
import Conversation from '../../../models/Conversation';
import { getConversationTitle } from './middlewares';

export const getConversations = async (req, res, next) => {
  try {
    let results = [];

    const processPipelines = (query) => {
      return query
        .populate('users', 'firstName lastName avatar online lastLogin')
        .populate({
          path: 'lastMessage',
          populate: {
            path: 'user',
            select: 'firstName lastName avatar'
          }
        })
        .lean({ getters: true })
    }

    if (req.params.id) {
      results = await processPipelines(Conversation.findById(req.params.id));

      results.title = getConversationTitle(results, req);
    } else {
      results = await processPipelines(
        Conversation
          .find({ users: `${req.user._id}` })
          .sort('-updatedAt')
      );

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

    await Message.create({
      text,
      user: req.user._id,
      conversationId: id,
    });

    res.end();
  } catch (error) {
    next(error);
  }
};
