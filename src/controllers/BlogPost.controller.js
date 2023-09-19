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

module.exports = {
  createBlogPost,
};
