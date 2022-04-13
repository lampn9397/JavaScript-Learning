// import 'core-js/stable';
import 'regenerator-runtime/runtime';

import cors from 'cors';
import dotenv from 'dotenv';
import logger from 'morgan';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

dotenv.config();

import apiRouter from './routes/api';
import * as Helpers from './utils/helpers';

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

app.use('/api', apiRouter);

app.use((error, req, res, next) => {
  console.error(error.stack);

  res.status(500).json(Helpers.createResponse({
    ok: false,
    message: error.stack,
  }));
});

module.exports = app;
