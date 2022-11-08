const { Schema, model } = require('mongoose');

const storyChapterSchema = new Schema({
    story: {
        type: Schema.Types.ObjectId,
        ref: 'stories',
    },
    numberOrder: {
        type: Number,
        required: [true, 'Số thứ tự chương là bắt buộc'],
    },
    chapterNumber: {
        type: Number,
        required: [true, 'Số chương là bắt buộc'],
    },
    name: {
        trim: true,
        type: String,
        minlength: [1, 'Tên chương dùng ít nhất 1 kí tự'],
        maxlength: [50, 'Tên chương dùng tối đa 50 kí tự'],
        required: [true, 'Tên chương là bắt buộc'],
    },
    bookNumber: {
        type: Number,
        required: [true, 'Số quyển là bắt buộc'],
    },
    bookName: {
        trim: true,
        type: String,
        minlength: [1, 'Tên quyển dùng ít nhất 1 kí tự'],
        maxlength: [50, 'Tên quyển dùng tối đa 50 kí tự'],
    },
    content: {
        type: String,
        required: [true, 'Nội dung chương là bắt buộc'],
    },
    totalLikes: {
        type: Number,
        default: 0,
    }
}, { timestamps: true, versionKey: false })

module.exports = model('story_chapters', storyChapterSchema);