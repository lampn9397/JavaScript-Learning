const { text } = require('express');
const { Schema, model } = require('mongoose');
const { mongooseLeanGetters } = require('mongoose-lean-getters');

const avatarGetter = (value) => {
    return `${process.env.HOST}${value}`
}

const authorSchema = new Schema({
    name: {
        type: String,
        minlength: [1, 'Tên tác giả dùng ít nhất 1 kí tự'],
        maxlength: [50, 'Tên tác giả dùng tối đa 50 kí tự'],
        required: [true, 'Tên tác giả là bắt buộc'],
    },
    avatar: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
        get: avatarGetter,
    },
    description: {
        type: String,
        minlength: [1, 'Mô tả dùng ít nhất 1 kí tự'],
        maxlength: [300, 'Mô tả dùng tối đa 300 kí tự'],
    },
    birthday: {
        type: Date,
        default: null,
    }
}, { versionKey: false })

authorSchema.plugin(mongooseLeanGetters);

authorSchema.index({ name: "text" })

module.exports = model('authors', authorSchema);