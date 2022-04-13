// import 'core-js/stable';
import 'regenerator-runtime/runtime';

import cors from 'cors';
import dotenv from 'dotenv';
import logger from 'morgan';
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

dotenv.config();

import apiRouter from './routes/api';
import * as Helpers from './utils/helpers';
import User from './models/User';

const { JWT_SECRET } = process.env;

export const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
  // issuer: 'accounts.examplesoft.com',
  // audience: 'yoursite.net',
};

passport.use(new JwtStrategy(jwtOptions, async function (jwt_payload, done) {
  console.log('payload received', jwt_payload);

  try {
    const user = await User.findById(jwt_payload.id);

    if (user) {
      return done(null, user);
    }
  } catch (error) {
    console.log('passport error: ', error);
  }

  return done(err, false);
}));

const app = express();

mongoose.connect(process.env.DB_URL);

mongoose.connection.on('error', (err) => {
  if (err) {
    throw new Error(`Unable to connect to database: ${err.toString()}`);
  }
});

app.use(cors({ origin: '*' }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

app.use(passport.initialize());

app.use('/api', apiRouter);

app.use((error, req, res, next) => {
  console.error(error.stack);

  res.status(500).json(Helpers.createResponse({
    ok: false,
    message: error.stack,
  }));
});

module.exports = app;
