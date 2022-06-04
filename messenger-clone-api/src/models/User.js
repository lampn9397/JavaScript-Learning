import * as yup from 'yup';
import { Schema, model } from 'mongoose';
import mongooseLeanGetters from 'mongoose-lean-getters';

import * as Helpers from '../utils/helpers';
import { FileSchema, FileTypes } from './File';

const defaultImageName = 'default_avatar_{gender}.png';

const getDefaultImageName = (gender) => defaultImageName.replace('{gender}', gender);

const getDefaultUserAvatar = (user) => {
  return ({
    name: getDefaultImageName(user.gender.toLowerCase()),
    type: FileTypes.USER_AVATAR
  })
};

export function avatarGetter(value, user) {
  let type = value?.type;
  let name = value?.name;

  if (!value) {
    ({ type, name } = getDefaultUserAvatar(this || user));
  }

  return `${Helpers.getImageRootUrl()}/${type.toLowerCase()}/${name}`;
}

export const Gender = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHER: 'OTHER',
};

const schema = new Schema({
  username: {
    trim: true,
    type: String,
    minlength: [1, 'mongoose_error.model.user.username_required'],
    required: [true, 'mongoose_error.model.user.username_required'],
  },
  password: {
    type: String,
    required: [true, 'mongoose_error.model.user.password_required'],
    minlength: [1, 'mongoose_error.model.user.password_required'],
  },
  firstName: {
    trim: true,
    type: String,
    minlength: [1, 'mongoose_error.model.user.firstname_required'],
    required: [true, 'mongoose_error.model.user.firstname_required'],
  },
  lastName: {
    trim: true,
    type: String,
    minlength: [1, 'mongoose_error.model.user.lastname_required'],
    required: [true, 'mongoose_error.model.user.lastname_required'],
  },
  gender: {
    type: String,
    required: [true, 'mongoose_error.model.user.gender_required'],
    enum: {
      values: Object.keys(Gender),
      message: 'mongoose_error.model.user.gender_enum',
    },
  },
  avatar: {
    type: FileSchema,
    get: avatarGetter,
  },
  phone: {
    trim: true,
    type: String,
    required: [true, 'mongoose_error.model.user.phone_required'],
    validate: {
      message: () => 'mongoose_error.model.user.phone_length',
      validator: (value) => value.length === 10,
    },
  },
  email: {
    trim: true,
    type: String,
    required: [true, 'mongoose_error.model.user.email_required'],
    validate: {
      message: () => 'mongoose_error.model.user.email_invalid',
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

schema.pre('save', function (next) {
  const avatar = this.get('avatar');

  if (!avatar) {
    const user = this.toJSON();

    this.set('avatar', getDefaultUserAvatar(user));
  }

  next();
});

schema.plugin(mongooseLeanGetters);

export default model('users', schema);