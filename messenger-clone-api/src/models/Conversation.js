import { Schema, model } from 'mongoose';
import mongooseLeanGetters from 'mongoose-lean-getters';

const nicknameSchema = new Schema({
  user: {
    ref: 'users',
    type: Schema.Types.ObjectId,
    required: [true, 'Please input user id.']
  },
  nickname: {
    trim: true,
    type: String,
    required: [true, 'Please input nickname.']
  },
});

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
  nicknames: [nicknameSchema],
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