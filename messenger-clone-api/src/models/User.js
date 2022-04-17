import * as yup from 'yup';
import { Schema, model } from 'mongoose';
import mongooseLeanGetters from 'mongoose-lean-getters';

import * as Helpers from '../utils/helpers';

const defaultImageName = 'default_avatar_{gender}.png';

const getDefaultImageName = (gender) => defaultImageName.replace('{gender}', gender);

export const gender = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHER: 'OTHER',
}

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
  firstname: {
    trim: true,
    type: String,
    minlength: [1, 'Please input first name!'],
    required: [true, 'Please input first name!'],
  },
  lastname: {
    trim: true,
    type: String,
    minlength: [1, 'Please input last name!'],
    required: [true, 'Please input last name!'],
  },
  gender: {
    type: String,
    required: [true, 'Please input gender!'],
    enum: {
      values: [
        gender.MALE,
        gender.FEMALE,
        gender.OTHER,
      ],
      message: 'Invalid gender!',
    },
  },
  avatar: {
    type: String,
    get: (a) => `${Helpers.getImageRootUrl()}/${a}`,
    default: getDefaultImageName(gender.MALE.toLowerCase()),
  },
  phone: {
    trim: true,
    type: String,
    required: [true, 'Please input phone!'],
    validate: {
      message: () => `Invalid phone!`,
      validator: (v) => v.length === 10,
    },
  },
  email: {
    trim: true,
    type: String,
    required: [true, 'Please input email!'],
    validate: {
      message: () => `Invalid email!`,
      validator: (v) => yup.string().email().isValidSync(v),
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
  } else {

  }
});

export default model('users', schema);