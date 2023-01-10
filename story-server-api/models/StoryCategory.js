const { Schema, model } = require('mongoose');
const { number } = require('yup');

const storyCategorySchema = new Schema({
    name: {
        trim: true,
        type: String,
        minlength: [1, 'Tên danh mục ít nhất 1 kí tự'],
        maxlength: [50, 'Tên danh mục tối đa 50 kí tự'],
    },
    slug: {
        type: String,
        validate: {
            message: "Danh mục đã tồn tại",
            validator: async (value) => {
                const isStoryCategoryExist = await StoryCategory.exists({ slug: value })
                return !isStoryCategoryExist
            },
        }
    },
    storyCount: {
        type: Number,
        default: 0
    }
}, { versionKey: false })

const StoryCategory = model('story_categories', storyCategorySchema)

module.exports = StoryCategory;