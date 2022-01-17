import mongoose from 'mongoose';
import faker from '@faker-js/faker';

import SongCategory from '../models/SongCategory';

export default async (totalItem = 20) => {
  for (let i = 0; i < totalItem; i++) {
    await SongCategory.create({ title: faker.music.genre() });
  }
}