const router = require('express').Router();
const passport = require('../libs/passportGoogle');
const UserController = require('../controllers/user');

router.post('/register', UserController.create);
router.post('/login', UserController.login);
router.get('/login/google', passport.authenticate('google'));
router.get('/redirect/google', passport.authenticate('google', { failureRedirect: '/api/auth/login', session: false }), UserController.googleAuth);

module.exports = router;