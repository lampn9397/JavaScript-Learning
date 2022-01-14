import express from 'express';

import songsRouter from './songs';

const router = express.Router();

router.use('/song', songsRouter)

export default router;
