const router = require('express').Router();

const validateJWT = require('../middlewares/validateJWT');
const { blogPostController } = require('../controllers');
const {
  hasAllFields,
  validateCategoryIds,
  hasCategories,
  validateOwnership,
} = require('../middlewares/blogPost');

router.post(
  '/',
  validateJWT,
  hasAllFields,
  hasCategories,
  validateCategoryIds,
  blogPostController.createBlogPost,
);

router.get('/', validateJWT, blogPostController.getAllPosts);

router.get('/:id', validateJWT, blogPostController.getPostById);

router.put(
  '/:id',
  validateJWT,
  hasAllFields,
  validateOwnership,
  blogPostController.updateBlogPost,
);

router.delete(
  '/:id',
  validateJWT,
  validateOwnership,
  blogPostController.deleteBlogPost,
);
module.exports = router;
