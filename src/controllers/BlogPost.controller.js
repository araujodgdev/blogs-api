const { blogPostService } = require('../services');

const createBlogPost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id } = req.user;
    const result = await blogPostService.create(
      title,
      content,
      categoryIds,
      id,
    );
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json(req.user);
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await blogPostService.getAll();
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await blogPostService.getById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post does not exist' });
    }
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBlogPost,
  getAllPosts,
  getPostById,
};
