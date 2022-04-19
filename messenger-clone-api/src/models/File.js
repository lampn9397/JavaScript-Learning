import { Schema, model } from 'mongoose';
import mongooseLeanGetters from 'mongoose-lean-getters';

import * as Helpers from '../utils/helpers';

const MediaTypes = {
  CHAT_IMAGE: 'CHAT_IMAGE',
  CHAT_VIDEO: 'CHAT_VIDEO',
  CHAT_FILE: 'CHAT_FILE',
  USER_AVATAR: 'USER_AVATAR',
};

const schema = new Schema({
  url: {
    trim: true,
    type: String,
    required: true,
    get: function (value) {
      return `${Helpers.getImageRootUrl()}/${this.type.toLowerCase()}/${value}`;
    },
  },
  type: {
    type: String,
    required: [true, 'Please input media type!'],
    enum: {
      values: Object.keys(MediaTypes),
      message: 'Invalid media type!',
    },
  }
}, {
  timestamps: true,
  versionKey: false,
});

schema.plugin(mongooseLeanGetters);

export default model('files', schema);