const jwt = require('jsonwebtoken');
const moment = require('moment');
const sha256 = require('crypto-js/sha256');
const Fuse = require('fuse.js')

const Author = require('../../models/Author');
const { createResponse, getPaginationConfig } = require('../../utils/helpers');
const Story = require('../../models/Story');


module.exports.onCreateAuthor = async (req, res, next) => {
    try {
        await Author.create({
            name: req.body.name,
            birthday: moment.utc(req.body.birthday, "MM/DD/YYYY").toDate(),
            description: req.body.description,
        })

        res.json(createResponse({
        }))

    } catch (error) {
        next(error)
    }
};

module.exports.onGetAuthorList = async (req, res, next) => {
    try {
        const filter = {};

        const { name } = req.query;

        if (name) {
            const serarator = ' ';

            filter.$text = {
                $search: name
                    .split(serarator)
                    .map((x) => `"${x}"`)
                    .join(serarator),
            };
        }

        let authorList = []

        if (name) {
            authorList = await Author.find(filter)
        } else {
            const { page, limit } = getPaginationConfig(req, 1, 10)

            authorList = await Author.find(filter)
                .skip((page - 1) * limit)
                .limit(limit);
        }

        res.json(createResponse({
            results: authorList
        }))

    } catch (error) {
        next(error)
    }
};

module.exports.onGetMyStoryAuthors = async (req, res, next) => {
    try {
        const { page, limit } = getPaginationConfig(req, 1, 10)

        const myStories = await Story.find({
            uploader: req.user._id
        })
            .populate("author")
            .skip((page - 1) * limit)
            .limit(limit)

        const authors = myStories.reduce((authorList, story) => {
            const isExist = authorList.some((item) => item._id === story.author._id)

            if (!isExist) authorList.push(story.author)

            return authorList
        }, [])

        res.json(createResponse({
            results: authors
        }))

    } catch (error) {
        next(error)
    }
};

module.exports.onGetAuthorDetail = async (req, res, next) => {
    try {
        const authorDetail = await Author.findById(req.params.id)

        res.json(createResponse({
            results: authorDetail
        }))

    } catch (error) {
        next(error)
    }
};

module.exports.onGetStoryByAuthor = async (req, res, next) => {
    try {
        const { page, limit } = getPaginationConfig(req, 1, 10)

        const query = { author: req.params.id }

        const sort = {}

        if (req.query.excludeStory) {
            query.slug = { $ne: req.query.excludeStory } //$ne: not equal, Exclude One Specific Document
        }

        if (req.query.sort && req.query.sort === 'totalViews') {
            sort.totalViews = -1 //1:ascending -1:descending
        }

        const stories = await Story.find(query)
            .sort(sort)
            .populate('uploader', 'name')
            .populate("author")
            .skip((page - 1) * limit)
            .limit(limit)
            .lean({ getters: true })

        res.json(createResponse({
            results: stories
        }))

    } catch (error) {
        next(error)
    }
};

