import mongoose from 'mongoose';
import faker from '@faker-js/faker';

import Song from '../models/Song';

export default async (totalItem = 50) => {
  await mongoose.connection.createCollection('songs');
  
  for (let i = 0; i < totalItem; i++) {
    await Song.create({
      title: faker.name.title(),
      image: faker.image.fashion(),
      singer: faker.name.findName(),
      author: faker.name.findName(),
      genre: faker.music.genre(),
    });
  }
}