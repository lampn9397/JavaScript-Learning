import 'regenerator-runtime/runtime';

import dotenv from 'dotenv';
import mongoose from 'mongoose';

import song from './song';
import songCategory from './songCategory';
import songList from './songList';

dotenv.config();

mongoose.connect(process.env.DB_URL);

mongoose.connection.on('error', (err) => {
  if (err) {
    throw new Error(`Unable to connect to database: ${err.toString()}`);
  }
});


const startSeeding = async () => {
  await mongoose.connection.dropDatabase();

  await songCategory();
  await song();
  await songList();

  process.exit();
};

startSeeding();