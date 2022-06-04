import { Server } from 'socket.io';

export const SocketEvents = {
  NEW_MESSAGE: 'new-message',
  NEW_CONVERSATION: 'new-conversation',
};

export const createSocketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
    }
  });

  io.on("connection", (socket) => {
    console.log('A client is connected > ', socket.id);
  });

  return io;
};
