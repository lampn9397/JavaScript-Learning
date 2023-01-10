const jwt = require('jsonwebtoken');
const sha256 = require('crypto-js/sha256');
const nodemailer = require("nodemailer");
const mongoose = require('mongoose')

const User = require("../../models/User");
const { jwtOptions } = require('../../utils/constants');
const { createResponse, getFilePath, getPaginationConfig } = require("../../utils/helpers");
const StoryCategory = require('../../models/StoryCategory');
const StoryGenre = require('../../models/StoryGenre');
const StoryTag = require('../../models/StoryTag');
const Story = require('../../models/Story');
const getSlug = require('speakingurl');
const StoryChapter = require('../../models/StoryChapter');
const { json } = require('express');
const Author = require('../../models/Author');
const StoryFollow = require('../../models/StoryFollow');
const StoryLike = require('../../models/StoryLike');
const StoryRating = require('../../models/StoryRating');
const StoryComment = require('../../models/StoryComment');

const requestedIPs = {}

module.exports.onGetCategory = async (req, res, next) => {
    try {
        const storyCategories = await StoryCategory.find({})

        res.json(createResponse({
            results: storyCategories
        }))

    } catch (error) {
        next(error)
    }
};

module.exports.onCreateCategory = async (req, res, next) => {
    try {
        await StoryCategory.create({
            name: req.body.name,
            slug: getSlug(req.body.name)
        })

        res.json(createResponse())

    } catch (error) {
        next(error)
    }
};
module.exports.onGetGenre = async (req, res, next) => {
    try {
        const storyGenre = await StoryGenre.find({})

        res.json(createResponse({
            results: storyGenre
        }))

    } catch (error) {
        next(error)
    }
};

module.exports.onCreateGenre = async (req, res, next) => {
    try {
        await StoryGenre.create({
            name: req.body.name,
            slug: getSlug(req.body.name),
        })

        res.json(createResponse())

    } catch (error) {
        next(error)
    }
};

module.exports.onGetTag = async (req, res, next) => {
    try {
        const storyTag = await StoryTag.find({})

        res.json(createResponse({
            results: storyTag
        }))

    } catch (error) {
        next(error)
    }
};

module.exports.onCreateTag = async (req, res, next) => {
    try {
        await StoryTag.create({
            name: req.body.name,
            slug: getSlug(req.body.name)
        })

        res.json(createResponse())

    } catch (error) {
        next(error)
    }
};

module.exports.onGetStory = async (req, res, next) => {
    try {
        const { page, limit } = getPaginationConfig(req, 1, 10)

        const story = await Story.find({})
            .populate('uploader', 'name')
            .populate("author")
            .skip((page - 1) * limit)
            .limit(limit)

        res.json(createResponse({
            results: story
        }))

    } catch (error) {
        next(error)
    }
};

module.exports.onCreateStory = async (req, res, next) => {
    try {
        const story = {
            name: req.body.name,
            genre: req.body.genre,
            category: req.body.category,
            // tags: req.body.tags,
            uploader: req.user._id,
            description: req.body.description,
            isPublish: true,
        }
        if (req.body.tags instanceof Array) {
            story.tags = [...new Set(req.body.tags)]
        }

        if (req.body.author) {
            if (mongoose.isObjectIdOrHexString(req.body.author)) {
                story.author = req.body.author
            } else {
                const author = await Author.create({ name: req.body.author })

                story.author = author._id
            }

        }

        if (req.file) {
            story.poster = getFilePath(req.file)
        }

        await Story.create(story)

        await StoryCategory.updateOne({
            _id: story.category
        }, { $inc: { storyCount: 1 } })

        res.json(createResponse())

    } catch (error) {
        next(error)
    }
};

module.exports.onUpdateStory = async (req, res, next) => {
    try {
        const story = {}

        if (req.body.tags instanceof Array) {
            story.tags = [...new Set(req.body.tags)]
        }

        if (req.body.category) {
            story.category = req.body.category
        }

        if (req.body.description) {
            story.description = req.body.description
        }

        if (req.body.author) {
            if (mongoose.isObjectIdOrHexString(req.body.author)) {
                story.author = req.body.author
            } else {
                const author = await Author.create({ name: req.body.author })

                story.author = author._id
            }

        }

        if (req.file) {
            story.poster = getFilePath(req.file)
        }

        const oldStory = await Story.findByIdAndUpdate(req.params.id, story)

        if (story.category && story.category !== oldStory.category) {
            const incStoryCategory = StoryCategory.updateOne({
                _id: story.category
            }, { $inc: { storyCount: 1 } })

            const decStoryCategory = StoryCategory.updateOne({
                _id: oldStory.category
            }, { $inc: { storyCount: -1 } })

            await Promise.all([incStoryCategory, decStoryCategory])
        }

        res.json(createResponse({
            message: "Truyện đã cập nhật thành công"
        }))

    } catch (error) {
        next(error)
    }
};

