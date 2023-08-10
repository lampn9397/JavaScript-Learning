const jwt = require('jsonwebtoken');
const sha256 = require('crypto-js/sha256');
const nodemailer = require("nodemailer");

const User = require("../../models/User");
const { jwtOptions } = require('../../utils/constants');
const { createResponse, getFilePath, getPaginationConfig } = require("../../utils/helpers");
const Story = require('../../models/Story');
const StoryFollow = require('../../models/StoryFollow');
const StoryLike = require('../../models/StoryLike');

module.exports.onRegister = async (req, res, next) => {
    try {
        const isExist = await User.exists({
            $or: [
                { username: req.body.username, },
                { email: req.body.email, },
            ]
        });

        if (isExist) {
            return res.status(400).json(createResponse({
                ok: false,
                message: "Username hoặc email đã tồn tại",
            }));
        }

        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            name: req.body.name,
            gender: req.body.gender,
        });

        user.password = undefined; //json chi nhan null

        const payload = { id: user._id };

        const token = jwt.sign(payload, jwtOptions.secretOrKey);

        res.json(createResponse({
            results: token,
        }));
    } catch (error) {
        next(error);
    }
};

module.exports.onGetUser = async (req, res, next) => {

    res.json(createResponse({
        results: req.user
    }))
}

module.exports.onLogin = async (req, res, next) => {

    try {
        const user = await User.findOne({
            $or: [{ username: req.body.username }, { email: req.body.username }],
            password: sha256(req.body.password).toString(),
        })

        if (!user) {
            res.status(400).json(createResponse({
                message: "Sai tên tài khoản hoặc mật khẩu",
            })) //400:bad request
            return
        }

        const payload = { id: user._id };

        const token = jwt.sign(payload, jwtOptions.secretOrKey);

        res.json(createResponse({
            results: token,
        }))

    } catch (error) {
        next(error)
    }
}

module.exports.onRecoveryPassword = async (req, res, next) => {

    try {

        const user = await User.findOne({
            email: req.body.email,
        })

        if (!user) {
            res.status(400).json(createResponse({
                message: "Tài khoản không tồn tại",
            })) //400:bad request
            return
        }

        const code = jwt.sign({
            id: user._id,
            type: "RECOVERY-PASSWORD",
        }, jwtOptions.secretOrKey, {
            expiresIn: "15m" //15phut
        })

        user.recoveryPasswordCode = code;

        user.save()

        const resetPasswordLink = `http://localhost:3000/reset-password?code=${code}`

        const serverAccount = {
            email: "lampndev@gmail.com",
            password: "ynlrfkrjkrxymtdt",
        }

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            service: 'gmail',
            secure: false, // true for 465, false for other ports
            auth: {
                user: serverAccount.email, // generated ethereal user
                pass: serverAccount.password, // generated ethereal password
            },
        });

        let info = await transporter.sendMail({
            from: `New Story App <${serverAccount.email}>`, // sender address
            to: user.email, // list of receivers
            subject: "New Story App - Recovery Password", // Subject line
            text: "Vui lòng Click vào đường dẫn bên dưới để lấy lại mật khẩu", // plain text body
            html: `
            <p> Vui lòng Click vào đường dẫn bên dưới để lấy lại mật khẩu </p>
            <a href="${resetPasswordLink}" target="_blank">
            ${resetPasswordLink}
            </a>`, // html body
        });

        res.json(createResponse({
            message: "Vui lòng kiểm tra email để thay đổi mật khẩu",
        }))

        console.log(info)

    } catch (error) {
        next(error)
    }
}

module.exports.onVerifyRecoveryPasswordCode = async (req, res, next) => {

    try {

        const isExist = await User.exists({
            recoveryPasswordCode: req.body.code,
        })

        if (!isExist) {
            res.status(400).json(createResponse({
                message: "Mã xác thực không hợp lệ",
            })) //400:bad request
            return
        }

        res.json(createResponse({
            message: "Mã xác thực hợp lệ"
        }))

    } catch (error) {
        next(error)
    }

}

module.exports.resetPassword = async (req, res, next) => {

    try {

        if (!req.body.password || !req.body.confirmPassword) {
            res.status(400).json(createResponse({
                message: "Vui lòng điền mật khẩu",
            })) //400:bad request
            return
        }

        const isPasswordMatched = req.body.password === req.body.confirmPassword

        if (!isPasswordMatched) {
            res.status(400).json(createResponse({
                message: "Mật khẩu không trùng khớp với nhau",
            })) //400:bad request
            return
        }

        const user = await User.findOne({
            recoveryPasswordCode: req.body.code,
        })

        if (!user) {
            res.status(400).json(createResponse({
                message: "Mã xác thực không hợp lệ",
            })) //400:bad request
            return
        }

        user.password = req.body.password

        user.recoveryPasswordCode = ""

        await user.save()

        res.json(createResponse({
            message: "Mật khẩu đã thay đổi thành công"
        }))

    } catch (error) {
        next(error)
    }
}

module.exports.updateProfile = async (req, res, next) => {
    try {

        const user = await User.findById(req.user._id)

        // if (req.body.currentPassword === "" || req.body.newPassword === "") {
        //     res.status(400).json(createResponse({
        //         message: "Mật khẩu tối thiểu phải 6 kí tự",
        //     }))
        //     return
        // }

        if (req.body.currentPassword && req.body.newPassword) {
            const currentPassword = sha256(req.body.currentPassword).toString()

            const isCurrentPasswordMatched = user.password === currentPassword

            if (!isCurrentPasswordMatched) {
                res.status(400).json(createResponse({
                    message: "Mật khẩu hiện tại không chính xác",
                })) //400:bad request
                return
            }

            user.password = req.body.newPassword
        }

        if (req.body.name) {
            user.name = req.body.name
        }

        if (req.body.gender) {
            user.gender = req.body.gender
        }

        if (req.file) {
            user.avatar = getFilePath(req.file)
        }

        await user.save({ validateBeforeSave: true })

        res.json(createResponse({
            message: "Tài khoản thay đổi thành công",
        }))
        return

    } catch (error) {
        next(error)
    }
}

module.exports.getUserStoryList = async (req, res, next) => {
    const { page, limit } = getPaginationConfig(req, 1, 99999999)

    try {
        const totalStoryQuery = Story.find({
            uploader: req.params.id
        })

        const userStoryListQuery = Story.find({
            uploader: req.params.id
        })
            .populate("uploader", "name")
            .skip((page - 1) * limit)
            .limit(limit)

        const [totalStory, userStoryList] = await Promise.all([totalStoryQuery, userStoryListQuery])

        const totalChapters = userStoryList.reduce((total, item) => total + item.totalChapter, 0)

        res.json(createResponse({
            results: {
                totalStory: totalStory.length,
                totalChapters,
                stories: userStoryList,
            },
        }))
        return

    } catch (error) {
        next(error)
    }
}

module.exports.getMyFollowStory = async (req, res, next) => {
    try {
        const myFollowStory = await StoryFollow.find({
            user: req.user._id,
        }).populate("story")

        res.json(createResponse({
            results: myFollowStory,
        }))
        return

    } catch (error) {
        next(error)
    }
}

module.exports.getMyLikedStory = async (req, res, next) => {
    try {
        const myLikedStory = await StoryLike.find({
            user: req.user._id,
        }).populate("story")

        res.json(createResponse({
            results: myLikedStory,
        }))
        return

    } catch (error) {
        next(error)
    }
}
