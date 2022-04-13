import { Schema, model } from 'mongoose';
import mongooseLeanGetters from 'mongoose-lean-getters';

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
  avatar: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
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

export default model('users', schema);