const { Schema, model } = require('mongoose');

const storyCommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    story: {
        type: Schema.Types.ObjectId,
        ref: 'stories',
    },
    content: {
        type: String,
        required: [true, 'Nội dung bình luận là bắt buộc'],
        maxlength: [300, 'Tên tác giả dùng tối đa 300 kí tự'],
    },
}, { timestamps: true, versionKey: false })

module.exports = model('story_comments', storyCommentSchema);