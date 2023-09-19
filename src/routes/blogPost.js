const router = require('express').Router();

const validateJWT = require('../middlewares/validateJWT');
const { blogPostController } = require('../controllers');
const {
  hasAllFields,
  validateCategoryIds,
} = require('../middlewares/blogPost');

router.post(
  '/',
  validateJWT,
  hasAllFields,
  validateCategoryIds,
  blogPostController.createBlogPost,
);

module.exports = router;
