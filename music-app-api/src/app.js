// import 'core-js/stable';
import 'regenerator-runtime/runtime';

import path from 'path';
import logger from 'morgan';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import { MongoConnection } from './utils/constants';

import indexRouter from './routes/index';
import songsRouter from './routes/songs';

var app = express();

mongoose.Promise = global.Promise;

mongoose.connect(MongoConnection);

mongoose.connection.on('error', (err) => {
  if (err) {
    throw new Error(`Unable to connect to database: ${err.toString()}`);
  }
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/songs', songsRouter);

module.exports = app;
