const Sequelize = require('sequelize');
const config = require('../config/config');

const { BlogPost, PostCategory, User, Category } = require('../models');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const create = async (title, content, categoryIds, id) => {
  const result = await sequelize.transaction(async (t) => {
    const blogPost = await BlogPost.create(
      { title, content, userId: id, published: Date.now(), updated: Date.now() },
      { transaction: t },
    );
    await PostCategory.bulkCreate(categoryIds
        .map((categoryId) => ({ postId: blogPost.id, categoryId })), { transaction: t });
    return blogPost;
  });
  return result;
};

const getAll = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return posts;
};

const getById = async (id) => {
  const post = await BlogPost.findOne({ where: { id },
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } }],
  });
  return post;
};

const updatePost = async (id, title, content) => {
  const post = await BlogPost.update({ title, content }, { where: { id } });
  return post;
};

const deletePost = async (id) => {
  await BlogPost.destroy({ where: { id } });
};

module.exports = {
  create,
  getAll,
  getById,
  updatePost,
  deletePost,
};
