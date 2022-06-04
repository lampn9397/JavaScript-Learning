import { Server } from 'socket.io';

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
