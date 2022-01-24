import { Schema, model } from 'mongoose';

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
  versionKey: false,
});

export default model('song_locations', schema);