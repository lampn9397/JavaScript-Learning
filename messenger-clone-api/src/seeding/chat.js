import User from '../models/User';
import Message from '../models/Message';
import Conversation from '../models/Conversation';

export default async () => {
  const users = await User.find().lean({ getter: true });

  const messages = [];

  for (const user of users) {
    const message = await Message.create({
      user: user._id,
      text: `Hello from ${user.firstName} ${user.lastName}!`,
    });

    messages.push(message);
  }

  await Conversation.create({
    users: users.map((x) => x._id),
    lastMessage: messages[messages.length -1]._id,
  });
  
  console.log('--- DONE FAKE CHAT')
};
