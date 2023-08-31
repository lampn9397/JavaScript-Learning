const { Schema, model } = require('mongoose');
const Story = require('./Story');

const storyChapterSchema = new Schema({
    story: {
        type: Schema.Types.ObjectId,
        ref: 'stories',
        validate: {
            message: "Truyện không tồn tại",
            validator: async (value) => {
                const isStoryExist = await Story.exists({ _id: value })
                return isStoryExist
            },
        }
    },
    numberOrder: {
        type: Number,
        required: [true, 'Số thứ tự chương là bắt buộc'],
        min: [1, 'Số thứ tự thấp nhất là 1'],
        validate: [
            {
                message: "Số thứ tự phải là số nguyên dương",
                validator: Number.isInteger
            },
            {
                message: "Số thứ tự đã tồn tại",
                validator: async function (value) {

                    const isStoryNumberOrderExist = await StoryChapter.exists({
                        numberOrder: value,
                        story: this._conditions?.story ?? this.story
                    })
                    return !isStoryNumberOrderExist
                },
            }
        ]
    },
    chapterNumber: {
        type: Number,
        required: [true, 'Số chương là bắt buộc'],
        min: [1, 'Số chương thấp nhất là 1'],
        validate: [
            {
                message: "Số chương phải là số nguyên dương",
                validator: Number.isInteger
            },
            {
                message: "Số chương đã tồn tại",
                validator: async function (value) {
                    const isStoryChapterExist = await StoryChapter.exists({
                        chapterNumber: value,
                        story: this._conditions?.story ?? this.story,
                        bookNumber: this._update?.$set.bookNumber ?? this.bookNumber,
                    })
                    return !isStoryChapterExist
                },
            }
        ]
    },
    name: {
        trim: true,
        type: String,
        minlength: [1, 'Tên chương dùng ít nhất 1 kí tự'],
        maxlength: [50, 'Tên chương dùng tối đa 50 kí tự'],
        required: [true, 'Tên chương là bắt buộc'],
    },
    bookNumber: {
        type: Number,
        required: [true, 'Số quyển là bắt buộc'],
        min: [1, 'Số quyển thấp nhất là 1'],
        validate: [
            {
                message: "Số quyển phải là số nguyên dương",
                validator: Number.isInteger
            },
            // {
            //     message: "Số quyển đã tồn tại",
            //     validator: async function (value) {
            //         const isBookNumberExist = await StoryChapter.exists({
            //             bookNumber: value,
            //             story: this.story
            //         })
            //         return !isBookNumberExist
            //     },
            // }
        ]
    },
    bookName: {
        trim: true,
        type: String,
        minlength: [1, 'Tên quyển dùng ít nhất 1 kí tự'],
        maxlength: [50, 'Tên quyển dùng tối đa 50 kí tự'],
        validate: [
            {
                message: "Trùng số quyển không được tạo mới tên quyển",
                validator: async function (value) {
                    if (!this.story) return true

                    const chapterWithSameBookNumber = await StoryChapter.findOne({
                        story: this.story,
                        bookNumber: this.bookNumber,
                    })

                    if (!chapterWithSameBookNumber) return true

                    return chapterWithSameBookNumber.bookName === value
                },
            }
        ]
    },
    content: {
        type: String,
        required: [true, 'Nội dung chương là bắt buộc'],
    },
    uploader: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: [true, 'Người đăng là bắt buộc'],
    },
    totalLikes: {
        type: Number,
        default: 0,
    }
}, { timestamps: true, versionKey: false })

const StoryChapter = model('story_chapters', storyChapterSchema)

module.exports = StoryChapter;