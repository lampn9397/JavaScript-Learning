import * as yup from 'yup';
import { Schema, model } from 'mongoose';
import mongooseLeanGetters from 'mongoose-lean-getters';

import { FileSchema } from './File';
import * as Helpers from '../utils/helpers';

const defaultImageName = 'default_avatar_{gender}.png';

const getDefaultImageName = (gender) => defaultImageName.replace('{gender}', gender);

export const Gender = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHER: 'OTHER',
};

const schema = new Schema({
  username: {
    trim: true,
    type: String,
    minlength: [1, 'Please input last name!'],
    required: [true, 'Please input username!'],
  },
  password: {
    type: String,
    required: [true, 'Please input password!'],
    minlength: [1, 'Please input password name!'],
  },
  firstName: {
    trim: true,
    type: String,
    minlength: [1, 'Please input first name!'],
    required: [true, 'Please input first name!'],
  },
  lastName: {
    trim: true,
    type: String,
    minlength: [1, 'Please input last name!'],
    required: [true, 'Please input last name!'],
  },
  gender: {
    type: String,
    required: [true, 'Please input gender!'],
    enum: {
      values: Object.keys(Gender),
      message: 'Invalid gender!',
    },
  },
  avatar: {
    trim: true,
    type: FileSchema,
    required: [true, 'Please input avatar!'],
    get: function (value) {
      return `${Helpers.getImageRootUrl()}/${value.type.toLowerCase()}/${value.name}`;
    },
  },
  phone: {
    trim: true,
    type: String,
    required: [true, 'Please input phone!'],
    validate: {
      message: () => `Invalid phone!`,
      validator: (value) => value.length === 10,
    },
  },
  email: {
    trim: true,
    type: String,
    required: [true, 'Please input email!'],
    validate: {
      message: () => `Invalid email!`,
      validator: (value) => yup.string().email().isValidSync(value),
    },
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
    this.avatar = getDefaultImageName(this.gender.toLowerCase());
  }
});

export default model('users', schema);