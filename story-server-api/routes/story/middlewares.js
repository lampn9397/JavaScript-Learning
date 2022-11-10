const multer = require('multer');
var getSlug = require('speakingurl');

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
            return cb(new Error('error.invalid_avatar_image'));
        }

        cb(null, true);
    },
});
