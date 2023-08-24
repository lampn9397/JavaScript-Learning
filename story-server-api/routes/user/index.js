var express = require('express');
const passport = require('passport')

const {
    onRegister,
    onGetUser,
    onLogin,
    onRecoveryPassword,
    onVerifyRecoveryPasswordCode,
    resetPassword,
    updateProfile,
    getUserStoryList,
    getMyFollowStory,
    getMyLikedStory,
} = require('./controllers');
const { userAvatarMulter } = require('./middlewares');
const router = express.Router();

router.get('/',
    passport.authenticate('jwt', { session: false }), // yeu cau bat buoc phai truyen token
    onGetUser,
);

router.post('/register', onRegister);

router.post('/login', onLogin);

router.post('/recovery-password', onRecoveryPassword);

router.post('/verify-recovery-password-code', onVerifyRecoveryPasswordCode);

router.post('/reset-password', resetPassword);

router.get('/story/follow',
    passport.authenticate('jwt', { session: false }),  // session = false : luu tru thong tin o phua client ,true: luu o phia server
    getMyFollowStory,
);

router.get('/story/like',
    passport.authenticate('jwt', { session: false }),
    getMyLikedStory,
);

router.get('/:id/story', getUserStoryList);

router.put('/',
    passport.authenticate('jwt', { session: false }),
    userAvatarMulter.single("avatar"),
    updateProfile,
);

// router.route('/')
//     .put(updateProfile)
//     .get(passport.authenticate('jwt', { session: false }), onGetUser);

module.exports = router;
