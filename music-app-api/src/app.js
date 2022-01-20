// import 'core-js/stable';
import 'regenerator-runtime/runtime';

import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import logger from 'morgan';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

dotenv.config();

import indexRouter from './routes';
import apiRouter from './routes/api';

const app = express();

mongoose.connect(process.env.DB_URL);

mongoose.connection.on('error', (err) => {
  if (err) {
    throw new Error(`Unable to connect to database: ${err.toString()}`);
  }
});

app.use(cors({
  origin: '*'
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);

module.exports = app;
