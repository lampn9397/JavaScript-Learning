import express from 'express';

import Song from '../../models/Song';
import SongList from '../../models/SongList';
import SongCategory from '../../models/SongCategory';

import { createResponse } from '../../utils/helpers';

const router = express.Router();

router.get('/list', async (req, res, next) => {
  try {
    const songs = await SongList.find({}).populate({
      path: 'songs',
      model: Song,
      populate: {
        path: 'categories',
        model: SongCategory,
        select: 'id title'
      }
    });

    res.json(createResponse({
      ok: true,
      data: songs
    }));
  } catch (error) {
    console.log('error > ', error);
    res.status(500).send({ ...error });
  }

});

export default router;
