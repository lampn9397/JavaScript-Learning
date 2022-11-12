const { Schema, model } = require('mongoose');

const storyGenreSchema = new Schema({
    name: {
        trim: true,
        type: String,
        minlength: [1, 'Tên thể loại ít nhất 1 kí tự'],
        maxlength: [50, 'Tên thể loại tối đa 50 kí tự'],
    },
    slug: {
        type: String,
        validate: {
            message: "Thể loại đã tồn tại",
            validator: async (value) => {
                const isStoryGenreExist = await StoryGenre.exists({ slug: value })
                return !isStoryGenreExist
            },
        }
    },

}, { versionKey: false })

const StoryGenre = model('story_genres', storyGenreSchema)

module.exports = StoryGenre;