module.exports.onCreateChapter = async (req, res, next) => {
    try {
        const storyChapter = {
            story: req.params.id,
            numberOrder: req.body.numberOrder,
            chapterNumber: req.body.chapterNumber,
            name: req.body.name,
            bookNumber: req.body.bookNumber,
            bookName: req.body.bookName,
            content: req.body.content,
            uploader: req.user._id,
        }

        await StoryChapter.create(storyChapter)

        res.json(createResponse())

    } catch (error) {
        next(error)
    }
};

module.exports.onUpdateChapter = async (req, res, next) => {
    try {
        const storyChapter = {}

        if (req.body.numberOrder) {
            storyChapter.numberOrder = req.body.numberOrder
        }

        if (req.body.chapterNumber) {
            storyChapter.chapterNumber = req.body.chapterNumber
        }

        if (req.body.name) {
            storyChapter.name = req.body.name
        }

        if (req.body.bookNumber) {
            storyChapter.bookNumber = req.body.bookNumber
        }

        if (req.body.bookName) {
            storyChapter.bookName = req.body.bookName
        }

        if (req.body.content) {
            storyChapter.content = req.body.content
        }

        await StoryChapter.findOneAndUpdate({
            story: req.params.id,
            _id: req.params.chapterId,
        },
            storyChapter,
            { runValidators: true }
        )
        res.json(createResponse({
            message: "Chương truyện đã cập nhật thành công"
        }))

    } catch (error) {
        next(error)
    }
};
module.exports.onDeleteChapter = async (req, res, next) => {
    try {
        await StoryChapter.deleteOne({
            story: req.params.id,
            _id: req.params.chapterId
        })

        res.json(createResponse({
            message: "Chương truyện đã xóa thành công"
        }))

    } catch (error) {
        next(error)
    }
};

module.exports.onGetChapterList = async (req, res, next) => {
    try {
        const { page, limit } = getPaginationConfig(req, 1, 10)

        const chapterList = await StoryChapter.find({ story: req.params.id }, '-content')
            .skip((page - 1) * limit)
            .limit(limit);

        res.json(createResponse({
            results: chapterList,
        }))

    } catch (error) {
        next(error)
    }
};

module.exports.onGetChapterDetail = async (req, res, next) => {
    try {
        const chapterDetail = await StoryChapter.findOne({
            story: req.params.id,
            _id: req.params.chapterId,
        }).populate("uploader", "name")

        const isTimeValid = (Date.now() - requestedIPs[req.ip]) >= 180000 //thoi gian giua cac lan request  lon hon hoac = 3 phut

        if (!requestedIPs[req.ip] || isTimeValid) {
            requestedIPs[req.ip] = Date.now()

            await Story.updateOne({
                _id: req.params.id
            }, {
                $inc: { totalViews: 1 }
            })
        }

        if (!chapterDetail) {
            res.status(404).json(createResponse({
                message: "Id không hợp lệ",
            }));
            return
        }

        res.json(createResponse({
            results: chapterDetail,
        }))

    } catch (error) {
        next(error)
    }
};

module.exports.onGetTotalChapterPages = async (req, res, next) => {
    try {
        let { limit = 10 } = req.query

        if (typeof limit === "string") {
            limit = (isNaN(+limit) || !limit) ? 10 : Math.ceil(+limit)
        }

        const totalChapters = await StoryChapter.countDocuments({
            story: req.params.id,
        })

        const totalPages = Math.ceil(totalChapters / limit)

        res.json(createResponse({
            results: totalPages,
        }))

    } catch (error) {
        next(error)
    }
};

