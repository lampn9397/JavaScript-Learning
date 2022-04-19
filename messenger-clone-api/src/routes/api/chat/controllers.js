import Conversation from '../../../models/Conversation';
import * as Helpers from '../../../utils/helpers';

export const getConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find({}).lean({ getters: true });

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
