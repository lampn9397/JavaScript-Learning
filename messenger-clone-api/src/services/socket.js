import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import Conversation from '../models/Conversation';
import { getConversationTitle } from '../routes/api/chat/middlewares';

export const SocketEvents = {
  NEW_MESSAGE: 'new-message',
  NEW_CONVERSATION: 'new-conversation',
};

export const createSocketServer = (server) => {
  const { JWT_SECRET } = process.env;

  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

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
    console.log('A client is connected > ', socket.id);

    const { token } = socket.handshake.auth;

    const result = jwt.verify(token, JWT_SECRET);

    socket.join(`user_${result.id}`);

    socket.on('disconnect', async () => {
      await User.updateOne({ _id: result.id }, {
        online: false,
        lastLogin: new Date(),
      });
    });

    await User.updateOne({ _id: result.id }, {
      online: true,
      lastLogin: new Date(),
    });

    const conversations = await Conversation.find({ users: result.id })
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
      const title = getConversationTitle(item, req);

      c.users.filter((x) => x._id !== result.id).forEach((u) => {
        io.in(`user_${u._id}`).emit(SocketEvents.NEW_CONVERSATION, { ...c, title });
      });
    })
  });

  return io;
};
