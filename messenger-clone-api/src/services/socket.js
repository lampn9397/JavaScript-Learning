import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import Message from '../models/Message';
import Conversation from '../models/Conversation';
import { getConversationTitle } from '../routes/api/chat/middlewares';

export const SocketEvents = {
  NEW_MESSAGE: 'new-message',
  NEW_CONVERSATION: 'new-conversation',
  READ_MESSAGE: 'read-message',
};

export const createSocketServer = (server) => {
  const { JWT_SECRET } = process.env;

  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  const sendUserStatusToOthers = async (userId) => {
    const conversations = await Conversation.find({ users: userId })
      .populate('users', 'firstName lastName avatar online lastLogin')
      .populate({
        path: 'lastMessage',
        populate: {
          path: 'user',
          select: 'firstName lastName avatar'
        }
      })
      .lean({ getters: true });

    conversations.forEach((c, index) => {
      const title = getConversationTitle(c, { user: { _id: userId } });

      c.users.filter((x) => x._id !== userId).forEach((u) => {
        io.in(`user_${u._id}`).emit(SocketEvents.NEW_CONVERSATION, { ...c, title });
      });
    })
  }

  // Authentication middleware
  io.use(async (socket, next) => {
    const { token } = socket.handshake.auth;

    if (!token) return next(new Error('Invalid token.'));

    const result = jwt.verify(token, JWT_SECRET);

    try {
      const user = await User.findById(result.id).lean();

      if (!user) return next(new Error('Invalid token.'));
    } catch (error) {
      return next(error);
    }

    next();
  });

  io.on("connection", async (socket) => {
    const { token } = socket.handshake.auth;

    const user = jwt.verify(token, JWT_SECRET);

    socket.join(`user_${user.id}`);

    socket.on('disconnect', async () => {
      await User.updateOne({ _id: user.id }, {
        online: false,
        lastLogin: new Date(),
      });

      await sendUserStatusToOthers(user.id);
    })

    socket.on(SocketEvents.READ_MESSAGE, async (messageId) => {
      const update = {
        $addToSet: { readUsers: user.id }
      };

      const message = await Message
        .findByIdAndUpdate(messageId, update, { new: true })
        .populate('user', 'firstName lastName avatar')
        .populate('readUsers', 'firstName lastName avatar')
        .lean({ getters: true });

      const conversation = await Conversation
        .findById(message.conversationId)
        .populate('users', 'firstName lastName avatar online lastLogin')
        .lean({ getters: true });

      conversation.users.forEach((item) => {
        io.in(`user_${item._id}`).emit(SocketEvents.READ_MESSAGE, message);
      });
    });

    await User.updateOne({ _id: user.id }, {
      online: true,
      lastLogin: new Date(),
    });

    await sendUserStatusToOthers(user.id);
  });

  return io;
};
