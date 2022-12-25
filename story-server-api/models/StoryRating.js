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
        maxlength: [300, 'Phản hồi truyện tối đa 500 kí tự'],
    },
    rating: {
        type: Number,
        required: [true, 'Điểm đánh giá là bắt buộc'],
        min: [1, 'Số sao thấp nhất là 1'],
        max: [5, 'Số sao lớn nhất là 5'],
        validate: [
            {
                message: "Số thứ tự phải là số nguyên dương",
                validator: Number.isInteger
            }
        ]

    }
}, { versionKey: false })

module.exports = model('story_ratings', storyRatingSchema);