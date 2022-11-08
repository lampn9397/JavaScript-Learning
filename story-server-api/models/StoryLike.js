const { Schema, model } = require('mongoose');

const storyLikeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    story: {
        type: Schema.Types.ObjectId,
        ref: 'stories',
    }
}, { versionKey: false })

module.exports = model('story_likes', storyLikeSchema);