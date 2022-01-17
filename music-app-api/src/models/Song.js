import { Schema, model } from 'mongoose';

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
  // genre: {
  //   type: String,
  //   default: '',
  // },
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'song_categories',
  }],
}, {
  timestamps: true,
  versionKey: false,
});

export default model('songs', schema);