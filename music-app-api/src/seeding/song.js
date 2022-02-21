import faker from '@faker-js/faker';

import Song from '../models/Song';
import SongCategory from '../models/SongCategory';
import SongLocation from '../models/SongLocation';
import songData from './songData';

export default async (totalItem = 50) => {
  const categories = await SongCategory.find({}).lean();

  const songLocations = await SongLocation.find({}).lean();

  let categoryIndex = 0;

  let locationIndex = 0;

  for (const item of songData) {
    await Song.create({
      title: item.title,
      image: item.image,
      singer: item.singer,
      author: item.author,
      categories: [categories[0]._id],
      songs_locations: [songLocations[0]._id],
      source: item.source,
      views: faker.datatype.number({
        min: 1000,
        max: 1000000
      }),
    });
  }

  for (let i = 0; i < totalItem; i++) {
    if (categoryIndex >= categories.length) {
      categoryIndex = 0;
    }

    if (locationIndex >= songLocations.length) {
      locationIndex = 0;
    }

    await Song.create({
      title: faker.name.title(),
      image: faker.image.fashion(),
      singer: faker.name.findName(),
      author: faker.name.findName(),
      // genre: faker.music.genre(),
      categories: [categories[categoryIndex]._id],
      songs_locations: [songLocations[locationIndex]._id],
      views: faker.datatype.number({
        min: 1000,
        max: 1000000
      }),
      source: ' ',
    });

    categoryIndex++;

    locationIndex++;
  }
}