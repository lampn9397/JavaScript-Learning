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
    onCreateChapter,
    onGetChapterList,
    onGetChapterDetail,
    onGetTotalChapterPages,
    onGetStoryDetail,
    onFollowStory,
    onUnfollowStory,
    onUpdateStory,
    onUpdateChapter,
    onDeleteChapter,
    onLikeStory,
    onRatingStory,
    onCommentStory,
    onGetFollowStory
} = require('./controllers');
const { posterMulter, validateStoryUploader, validateStoryChapter, validateStoryExist } = require('./middlewares');
const router = express.Router();

router.get('/category', onGetCategory)

router.post('/category', onCreateCategory)

router.get('/genre', onGetGenre)

router.post('/genre', onCreateGenre)

router.get('/tag', onGetTag)

router.post('/tag', onCreateTag)

router.post('/:id/chapter', passport.authenticate('jwt', { session: false }), validateStoryUploader, onCreateChapter)

router.put('/:id/chapter/:chapterId', passport.authenticate('jwt', { session: false }), validateStoryUploader, validateStoryChapter, onUpdateChapter)

router.delete('/:id/chapter/:chapterId', passport.authenticate('jwt', { session: false }), validateStoryUploader, validateStoryChapter, onDeleteChapter)

router.get('/:id/chapter', onGetChapterList)

router.get('/:id/chapter/total', onGetTotalChapterPages)

router.get('/:id/chapter/:chapterId', onGetChapterDetail)

router.get('/:id', onGetStoryDetail)

router.delete('/:id/follow', passport.authenticate('jwt', { session: false }), validateStoryExist, onUnfollowStory);

router.post('/:id/follow', passport.authenticate('jwt', { session: false }), validateStoryExist, onFollowStory);

router.post('/:id/like', passport.authenticate('jwt', { session: false }), validateStoryExist, onLikeStory);

router.post('/:id/rating', passport.authenticate('jwt', { session: false }), validateStoryExist, onRatingStory);

router.post('/:id/comment', passport.authenticate('jwt', { session: false }), validateStoryExist, onCommentStory);

router.get('/', onGetStory)

router.put('/:id',
    passport.authenticate('jwt', { session: false }),
    validateStoryUploader,
    posterMulter.single("poster"),
    onUpdateStory
)

router.post('/', passport.authenticate('jwt', { session: false }), posterMulter.single("poster"), onCreateStory)


module.exports = router;
