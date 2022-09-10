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

export const REACTION_TYPES = {
  LIKE: 'LIKE',
  LOVE: 'LOVE',
  ANGRY: 'ANGRY',
  SAD: 'SAD',
}

const reactionScheme = new Schema({
  user: {
    ref: 'users',
    type: Schema.Types.ObjectId,
  },
  type: {
    type: String,
    enum: {
      values: Object.keys(REACTION_TYPES),
      message: 'mongoose_error.model.message.reaction_enum',
    },
  }
});

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
    type: String,
    enum: Object.keys(messageTypes),
    default: messageTypes.MESSAGE,
  },
  readUsers: {
    type: [{
      ref: 'users',
      type: Schema.Types.ObjectId,
    }],
    default: [],
  },
  reactions: [reactionScheme]
}, {
  timestamps: true,
  versionKey: false,
});

schema.plugin(mongooseLeanGetters);

export default model('messages', schema);