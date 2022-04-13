import 'regenerator-runtime/runtime';

import dotenv from 'dotenv';
import mongoose from 'mongoose';

import user from './user';

dotenv.config();

mongoose.connect(process.env.DB_URL);

mongoose.connection.on('error', (err) => {
  if (err) {
    throw new Error(`Unable to connect to database: ${err.toString()}`);
  }
});


const startSeeding = async () => {
  await mongoose.connection.dropDatabase();

  await user();

  process.exit();
};

startSeeding();