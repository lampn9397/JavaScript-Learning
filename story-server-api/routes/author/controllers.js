const jwt = require('jsonwebtoken');
const moment = require('moment');
const sha256 = require('crypto-js/sha256');
const Fuse = require('fuse.js')

const Author = require('../../models/Author');
const { createResponse } = require('../../utils/helpers');


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
        const authorList = await Author.find({
            $text: { $search: req.query.name }
        })

        res.json(createResponse({
            results: authorList
        }))

    } catch (error) {
        next(error)
    }
};


