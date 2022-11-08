const jwt = require('jsonwebtoken');
const sha256 = require('crypto-js/sha256');
const nodemailer = require("nodemailer");

const User = require("../../models/User");
const { jwtOptions } = require('../../utils/constants');
const { createResponse } = require("../../utils/helpers");
const StoryCategory = require('../../models/StoryCategory');

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
