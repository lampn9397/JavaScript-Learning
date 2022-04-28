import Message from '../../../models/Message';
import * as Helpers from '../../../utils/helpers';
import Conversation from '../../../models/Conversation';

export const getConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation
      .find({ users: `${req.user._id}` })
      .sort('-updatedAt')
      .populate('users', 'firstName lastName avatar online lastLogin')
      .populate({
        path: 'lastMessage',
        populate: {
          path: 'user',
          select: 'firstName lastName avatar'
        }
      })
      .lean({ getters: true });

    conversations.forEach((item, index) => {
      if (!item.title) {
        if (item.users.length <= 2) {
          let title = '';

          const otherUserNickname = item.nicknames?.find((x) => req.user._id.equals(x.user));

          if (otherUserNickname) {
            title = otherUserNickname.nickname;
          } else {
            const otherUser = item.users.find((x) => !x._id.equals(req.user._id));

            title = `${otherUser.firstName} ${otherUser.lastName}`;
          }

          conversations[index].title = title;
        }
      }
    });

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
