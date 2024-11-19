const router = require('express').Router();
const authRoutes = require('./auth');
const userRoutes = require('./user');
const menuRoutes = require('./menu');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/menus', menuRoutes);

module.exports = router;