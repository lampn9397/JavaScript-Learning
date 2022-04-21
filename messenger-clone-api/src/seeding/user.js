import { FileTypes } from '../models/File';
import User from '../models/User';

export default async () => {
  const avatar = {
    name: "default_avatar_male.png",
    type: FileTypes.USER_AVATAR
  };

  await User.create({
    username: "lampn",
    password: "lampn",
    firstName: "Lam",
    lastName: "Phan",
    avatar,
    gender: 'MALE',
    phone: "0776266985",
    email: "lampn@gmail.com",
  });
  await User.create({
    username: "trindm",
    password: "trindm",
    firstName: "Tri",
    lastName: "Ngo",
    avatar,
    gender: 'MALE',
    phone: "0123456789",
    email: "trindm@gmail.com",
  });

  console.log('--- DONE FAKE USER')
};
