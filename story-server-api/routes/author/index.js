var express = require('express');

const {
    onCreateAuthor,
    onGetAuthorList,
} = require('./controllers');
const { posterMulter, validateStoryUploader } = require('./middlewares');
const router = express.Router();

router.get('/', onGetAuthorList)

router.post('/', onCreateAuthor)

module.exports = router;
