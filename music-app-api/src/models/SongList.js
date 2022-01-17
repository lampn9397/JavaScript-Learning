import { Schema, model } from 'mongoose';

const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  songs: [{
    type: Schema.Types.ObjectId,
    ref: 'songs',
  }]
}, {
  timestamps: true,
  versionKey: false,
});

export default model('song_lists', schema);