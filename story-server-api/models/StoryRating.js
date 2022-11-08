const { Schema, model } = require('mongoose');

const storyRatingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    story: {
        type: Schema.Types.ObjectId,
        ref: 'stories',
    },
    feedback: {
        type: String,
        default: '',
    },
    rating: {
        type: Number,
        required: [true, 'Điểm đánh giá là bắt buộc']

    }
}, { versionKey: false })

module.exports = model('story_ratings', storyRatingSchema);