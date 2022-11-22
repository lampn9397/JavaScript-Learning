const multer = require('multer');
const getSlug = require('speakingurl');
const Story = require('../../models/Story');
const { createResponse } = require('../../utils/helpers');

const storage = multer.diskStorage({
    destination: 'public/images/story_poster/',
    filename: (req, file, cb) => {
        const fileExtensionArray = file.originalname.split('.');

        const slug = getSlug(fileExtensionArray.slice(0, fileExtensionArray.length - 1).join('-'))

        const fileExtension = fileExtensionArray[fileExtensionArray.length - 1]; //lay duoi file

        cb(null, `${req.user._id}-${slug}.${fileExtension}`);
    },
});

module.exports.posterMulter = multer({
    storage,
    limits: {
        files: 1,
        fileSize: 5242880, // 5 MB
    },
    fileFilter: function (req, file, cb) {
        const isImage = file.mimetype.startsWith('image/');

        if (!isImage) {
            return cb(new Error('Tệp không hợp lệ'));
        }

        cb(null, true);
    },
});

module.exports.validateStoryUploader = async (req, res, next) => {
    try {
        const isExist = await Story.exists({
            _id: req.params.id,
            uploader: req.user._id,
        })

        if (!isExist) {
            res.status(400).json(createResponse({
                message: "Truyện không tồn tại"
            }))
            return
        }

        next()
    } catch (error) {
        next(error)
    }
}
