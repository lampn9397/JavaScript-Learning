import { Schema, model } from 'mongoose';

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

export default model('songs', schema);