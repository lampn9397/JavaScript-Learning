import mongoose from 'mongoose';

import User from '../models/User';
import Message from '../models/Message';
import Conversation from '../models/Conversation';

export default async () => {
  const users = await User.find().lean({ getter: true });

  const messages = [];

  const conversationId = new mongoose.Types.ObjectId();

  for (const user of users) {
    const message = await Message.create({
      user: user._id,
      conversationId,
      text: `Hello from ${user.firstName} ${user.lastName}!`,
    });

    messages.push(message);
  }

  await Conversation.create({
    _id: conversationId,
    users: users.map((x) => x._id),
    nicknames: users.map((x) => ({
      user: x._id,
      nickname: `${x.firstName} ${x.lastName} nickname👌👌👌`,
    })),
    lastMessage: messages[messages.length - 1]._id,
  });

  console.log('--- DONE FAKE CHAT')
};
