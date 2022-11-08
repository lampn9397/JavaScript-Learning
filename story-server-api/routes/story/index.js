var express = require('express');
const passport = require('passport')

const {
    onGetCategory,
    onCreateCategory,
} = require('./controllers');
const { userAvatarMulter } = require('./middlewares');
const router = express.Router();

router.get('/category', onGetCategory)

router.post('/category', onCreateCategory)

module.exports = router;
