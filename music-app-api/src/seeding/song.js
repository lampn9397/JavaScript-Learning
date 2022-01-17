import mongoose from 'mongoose';
import faker from '@faker-js/faker';

import Song from '../models/Song';
import SongCategory from '../models/SongCategory';

export default async (totalItem = 60) => {
  const categories = await SongCategory.find({}).lean();

  let categoryIndex = 0;

  for (let i = 0; i < totalItem; i++) {

    if (categoryIndex >= categories.length) {
      categoryIndex = 0;
    }

    await Song.create({
      title: faker.name.title(),
      image: faker.image.fashion(),
      singer: faker.name.findName(),
      author: faker.name.findName(),
      // genre: faker.music.genre(),
      categories: [categories[categoryIndex]._id],
    });

    categoryIndex++;
  }
}