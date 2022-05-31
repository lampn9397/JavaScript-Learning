import { Schema, model } from 'mongoose';
import mongooseLeanGetters from 'mongoose-lean-getters';

import { FileSchema } from './File';
import * as Helpers from '../utils/helpers';

export const fileGetter = (value) => {
  if (value instanceof Array) {
    return value.map(fileGetter);
  }

  return {
    ...value,
    url: `${Helpers.getImageRootUrl()}/chat_files/${value.name}`
  };
}

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
  }
}, {
  timestamps: true,
  versionKey: false,
});

schema.plugin(mongooseLeanGetters);

export default model('messages', schema);