import express from 'express';

import user from './user';
import chat from './chat';

const router = express.Router();

router.use('/user', user);

router.use('/chat', chat);

export default router;
