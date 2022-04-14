import { Schema, model } from 'mongoose';
import mongooseLeanGetters from 'mongoose-lean-getters';

import { getImageRootUrl } from '../utils/helpers';

const defaultImageName = 'default_avatar_{gender}.png';

const getDefaultImageName = (gender) => defaultImageName.replace('{gender}', gender);

const schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: [
      'MALE',
      'FEMALE',
      'OTHER',
    ],
  },
  avatar: {
    type: String,
    get: (a) => `${getImageRootUrl()}/${a}`,
    default: function () {
      return `${getImageRootUrl()}/${getDefaultImageName(this.gender.toLowerCase())}`;
    },
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  online: {
    type: Boolean,
    default: false,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  // source: {
  //   type: String,
  //   required: true,
  //   get: (s) => {
  //     const serverAddress = server.address();
  //     return `http://127.0.0.1:${serverAddress.port}/songs/${s}`;
  //   }
  // },
}, {
  timestamps: true,
  versionKey: false,
});

schema.plugin(mongooseLeanGetters);

schema.pre('save', async function () {
  if (!this.avatar) {
    const rootImageUrl = getImageRootUrl();

    this.avatar = `${rootImageUrl}/${getDefaultImageName(this.gender.toLowerCase())}`;
  }
});

export default model('users', schema);