var express = require('express');

const {
    onCreateAuthor,
    onGetAuthorList,
    onGetAuthorDetail,
    onGetStoryByAuthor,
} = require('./controllers');
const { posterMulter, validateStoryUploader } = require('./middlewares');
const router = express.Router();

router.get('/:id/story', onGetStoryByAuthor)

router.get('/:id', onGetAuthorDetail)

router.get('/', onGetAuthorList)

router.post('/', onCreateAuthor)

module.exports = router;
