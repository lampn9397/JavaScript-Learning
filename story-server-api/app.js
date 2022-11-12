const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const JwtStrategy = require('passport-jwt').Strategy;
const mongoose = require('mongoose');
const passport = require('passport');
const dotenv = require('dotenv')
const slug = require('mongoose-slug-generator');
const multer = require('multer');

mongoose.plugin(slug, { lang: "vi", });

dotenv.config();

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const storyRouter = require('./routes/story');
const { jwtOptions, multerErrorMessages } = require('./utils/constants');
const User = require('./models/User');

passport.use(new JwtStrategy(jwtOptions, async function (jwt_payload, done) {
    try {

        const user = await User.findById(jwt_payload.id, '-password').lean({ getters: true })

        if (user) {
            return done(null, user)
        } else {
            return done(null, false)
        }
    } catch (error) {
        return done(error, false)
    }

}));

var app = express();

mongoose.connect(process.env.DB_URL)

mongoose.connection.on('error', (err) => {
    if (err) {
        throw new Error(`Unable to connect to database: ${err.toString()}`);
    }
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); //_dirname:thu muc hien tai

app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/story', storyRouter);

app.use((error, req, res, next) => {
    let { message } = error;

    const isMongooseError = !!error.errors;

    if (isMongooseError) {
        const [errorField] = Object.keys(error.errors);

        message = error.errors[errorField].message;

    } else if (error instanceof multer.MulterError) {
        message = multerErrorMessages[error.code]
    } else {
        console.error(error);
    }


    res.status(400).json({
        ok: false,
        message,
    })
})

module.exports = app;
