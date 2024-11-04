const router = require('express').Router();
const passport = require('../libs/passportGoogle');
const userController = require('../controllers/user');

router.post('/register', userController.create);

router.get('/login', (req, res) => {
    res.send('Login page');
});

router.post('/login', userController.login);

router.get('/login/google', passport.authenticate('google'));

router.get(
    '/redirect/google',
    passport.authenticate('google', { failureRedirect: '/api/v1/auth/login', session: false }),
    userController.googleAuth
);

module.exports = router;