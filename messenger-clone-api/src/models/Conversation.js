import { Schema, model } from 'mongoose';
import mongooseLeanGetters from 'mongoose-lean-getters';

const schema = new Schema({
  title: {
    trim: true,
    type: String,
    minlength: [1, 'Please input chat title!'],
    required: [true, 'Please input chat title!'],
  },
  users: [{
    ref: 'users',
    type: Schema.Types.ObjectId,
  }],
  lastMessage: {
    required: true,
    ref: 'messages',
    type: Schema.Types.ObjectId,
  },
}, {
  timestamps: true,
  versionKey: false,
});

schema.plugin(mongooseLeanGetters);

export default model('conversations', schema);