const { categoryService, blogPostService } = require('../services');

const hasAllFields = (req, res, next) => {
  if (!req.body.title || !req.body.content) {
    return res.status(400).json({
      message: 'Some required fields are missing',
    });
  }
   next();
};

const hasCategories = (req, res, next) => {
  if (!req.body.categoryIds) {
    return res.status(400).json({
      message: 'Some required fields are missing',
    });
  }
   next();
};

const validateCategoryIds = async (req, res, next) => {
  const { categoryIds } = req.body;
  const allCategories = await categoryService.findAll();

  const categoriesExists = await categoryIds.map((id) => allCategories
  .some((category) => category.id === id));

  if (!categoriesExists.every((exists) => exists === true)) {
    return res.status(400).json({
      message: 'one or more "categoryIds" not found',
    });
  }
   next();
};

const validateOwnership = async (req, res, next) => {
  const { id } = req.params;
  const loggedUser = req.user.id;
  const post = await blogPostService.getById(id);
  if (!post) {
    return res.status(404).json({
      message: 'Post does not exist',
    });
  }
  if (post.userId !== loggedUser) {
    return res.status(401).json({
      message: 'Unauthorized user',
    });
  }
  next();
};

module.exports = {
  hasAllFields,
  validateCategoryIds,
  validateOwnership,
  hasCategories,
};
