import multer from 'multer';

const storage = multer.diskStorage({
  destination: 'public/images/user_avatar/',
  filename: (req, file, cb) => {
    const fileExtensionArray = file.originalname.split('.');

    const fileExtension = fileExtensionArray[fileExtensionArray.length - 1];

    cb(null, `${req.user._id}.${fileExtension}`);
  },
});

export const userAvatarMulter = multer({
  storage,
  limits: {
    files: 1,
    fileSize: 5242880, // 5 MB
  },
  fileFilter: function (req, file, cb) {
    const isImage = file.mimetype.startsWith('image/');

    if (!isImage) {
      return cb(new Error('Invalid avatar image!'));
    }

    cb(null, true);
  },
});
