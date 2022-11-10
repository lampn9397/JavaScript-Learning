var express = require('express');
const passport = require('passport')

const {
    onGetCategory,
    onCreateCategory,
    onGetGenre,
    onCreateGenre,
    onGetTag,
    onCreateTag,
    onGetStory,
    onCreateStory,
} = require('./controllers');
const { posterMulter } = require('./middlewares');
const router = express.Router();

router.get('/category', onGetCategory)

router.post('/category', onCreateCategory)

router.get('/genre', onGetGenre)

router.post('/genre', onCreateGenre)

router.get('/tag', onGetTag)

router.post('/tag', onCreateTag)

router.get('/', onGetStory)

router.post('/', passport.authenticate('jwt', { session: false }), posterMulter.single("poster"), onCreateStory)

module.exports = router;
