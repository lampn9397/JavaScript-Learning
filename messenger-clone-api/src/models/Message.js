import { Schema, model } from 'mongoose';
import mongooseLeanGetters from 'mongoose-lean-getters';

import { FileSchema } from './File';
import * as Helpers from '../utils/helpers';

export const fileGetter = (value) => `${Helpers.getImageRootUrl()}/chat_files/${value.name}`

const schema = new Schema({
  text: {
    trim: true,
    type: String,
    required: [true, 'mongoose_error.model.message.message_required']
  },
  files: [FileSchema],
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