import { Schema, model } from 'mongoose';
import mongooseLeanGetters from 'mongoose-lean-getters';

export const FileTypes = {
  CHAT_IMAGE: 'CHAT_IMAGE',
  CHAT_VIDEO: 'CHAT_VIDEO',
  CHAT_FILE: 'CHAT_FILE',
  USER_AVATAR: 'USER_AVATAR',
};

export const FileSchema = new Schema({
  name: {
    trim: true,
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: [true, 'mongoose_error.model.file.type_required'],
    enum: {
      values: Object.keys(FileTypes),
      message: 'mongoose_error.model.file.type_enum',
    },
  }
}, {
  timestamps: true,
  versionKey: false,
});

FileSchema.plugin(mongooseLeanGetters);

export default model('files', FileSchema);