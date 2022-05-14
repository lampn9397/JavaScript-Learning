import multer from 'multer';

const storage = multer.diskStorage({
  destination: 'public/images/user_avatar/',
  filename: (req, file, cb) => {
    console.log('filename > ', filename);

    const fileExtensionArray = file.originalname.split('.');

    const fileExtension = fileExtensionArray[fileExtensionArray.length - 1];

    console.log('req.user._id > ', req.user._id);
    console.log('fileExtension > ', fileExtension);

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
    console.log('file > ', file);

    const isImage = file.mimetype.startsWith('image/');

    if (!isImage) {
      return cb(new Error('error.invalid_avatar_image'));
    }

    cb(null, true);
  },
});
