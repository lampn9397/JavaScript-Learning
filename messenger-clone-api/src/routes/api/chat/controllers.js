import * as Helpers from '../../../utils/helpers';
import Conversation from '../../../models/Conversation';
import Message from '../../../models/Message';

export const getConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find({})
      .populate('users', 'firstName lastName avatar online lastLogin')
      .populate({
        path: 'lastMessage',
        populate: {
          path: 'user',
          select: 'firstName lastName avatar'
        }
      })
      .lean({ getters: true });

    res.json(Helpers.createResponse({
      results: conversations
    }));
  } catch (error) {
    next(error);
  }
};

export const sendMessage = async (req, res, next) => {
  try {
    res.json(Helpers.createResponse());
  } catch (error) {
    next(error);
  }
};
