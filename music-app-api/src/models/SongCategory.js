import { Schema, model } from 'mongoose';

const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
  versionKey: false,
});

export default model('song_categories', schema);