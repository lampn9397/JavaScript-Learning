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
        await StoryCategory.create(req.body)

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
        await StoryGenre.create(req.body)

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
        await StoryTag.create(req.body)

        res.json(createResponse())

    } catch (error) {
        next(error)
    }
};
module.exports.onGetStory = async (req, res, next) => {
    try {
        let { page = 1, limit = 10 } = req.query

        if (typeof page === "string") {
            page = isNaN(+page) ? 1 : Math.ceil(+page)
        }

        if (typeof limit === "string") {
            limit = isNaN(+limit) ? 10 : Math.ceil(+limit)
        }

        const story = await Story.find({}).skip((page - 1) * limit).limit(limit)

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
