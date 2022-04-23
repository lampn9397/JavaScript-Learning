import * as yup from 'yup';
import { Schema, model } from 'mongoose';
import mongooseLeanGetters from 'mongoose-lean-getters';

import { FileSchema, FileTypes } from './File';
import * as Helpers from '../utils/helpers';

const defaultImageName = 'default_avatar_{gender}.png';

const getDefaultImageName = (gender) => defaultImageName.replace('{gender}', gender);

const getUserAvatar = (user) => ({
  name: getDefaultImageName(user.gender.toLowerCase()),
  type: FileTypes.USER_AVATAR
})

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
    type: FileSchema,
    get: function (value) {
      return `${Helpers.getImageRootUrl()}/${value.type.toLowerCase()}/${value.name}`;
    },
    default: getUserAvatar,
  },
  phone: {
    trim: true,
    type: String,
    required: [true, 'Please input phone!'],
    validate: {
      message: () => `Least phone length is 10!`,
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
}, {
  timestamps: true,
  versionKey: false,
});

schema.pre('save', function () {
  if (!this.avatar) {
    this.avatar = getUserAvatar(this);
  }
  console.log('after > ', this.avatar);
});

schema.plugin(mongooseLeanGetters);

export default model('users', schema);