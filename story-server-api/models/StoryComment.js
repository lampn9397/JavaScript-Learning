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
    parentComment: {
        type: Schema.Types.ObjectId,
        ref: 'story_comments',
        validate: {
            message: "Comment Id không tồn tại",
            validator: async (value) => {
                const isStoryCommentExist = await StoryComment.exists({ _id: value })
                return isStoryCommentExist
            },
        }
    },
    childComments: [{
        type: Schema.Types.ObjectId,
        ref: 'story_comments',
        validate: {
            message: "Comment Id không tồn tại",
            validator: async (value) => {
                const isStoryCommentExist = await StoryComment.exists({ _id: value })
                return isStoryCommentExist
            },
        }
    }],
    likedUsers: [{
        type: Schema.Types.ObjectId,
        ref: 'users',
    }],
}, { timestamps: true, versionKey: false })

const StoryComment = model('story_comments', storyCommentSchema)

module.exports = StoryComment;
