const { Schema, model } = require('mongoose');

const chapterLikeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    chapter: {
        type: Schema.Types.ObjectId,
        ref: 'story_chapters',
    }
})

module.exports = model('chapter_likes', chapterLikeSchema);