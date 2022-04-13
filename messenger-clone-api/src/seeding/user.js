import User from '../models/User';

export default async () => {
  await User.create({
    username: "admin",
    password: "admin",
    firstname: "Lam",
    lastname: "Phan",
    avatar: "avatar",
    phone: "0776266985",
    email: "lampndev@gmail.com",
  });
};
