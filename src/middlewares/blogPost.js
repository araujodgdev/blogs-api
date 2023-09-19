const { categoryService } = require('../services');

const hasAllFields = (req, res, next) => {
  if (!req.body.title || !req.body.content || !req.body.categoryIds) {
    return res.status(400).json({
      message: 'Some required fields are missing',
    });
  }
  next();
};

const validateCategoryIds = async (req, res, next) => {
  const { categoryIds } = req.body;
  const allCategories = await categoryService.findAll();

  await categoryIds.forEach((id) => {
    const isRegistered = allCategories.some((category) => category.id === id);

    if (isRegistered === false) {
      return res.status(400).json({
        message: 'one or more "categoryIds" not found',
      });
    }
  });

  next();
};

module.exports = {
  hasAllFields,
  validateCategoryIds,
};
