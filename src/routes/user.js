const router = require('express').Router();
const { userController } = require('../controllers');
const { validateNewUserInfo } = require('../middlewares/user');

router.post('/', validateNewUserInfo, userController.registerUser);

module.exports = router;