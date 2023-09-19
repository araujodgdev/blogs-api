const router = require('express').Router();
const { userController } = require('../controllers');
const { validateNewUserInfo } = require('../middlewares/user');
const validateJWT = require('../middlewares/validateJWT');

router.post('/', validateNewUserInfo, userController.registerUser);

router.get('/', validateJWT, userController.findAllUsers);

router.get('/:id', validateJWT, userController.findUserById);

module.exports = router;
