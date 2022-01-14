import mongoose from 'mongoose';

const schema = new mongoose.Schema({
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
  genre: {
    type: String,
    default: '',
  }
}, {
  timestamps: true,
  versionKey: false,
});

export default mongoose.model('Song', schema);