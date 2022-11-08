const { Schema, model } = require('mongoose');

const storyCategorySchema = new Schema({
    name: {
        trim: true,
        type: String,
        minlength: [1, 'Tên danh mục ít nhất 1 kí tự'],
        maxlength: [50, 'Tên danh mục tối đa 50 kí tự'],
    },
    slug: { type: String, slug: "name" }
}, { versionKey: false })

module.exports = model('story_categories', storyCategorySchema);