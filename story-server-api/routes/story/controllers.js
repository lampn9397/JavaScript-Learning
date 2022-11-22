const jwt = require('jsonwebtoken');
const sha256 = require('crypto-js/sha256');
const nodemailer = require("nodemailer");

const User = require("../../models/User");
const { jwtOptions } = require('../../utils/constants');
const { createResponse, getFilePath } = require("../../utils/helpers");
const StoryCategory = require('../../models/StoryCategory');
const StoryGenre = require('../../models/StoryGenre');
const StoryTag = require('../../models/StoryTag');
const Story = require('../../models/Story');
const getSlug = require('speakingurl');
const StoryChapter = require('../../models/StoryChapter');
const { json } = require('express');

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
        let { page = 1, limit = 10 } = req.query

        if (typeof page === "string") {
            page = (isNaN(+page) || !page) ? 1 : Math.ceil(+page)
        }

        if (typeof limit === "string") {
            limit = (isNaN(+limit) || !limit) ? 10 : Math.ceil(+limit)
        }

        const story = await Story.find({}).populate('uploader', 'name').skip((page - 1) * limit).limit(limit)

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
            story.author = req.body.author
        }

        if (req.file) {
            story.poster = getFilePath(req.file)
        }

        await Story.create(story)

        res.json(createResponse())

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

module.exports.onGetChapterList = async (req, res, next) => {
    try {
        let { page = 1, limit = 10 } = req.query

        if (typeof page === "string") {
            page = (isNaN(+page) || !page) ? 1 : Math.ceil(+page)
        }

        if (typeof limit === "string") {
            limit = (isNaN(+limit) || !limit) ? 10 : Math.ceil(+limit)
        }

        const chapterList = await StoryChapter.find({ story: req.params.id }, '-content').skip((page - 1) * limit).limit(limit)

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
