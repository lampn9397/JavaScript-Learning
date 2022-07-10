import { Schema, model } from 'mongoose';
import mongooseLeanGetters from 'mongoose-lean-getters';

import { FileSchema } from './File';
import * as Helpers from '../utils/helpers';

export const fileGetter = (value) => {
  if (value instanceof Array) {
    return value.map(fileGetter);
  }

  return {
    name: value.name,
    type: value.type,
    url: `${Helpers.getImageRootUrl()}/chat_files/${value.name}`
  };
}

export const messageTypes = {
  MESSAGE: 'MESSAGE',
  LIKE: 'LIKE',
};

const schema = new Schema({
  text: {
    trim: true,
    type: String,
    // required: [true, 'mongoose_error.model.message.message_required']
  },
  files: {
    type: [FileSchema],
    get: fileGetter,
  },
  user: {
    ref: 'users',
    type: Schema.Types.ObjectId,
  },
  conversationId: {
    required: true,
    ref: 'conversations',
    type: Schema.Types.ObjectId,
  },
  type: {
    enum: Object.values(messageTypes),
    default: messageTypes.MESSAGE,
  }
}, {
  timestamps: true,
  versionKey: false,
});

schema.plugin(mongooseLeanGetters);

export default model('messages', schema);