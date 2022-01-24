import SongLocation from '../models/SongLocation';

export default async (totalItem = 20) => {
  await SongLocation.create({ name: 'Việt Nam', code: 'VN' });

  await SongLocation.create({ name: 'Âu Mỹ', code: 'US-UK' });

  await SongLocation.create({ name: 'Hàn Quốc', code: 'KR' });
}