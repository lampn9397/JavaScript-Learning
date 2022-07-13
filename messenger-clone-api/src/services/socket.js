import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';

import User from '../models/User';

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

  io.on("connection", (socket) => {
    console.log('A client is connected > ', socket.id);

    const { token } = socket.handshake.auth;

    const result = jwt.verify(token, JWT_SECRET);

    socket.join(`user_${result.id}`);

    User.updateOne({ _id: result.id }, {
      online: true,
      lastLogin: new Date(),
    });

    socket.on('disconnect', () => {
      User.updateOne({ _id: result.id }, {
        online: false,
        lastLogin: new Date(),
      });
    });
  });

  return io;
};