module.exports.onGetStoryDetail = async (req, res, next) => {
    try {
        //cach 1
        // const storyDetail = await Story.findById(req.params.id).populate([{
        //     path: "genre",
        // }, {
        //     path: "category",
        // }, {
        //     path: "tags",
        // }, {
        //     path: "uploader",
        //     select: "name",
        // }])

        //cach 2
        const storyDetail = await Story.findById(req.params.id)
            .populate("genre")
            .populate("category")
            .populate("tags")
            .populate("uploader", "name")
            .populate("author")

        if (!storyDetail) {
            res.status(404).json(createResponse({
                message: "Id không hợp lệ",
            }));
            return
        }

        res.json(createResponse({
            results: storyDetail,
        }))

    } catch (error) {
        next(error)
    }
};

module.exports.onFollowStory = async (req, res, next) => {
    try {
        const storyFollowModel = {
            user: req.user._id,
            story: req.params.id,
        }

        const isStoryFollowed = await StoryFollow.exists(storyFollowModel)

        if (!isStoryFollowed) {
            const followPromise = StoryFollow.create(storyFollowModel)

            const updatePromise = Story.updateOne({
                _id: req.params.id
            }, { $inc: { totalFollows: 1 } })

            await Promise.all([followPromise, updatePromise])
        }

        res.json(createResponse({
            message: "Truyện đã được theo dõi",
        }))

    } catch (error) {
        next(error)
    }
}

module.exports.onUnfollowStory = async (req, res, next) => {
    try {
        const storyFollowModel = {
            user: req.user._id,
            story: req.params.id,
        }

        const isStoryFollowed = await StoryFollow.exists(storyFollowModel)

        if (!isStoryFollowed) {
            res.status(400).json(createResponse({
                message: "Truyện chưa được theo dõi",
            }));
            return
        }

        const unfollowPromise = StoryFollow.deleteOne(storyFollowModel)

        const updatePromise = Story.updateOne({
            _id: req.params.id
        }, { $inc: { totalFollows: -1 } })

        await Promise.all([unfollowPromise, updatePromise])

        res.json(createResponse({
            message: "Truyện đã hủy theo dõi",
        }));

    } catch (error) {
        next(error)
    }
}

module.exports.onLikeStory = async (req, res, next) => {
    try {
        const storyLikeModel = {
            user: req.user._id,
            story: req.params.id,
        }

        const isStoryLike = await StoryLike.exists(storyLikeModel)

        if (!isStoryLike) {
            const createPromise = StoryLike.create(storyLikeModel)

            const updatePromise = Story.updateOne({
                _id: req.params.id
            }, { $inc: { totalLikes: 1 } }) //$inc: tang gia tri totallike

            await Promise.all([createPromise, updatePromise])
        } else {
            const deletePromise = StoryLike.deleteOne(storyLikeModel)

            const updatePromise = Story.updateOne({
                _id: req.params.id
            }, { $inc: { totalLikes: -1 } })

            await Promise.all([deletePromise, updatePromise])
        }

        res.json(createResponse())

    } catch (error) {
        next(error)
    }
}
module.exports.onRatingStory = async (req, res, next) => {
    try {
        const storyRatingFilter = {
            user: req.user._id,
            story: req.params.id,
        }

        const storyRatingModel = {
            user: req.user._id,
            story: req.params.id,
            feedback: req.body.feedback,
            rating: req.body.rating,
        }

        const updateRatingModel = {
            feedback: req.body.feedback,
            rating: req.body.rating,
        }

        const isStoryRatingExist = await StoryRating.exists(storyRatingFilter)

        if (!isStoryRatingExist) {
            await StoryRating.create(storyRatingModel)

            await Story.updateOne({
                _id: req.params.id
            }, { $inc: { totalRatings: 1 } }) //$inc: tang gia tri totallike
        } else {
            await StoryRating.updateOne(storyRatingFilter, updateRatingModel, { runValidators: true })
        }

        res.json(createResponse())

    } catch (error) {
        next(error)
    }
}
module.exports.onCommentStory = async (req, res, next) => {
    try {
        const storyCommentFilter = {
            user: req.user._id,
            story: req.params.id,
        }

        const storyCommentModel = {
            user: req.user._id,
            story: req.params.id,
            content: req.body.content,
        }

        const updateCommentModel = {
            content: req.body.content,
        }

        const isStoryContentExist = await StoryComment.exists(storyCommentFilter)

        let storyComment = null;

        if (!isStoryContentExist) {
            storyComment = await StoryComment.create(storyCommentModel)
        } else {
            storyComment = await StoryComment.updateOne(storyCommentFilter, updateCommentModel, { runValidators: true, new: true })
        }

        res.json(createResponse({
            results: storyComment
        }))

    } catch (error) {
        next(error)
    }
}
