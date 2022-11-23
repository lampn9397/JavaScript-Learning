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
        const filter = {};

        const { name } = req.query;

        let { page = 1, limit = 10 } = req.query

        if (name) {
            const serarator = ' ';

            filter.$text = {
                $search: name
                    .split(serarator)
                    .map((x) => `"${x}"`)
                    .join(serarator),
            };
        }

        if (typeof page === "string") {
            page = (isNaN(+page) || !page) ? 1 : Math.ceil(+page)
        }

        if (typeof limit === "string") {
            limit = (isNaN(+limit) || !limit) ? 10 : Math.ceil(+limit)
        }

        const authorList = await Author.find(filter)
            .skip((page - 1) * limit)
            .limit(limit);

        res.json(createResponse({
            results: authorList
        }))

    } catch (error) {
        next(error)
    }
};


