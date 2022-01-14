import express from 'express';

import Song from '../../models/Song';
import { createResponse } from '../../utils/helpers';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { page = 1 } = req.query;

    const songs = await Song.find({}).lean();

    res.json(createResponse({
      ok: true,
      data: songs
    }));
  } catch (error) {
    res.status(500).send(error);
  }

});

export default router;
