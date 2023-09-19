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

router.get('/', validateJWT, blogPostController.getAllPosts);

router.get('/:id', validateJWT, blogPostController.getPostById);
module.exports = router;
