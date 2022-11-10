const { Schema, model } = require('mongoose');
const yup = require('yup');
const StoryCategory = require('./StoryCategory');
const StoryGenre = require('./StoryGenre');
const StoryTag = require('./StoryTag');
const mongooseLeanGetters = require('mongoose-lean-getters');

const StoryStatus = {
    ON_GOING: 'ON_GOING',
    COMPLETED: 'COMPLETED',
    DROP: 'DROP',
}

const posterGetter = (value) => {
    return `${process.env.HOST}${value}`
}

const storySchema = new Schema({
    name: {
        trim: true,
        type: String,
        minlength: [1, 'Tên truyện dùng ít nhất 1 kí tự'],
        maxlength: [50, 'Tên truyện dùng tối đa 50 kí tự'],
        required: [true, 'Tên truyện là bắt buộc'],
    },
    author: {
        trim: true,
        type: String,
        minlength: [1, 'Tên tác giả dùng ít nhất 1 kí tự'],
        maxlength: [50, 'Tên tác giả dùng tối đa 50 kí tự'],
        default: null,
    },
    genre: {
        type: Schema.Types.ObjectId,
        ref: 'story_genres',
        required: [true, 'Thể loại là bắt buộc'],
        validate: {
            message: "Id Genre Không Hợp Lệ",
            validator: async (value) => {
                const isStoryGenreExist = await StoryGenre.exists({ _id: value })
                return isStoryGenreExist
            },
        }
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'story_categories',
        required: [true, 'Danh mục là bắt buộc'],
        validate: {
            message: "Id Category Không Hợp Lệ",
            validator: async (value) => {
                const isStoryCategoryExist = await StoryCategory.exists({ _id: value })
                return isStoryCategoryExist
            },
        }
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'story_tags',
        validate: {
            message: "Id Tag Không Hợp Lệ",
            validator: async (value) => {
                const isStoryTagExist = await StoryTag.exists({ _id: value })
                return isStoryTagExist
            },
        }
    }],
    status: {
        type: String,
        enum: {
            values: Object.keys(StoryStatus),
            message: 'Trạng thái không hợp lệ'
        },
        default: StoryStatus.ON_GOING
    },
    totalLikes: {
        type: Number,
        default: 0,
    },
    totalViews: {
        type: Number,
        default: 0,
    },
    totalFollows: {
        type: Number,
        default: 0,
    },
    totalRatings: {
        type: Number,
        default: 0,
    },
    totalChapter: {
        type: Number,
        default: 0,
    },
    totalComment: {
        type: Number,
        default: 0,
    },
    uploader: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: [true, 'Người đăng là bắt buộc'],
    },
    poster: {
        type: String,
        required: [true, 'Bìa truyện là bắt buộc'],
        get: posterGetter,
    },
    description: {
        type: String,
        minlength: [1, 'Mô tả dùng ít nhất 1 kí tự'],
        maxlength: [300, 'Mô tả dùng tối đa 300 kí tự'],
        required: [true, 'Mô tả là bắt buộc'],
    },
    isPublish: {
        type: Boolean,
        default: false,
    }
}, {
    versionKey: false,
    timestamps: true,
}) //khong hien thi version document

storySchema.plugin(mongooseLeanGetters);

module.exports = model('stories', storySchema);