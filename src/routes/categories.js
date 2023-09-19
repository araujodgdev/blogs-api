const router = require('express').Router();
const { categoryController } = require('../controllers');
const validateJWT = require('../middlewares/validateJWT');

router.post('/', validateJWT, categoryController.createCategory);

module.exports = router;