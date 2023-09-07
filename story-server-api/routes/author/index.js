var express = require('express');

const {
    onCreateAuthor,
    onGetAuthorList,
    onGetAuthorDetail,
    onGetStoryByAuthor,
    onGetMyStoryAuthors,
} = require('./controllers');
const { posterMulter, validateStoryUploader } = require('./middlewares');
const passport = require('passport');
const router = express.Router();

router.get('/my-story-authors',
    passport.authenticate('jwt', { session: false }),
    onGetMyStoryAuthors,
);

router.get('/:id/story', onGetStoryByAuthor);

router.get('/:id', onGetAuthorDetail);

router.get('/', onGetAuthorList);

router.post('/', onCreateAuthor);

module.exports = router;
