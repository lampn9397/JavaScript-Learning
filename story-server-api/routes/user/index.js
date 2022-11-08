var express = require('express');
const passport = require('passport')

const {
    onRegister,
    onGetUser,
    onLogin,
    onRecoveryPassword,
    onVerifyRecoveryPasswordCode,
    resetPassword,
    updateProfile
} = require('./controllers');
const { userAvatarMulter } = require('./middlewares');
const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), onGetUser) //yeu cau bat buoc phai truyen token

router.post('/register', onRegister);

router.post('/login', onLogin);

router.post('/recovery-password', onRecoveryPassword);

router.post('/verify-recovery-password-code', onVerifyRecoveryPasswordCode);

router.post('/reset-password', resetPassword);

router.put('/', passport.authenticate('jwt', { session: false }), userAvatarMulter.single("avatar"), updateProfile);

// router.route('/')
//     .put(updateProfile)
//     .get(passport.authenticate('jwt', { session: false }), onGetUser);

module.exports = router;