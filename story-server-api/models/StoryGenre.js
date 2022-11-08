const { Schema, model } = require('mongoose');

const storyGenreSchema = new Schema({
    name: {
        trim: true,
        type: String,
        minlength: [1, 'Tên thể loại ít nhất 1 kí tự'],
        maxlength: [50, 'Tên thể loại tối đa 50 kí tự'],
    },
    slug: { type: String, slug: "name" }
}, { versionKey: false })

module.exports = model('story_genres', storyGenreSchema);