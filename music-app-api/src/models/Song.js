import { Schema, model } from 'mongoose';
import mongooseLeanGetters from 'mongoose-lean-getters';

import { server } from '../bin/www';

export const musicTypes = {
  VIDEO: 'VIDEO',
  AUDIO: 'AUDIO',
};

const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  singer: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'song_categories',
  }],
  views: {
    type: Number,
    default: 0,
  },
  source: {
    type: String,
    required: true,
    get: (s) => {
      const serverAddress = server.address();
      return `http://127.0.0.1:${serverAddress.port}/songs/${s}`;
    }
  },
  songs_locations: [{
    type: Schema.Types.ObjectId,
    ref: 'song_locations',
  }],
  type: {
    type: String,
    enum: [
      musicTypes.AUDIO,
      musicTypes.VIDEO,
    ],
    default: musicTypes.AUDIO,
  }
}, {
  timestamps: true,
  versionKey: false,
});

schema.plugin(mongooseLeanGetters)

export default model('songs', schema);