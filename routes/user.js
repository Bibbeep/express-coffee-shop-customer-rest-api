const router = require('express').Router();
const userController = require('../controllers/user');

router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.delete('/:id', userController.deleteById);
// TODO: PATCH /users/:id => change user's username, email, password/googleId?? (still not sure how to), firstName, lastName, birthDate, gender, phoneNumber, pictureUrl


module.exports = router;