const router = require('express').Router();
const { loginController } = require('../controllers');
const { validateLoginFields } = require('../middlewares/login');

router.post('/', validateLoginFields, loginController.login);

module.exports = router;