import Message from '../../../models/Message';
import * as Helpers from '../../../utils/helpers';
import Conversation from '../../../models/Conversation';

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

export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message
      .find({ conversationId: req.params.id })
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
