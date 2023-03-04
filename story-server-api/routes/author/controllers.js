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

        const stories = await Story.find({ author: req.params.id })
            .populate('uploader', 'name')
            .populate("author")
            .skip((page - 1) * limit)
            .limit(limit);

        res.json(createResponse({
            results: stories
        }))

    } catch (error) {
        next(error)
    }
};
