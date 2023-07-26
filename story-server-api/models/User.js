const { Schema, model } = require('mongoose');
const sha256 = require('crypto-js/sha256');
const yup = require('yup')
const mongooseLeanGetters = require('mongoose-lean-getters');

const Gender = {
    MALE: 'MALE',
    FEMALE: 'FEMALE',
    OTHER: 'OTHER',
}

const avatarGetter = (value) => {
    if (value.startsWith('http')) return value

    return `${process.env.HOST}${value}`
}

const userSchema = new Schema({
    username: {
        trim: true,
        type: String,
        minlength: [1, 'Tên tài khoản phải ít nhất 1 kí tự'],
        maxlength: [50, 'Tên tài khoản tối đa 50 kí tự'],
        required: [true, 'Tên tài khoản là bắt buộc'],
    },
    password: {
        type: String,
        minlength: [6, 'Mật khẩu tối thiểu 6 kí tự'],
        required: [true, 'Mật khẩu là bắt buộc'],
    },
    email: {
        type: String,
        validate: {
            message: () => 'Email không hợp lệ',
            validator: (value) => yup.string().email().isValidSync(value)
        },
        required: [true, 'Email là bắt buộc'],
    },
    name: {
        type: String,
        maxlength: [50, 'Tên người dùng tối đa 50 kí tự'],
        default: "",
    },
    gender: {
        type: String,
        enum: {
            values: Object.keys(Gender),
            message: 'Giới tính không hợp lệ'
        }
    },
    lastLogin: {
        type: Date,
        default: Date.now,
    },
    avatar: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
        get: avatarGetter,
    },
    recoveryPasswordCode: {
        type: String,
        default: ""
    },
}, { timestamps: true, versionKey: false })

userSchema.pre('save', function (next, options) {
    if (this.isModified('password')) {
        this.password = sha256(this.password).toString();
    }

    next();
});

userSchema.plugin(mongooseLeanGetters);

module.exports = model('users', userSchema);