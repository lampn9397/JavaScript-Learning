import { Schema, model } from 'mongoose';
import mongooseLeanGetters from 'mongoose-lean-getters';

import FileSchema from './File';

const schema = new Schema({
  text: {
    trim: true,
    type: String,
  },
  files: [FileSchema],
  user: {
    ref: 'users',
    type: Schema.Types.ObjectId,
  },
}, {
  timestamps: true,
  versionKey: false,
});

schema.plugin(mongooseLeanGetters);

export default model('messages', schema);