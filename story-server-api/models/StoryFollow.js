const { Schema, model } = require('mongoose');

const storyFollowSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    story: {
        type: Schema.Types.ObjectId,
        ref: 'stories',
    }
}, { versionKey: false })

module.exports = model('story_follows', storyFollowSchema);