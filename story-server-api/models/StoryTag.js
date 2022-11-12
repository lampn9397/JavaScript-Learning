const { Schema, model } = require('mongoose');

const storyTagSchema = new Schema({
    name: {
        trim: true,
        type: String,
        minlength: [1, 'Tên danh mục con ít nhất 1 kí tự'],
        maxlength: [50, 'Tên danh mục con tối đa 50 kí tự'],
    },
    slug: {
        type: String,
        validate: {
            message: "Thẻ đã tồn tại",
            validator: async (value) => {
                const isStoryTagExist = await StoryTag.exists({ slug: value })
                return !isStoryTagExist
            },
        }
    }
}, { versionKey: false })

const StoryTag = model('story_tags', storyTagSchema)

module.exports = StoryTag;