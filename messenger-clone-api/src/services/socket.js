import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { jwtOptions } from '../app';
import User from '../models/User';

export const SocketEvents = {
  NEW_MESSAGE: 'new-message',
  NEW_CONVERSATION: 'new-conversation',
};

export const createSocketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  io.use(async (socket, next) => {
    const { token } = socket.handshake.auth;

    if (!token) return next(new Error('Invalid token.'));

    const { JWT_SECRET } = process.env;

    const payload = jwt.verify(token, JWT_SECRET);

    try {
      const user = await User.findById(payload.id).lean();

      if (!user) return next(new Error('Invalid token.'));
    } catch (error) {
      return next(error);
    }

    next();
  });

  io.on("connection", (socket) => {
    console.log('A client is connected > ', socket.id);
  });

  return io;
};
