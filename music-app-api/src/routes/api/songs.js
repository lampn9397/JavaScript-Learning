import express from 'express';

import Song from '../../models/Song';
import SongList from '../../models/SongList';
import SongCategory from '../../models/SongCategory';

import { createResponse } from '../../utils/helpers';
import SongLocation from '../../models/SongLocation';

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
    res.status(500).json(createResponse({
      ok: false,
      message: 'Failed to get music list',
      error
    }));
  }
});

router.get('/rank', async (req, res, next) => {
  try {
    const songLocations = await SongLocation.aggregate([
      {
        $lookup: {
          from: 'songs',
          localField: '_id',
          foreignField: 'songs_locations',
          as: 'songs',
          pipeline: [{
            $sort: { views: -1 },
            $project: {
              categories: 0,
              songs_locations: 0,
            }
          }]
        }
      }
    ]);

    res.json(createResponse({
      ok: true,
      results: songLocations
    }));
  } catch (error) {
    res.status(500).json(createResponse({
      ok: false,
      message: 'Failed to get music by country',
      error: error.message
    }));
  }
});

router.get('/hot', async (req, res, next) => {
  try {
    const songs = await Song.aggregate([
      { $sort: { views: -1 } },
      { $limit: 6 },
      {
        $project: {
          categories: 0,
          songs_locations: 0,
        }
      }
    ]);

    res.json(createResponse({
      ok: true,
      results: songs
    }));
  } catch (error) {
    res.status(500).json(createResponse({
      ok: false,
      message: 'Failed to get music by country',
      error: error.message
    }));
  }
});

export default router;
