const router = require('express').Router();
const MenuController = require('../controllers/menu');

router.get('/', MenuController.getAll);

module.exports = router;