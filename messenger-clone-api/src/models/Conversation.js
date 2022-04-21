import { Schema, model } from 'mongoose';
import mongooseLeanGetters from 'mongoose-lean-getters';

const schema = new Schema({
  title: {
    trim: true,
    default: '',
    type: String,
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