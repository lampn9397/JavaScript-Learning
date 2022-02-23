import express from 'express';

import Song from '../../models/Song';
import { server } from '../../bin/www';
import SongList from '../../models/SongList';
import SongLocation from '../../models/SongLocation';
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
    }).lean({ getters: true });

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
    const serverAddress = server.address();

    const songLocations = await SongLocation.aggregate([
      {
        $lookup: {
          from: 'songs',
          localField: '_id',
          foreignField: 'songs_locations',
          as: 'songs',
          pipeline: [
            {
              $set: {
                source: { $concat: [`http://127.0.0.1:${serverAddress.port}/songs/`, "$source"] }
              }
            },
            {
              $sort: { views: -1 },
            },
            {
              $project: {
                categories: 0,
                songs_locations: 0,
              }
            },
          ]
        }
      }
    ]);

    res.json(createResponse({
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
    const serverAddress = server.address();

    const songs = await Song.aggregate([
      {
        $set: {
          source: { $concat: [`http://127.0.0.1:${serverAddress.port}/songs/`, "$source"] }
        }
      },
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

router.get('/:slug', async (req, res, next) => {
  try {
    const { slug } = req.params;

    const song = await Song.findOne({ slug }).populate({
      path: 'categories',
      model: SongCategory,
      select: 'id title'
    }).lean({ getters: true });

    if (!song) return res.status(404).end();

    res.json(createResponse({
      ok: true,
      results: song
    }));
  } catch (error) {
    res.status(500).json(createResponse({
      ok: false,
      message: 'Failed to get music',
      error: error.message
    }));
  }
});

export default router;
