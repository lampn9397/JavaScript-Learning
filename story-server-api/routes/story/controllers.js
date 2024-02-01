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

        const sort = {}

        const filter = {}

        if (req.query.sort && req.query.sort === 'totalViews') {
            sort.totalViews = -1 //1:ascending -1:descending
        }

        if (req.query.sort && req.query.sort === 'storyUpdateAt') {
            sort.storyUpdateAt = -1 //1:ascending -1:descending
        }

        if (req.query.status === 'COMPLETED') {
            filter.status = 'COMPLETED'
            sort.storyUpdateAt = -1 //1:ascending -1:descending
        }

        if (req.query.category) {
            if (mongoose.isObjectIdOrHexString(req.query.category)) {
                filter.category = req.query.category
            } else {
                const category = await StoryCategory.findOne({ slug: req.query.category })

                filter.category = category._id
            }
        }

        const story = await Story.find(filter)
            .sort(sort)
            .populate('uploader', 'name')
            .populate("author")
            .populate("category")
            .skip((page - 1) * limit)
            .limit(limit)
            .lean({ getters: true })

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
            slug: getSlug(`${req.body.name}-${Date.now()}`)
        }

        if (req.body.tags instanceof Array) {
            story.tags = [...new Set(req.body.tags)]
        }

        if (req.file) {
            story.poster = getFilePath(req.file)
        }

        await Story.validate(story, ["name", "genre", "category", "tags", "description", "isPublish", "slug", "uploader"])

        if (req.body.author) {
            if (mongoose.isObjectIdOrHexString(req.body.author)) {
                story.author = req.body.author
            } else {
                const author = await Author.create({ name: req.body.author })

                story.author = author._id
            }

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

        if (req.body.status) {
            story.status = req.body.status

            if (req.body.status === "COMPLETED") {
                story.storyUpdateAt = Date.now()
            }
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

        await Story.updateOne(
            { _id: req.params.id },
            {
                storyUpdateAt: Date.now(),
                $inc: {
                    totalChapter: 1
                }
            }
        )

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

        const chapter = await StoryChapter.findOneAndUpdate({
            story: req.params.id,
            _id: req.params.chapterId,
        },
            storyChapter,
            { runValidators: true }
        )

        if (req.body.bookName && chapter) {
            await StoryChapter.updateMany({
                story: req.params.id,
                bookNumber: chapter.bookNumber,
            }, {
                bookName: req.body.bookName
            })
        }

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

        await Story.updateOne(
            { _id: req.params.id },
            {
                $inc: {
                    totalChapter: -1
                }
            }
        )

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

        const sort = {}

        let query

        const { sortType = 1, sort: sortQuery } = req.query; //1:ascending -1:descending

        if (sortQuery === 'createdAt') {
            sort.createdAt = sortType
        }

        if (sortQuery === 'bookNumber') {
            sort.bookNumber = sortType
            sort.createdAt = 1
        }

        if (sortQuery === "chapterNumber") {
            sort.bookNumber = 1
            sort.chapterNumber = sortType
        }

        if (sortQuery === "numberOrder") {
            sort.numberOrder = sortType
        }

        if (mongoose.isObjectIdOrHexString(req.params.id)) {
            query = StoryChapter.find({ story: req.params.id }, '-content');
        } else {
            const story = await Story.findOne({ slug: req.params.id })

            query = StoryChapter.find({ story: story._id }, '-content')
        }

        const chapterList = await query
            .sort(sort)
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
        let story

        const updatedTotalViewsFilter = {}

        if (mongoose.isObjectIdOrHexString(req.params.id)) {
            story = await Story.findById(req.params.id);

            updatedTotalViewsFilter._id = req.params.id
        } else {
            story = await Story.findOne({ slug: req.params.id })

            updatedTotalViewsFilter.slug = req.params.id
        }

        if (!story) {
            return res.status(404).json(createResponse({
                message: "Truyện không tồn tại",
            }));

        }

        const chapterDetail = await StoryChapter.findOne({
            story: story._id,
            numberOrder: req.params.numberOrder,

        }).populate("uploader", "name").populate("story", "name")

        const isTimeValid = (Date.now() - requestedIPs[req.ip]) >= 180000 //thoi gian giua cac lan request  lon hon hoac = 3 phut

        if (!requestedIPs[req.ip] || isTimeValid) {
            requestedIPs[req.ip] = Date.now()

            await Story.updateOne(updatedTotalViewsFilter, {
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

        let query

        //id co the truyen la stor id hoac story slug

        if (mongoose.isObjectIdOrHexString(req.params.id)) {
            query = Story.findById(req.params.id);
        } else {
            query = Story.findOne({ slug: req.params.id })
        }

        const storyDetail = await query
            .populate("genre")
            .populate("category")
            .populate("tags")
            .populate("uploader", "name")
            .populate("author")
            .lean({ getters: true })

        if (!storyDetail) {
            res.status(404).json(createResponse({
                message: "Id hoặc slug không hợp lệ không hợp lệ",
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
        } else {
            const deletePromise = StoryFollow.deleteOne(storyFollowModel)

            const updatePromise = Story.updateOne({
                _id: req.params.id
            }, { $inc: { totalFollows: -1 } })

            await Promise.all([deletePromise, updatePromise])
        }

        res.json(createResponse({
            message: "Truyện đã được theo dõi",
            results: {
                isStoryFollowed: !isStoryFollowed
            }
        }))

    } catch (error) {
        next(error)
    }
}
module.exports.onCheckStoryFollow = async (req, res, next) => {
    try {
        const storyFollowModel = {
            user: req.user._id,
            story: req.params.id,
        }

        const isStoryFollowed = await StoryFollow.exists(storyFollowModel)

        res.json(createResponse({
            message: "Truyện đã được theo dõi",
            results: {
                isStoryFollowed: !!isStoryFollowed
            }
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

        const isStoryLiked = await StoryLike.exists(storyLikeModel)

        if (!isStoryLiked) {
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

        res.json(createResponse({
            results: {
                isStoryLiked: !isStoryLiked
            }
        }))

    } catch (error) {
        next(error)
    }
}

module.exports.onCheckStoryLike = async (req, res, next) => {
    try {
        const storyLikeModel = {
            user: req.user._id,
            story: req.params.id,
        }

        const isStoryLiked = await StoryLike.exists(storyLikeModel)

        res.json(createResponse({
            results: {
                //!! convert boolean , ! gia tri nguoc
                isStoryLiked: !!isStoryLiked
            }
        }))

    } catch (error) {
        next(error)
    }
}

module.exports.onRatingStory = async (req, res, next) => {
    try {
        let storyRating = null

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

        const userStoryRating = await StoryRating.findOne(storyRatingFilter)

        if (!userStoryRating) {

            storyRating = await (await StoryRating.create(storyRatingModel))
                .populate("user", "avatar name gender")

            await Story.updateOne({
                _id: req.params.id
            }, {
                $inc: {
                    totalRatings: 1,
                    totalRatingPoints: req.body.rating,
                }
            }) //$inc: tang gia tri totallike
        } else {
            storyRating = await StoryRating.findOneAndUpdate(
                storyRatingFilter,
                updateRatingModel,
                { runValidators: true, new: true }, //new:true gia tri sau update
            ).populate("user", "avatar name gender")

            await Story.updateOne({
                _id: req.params.id
            }, {
                $inc: {
                    totalRatingPoints: req.body.rating - userStoryRating.rating, //rating moi tru rating cu
                }
            }) //$inc: tang gia tri totallike
        }

        res.json(createResponse({
            results: storyRating,
        }))

    } catch (error) {
        next(error)
    }
}

module.exports.onGetRating = async (req, res, next) => {
    try {
        const { page, limit } = getPaginationConfig(req, 1, 10)

        const sort = {
            createdAt: -1
        }

        const listRating = await StoryRating.find({
            story: req.params.id,
        })
            .sort(sort)
            .populate("user", "avatar name gender")
            .skip((page - 1) * limit)
            .limit(limit)
            .lean({ getters: true })

        res.json(createResponse({
            results: listRating
        }))

    } catch (error) {
        next(error)
    }
}

module.exports.onLikeRating = async (req, res, next) => {
    try {
        const storyRating = await StoryRating.findOneAndUpdate({ _id: req.params.ratingId }, [{
            $set: {
                likedUsers: {
                    $cond: [
                        { $in: [req.user._id, "$likedUsers"] }, //condition
                        {  //if
                            $filter: {
                                input: "$likedUsers",
                                cond: { $ne: ["$$this", req.user._id] } //$$this = $likedUsers
                            }
                        },
                        { $concatArrays: ["$likedUsers", [req.user._id]] } //else
                    ]
                }
            }
        }], { new: true }).populate("user", "avatar name gender")

        res.json(createResponse({
            results: storyRating
        }))

    } catch (error) {
        next(error)
    }
}

module.exports.onCommentStory = async (req, res, next) => {
    try {
        let storyComment = null;

        if (req.query.commentId) {
            //update Comment
            const storyCommentFilter = {
                user: req.user._id,
                story: req.params.id,
                _id: req.query.commentId,
            }

            const updateCommentModel = {
                content: req.body.content,
            }

            const isStoryContentExist = await StoryComment.exists(storyCommentFilter)

            if (!isStoryContentExist) return res.status(404).json(createResponse({
                message: "Bình luận không tồn tại"
            }))

            storyComment = await StoryComment
                .findOneAndUpdate(storyCommentFilter, updateCommentModel, { runValidators: true, new: true })
                .populate("user", "avatar name gender")
                .populate({
                    path: 'childComments',
                    populate: [
                        {
                            path: 'user',
                            select: 'avatar name gender',
                        },
                    ],
                })
        } else {
            //create comment
            const storyCommentModel = {
                user: req.user._id,
                story: req.params.id,
                content: req.body.content,
                parentComment: req.query.parentCommentId, //neu truyen parentCommentId thi dang tao reply
            }

            storyComment = await (await StoryComment
                .create(storyCommentModel))
                .populate("user", "avatar name gender")

            if (req.query.parentCommentId) {
                await StoryComment.updateOne({ _id: req.query.parentCommentId }, {
                    $push: { childComments: storyComment._id }
                })
            }
        }

        res.json(createResponse({
            results: storyComment
        }))

    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports.onGetStoryComment = async (req, res, next) => {
    try {
        const { page, limit } = getPaginationConfig(req, 1, 10)

        const sort = {
            createdAt: -1
        }

        const listComment = await StoryComment.find({
            story: req.params.id,
            parentComment: { $exists: false }
        })
            .sort(sort)
            .populate("user", "avatar name gender")
            .populate({
                path: 'childComments',
                populate: [
                    {
                        path: 'user',
                        select: 'avatar name gender',
                    },
                ],
            })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean({ getters: true })

        res.json(createResponse({
            results: listComment
        }))

    } catch (error) {
        next(error)
    }
}

module.exports.onLikeComment = async (req, res, next) => {
    try {
        const storyComment = await StoryComment.findOneAndUpdate({ _id: req.params.commentId }, [{
            $set: {
                likedUsers: {
                    $cond: [
                        { $in: [req.user._id, "$likedUsers"] }, //condition
                        {  //if
                            $filter: {
                                input: "$likedUsers",
                                cond: { $ne: ["$$this", req.user._id] } //$$this = $likedUsers
                            }
                        },
                        { $concatArrays: ["$likedUsers", [req.user._id]] } //else
                    ]
                }
            }
        }], { new: true })
            .populate("user", "avatar name gender")
            .populate({
                path: 'childComments',
                populate: [
                    {
                        path: 'user',
                        select: 'avatar name gender',
                    },
                ],
            })

        res.json(createResponse({
            results: storyComment
        }))

    } catch (error) {
        next(error)
    }
}
