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
      results: songs
    }));
  } catch (error) {
    res.status(500)
      .json(createResponse({
        ok: false,
        message: 'Failed to get music list',
        error
      }));
  }
});

export default router;
