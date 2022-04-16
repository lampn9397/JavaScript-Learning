import User from '../models/User';

export default async () => {
  await User.create({
    username: "admin",
    password: "admin",
    firstname: "Lam",
    lastname: "Phan",
    avatar: "default_avatar_male.png",
    gender: 'MALE',
    phone: "0776266985",
    email: "lampndev@gmail.com",
  });
};
