import { Server } from 'socket.io';

import { server } from '../bin/www';

export const io = new Server(server, { /* options */ });

io.on("connection", (socket) => {
  console.log('A client is connected > ', socket.id);
});
