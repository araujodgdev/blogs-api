const { Category } = require('../models');

const createCategory = async (name) => {
  try {
    const category = await Category.create({ name });

    return category;
  } catch (error) {
    return { message: error.message };
  }
};

const findAll = async () => {
  try {
    const categories = await Category.findAll();
    return categories;
  } catch (error) {
    return { message: error.message };
  }
};

module.exports = {
  createCategory,
  findAll,
};
