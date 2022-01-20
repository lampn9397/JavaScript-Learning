import Song from '../models/Song';
import SongList from '../models/SongList';

export default async (totalItem = 20) => {
  const songs = await Song.find().lean();

  await SongList.create({
    title: 'Xuân đang về',
    songs: songs.slice(0, 20).map((x) => x._id),
  });

  await SongList.create({
    title: 'Mới cập nhật',
    songs: songs.slice(20, 40).map((x) => x._id),
  });

  await SongList.create({
    title: 'Hip-hop vibes',
    songs: songs.slice(40, 60).map((x) => x._id),
  });
}