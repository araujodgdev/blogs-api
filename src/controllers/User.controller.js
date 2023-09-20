const jwt = require('jsonwebtoken');
const { userService } = require('../services');

const secret = process.env.JWT_SECRET || 'meuSegredoJWT';

const registerUser = async (req, res) => {
  try {
    const { displayName, email, password, image = '' } = req.body;
    const user = await userService.getUser(email, password);
    if (user.email) {
      return res.status(409).json({ message: 'User already registered' });
    }
    const jwtConfig = { algorithm: 'HS256' };
    const token = jwt.sign({ data: { userId: user.id } }, secret, jwtConfig);
    await userService.registerUser(displayName, email, password, image);
    return res.status(201).json({ token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const findAllUsers = async (_req, res) => {
  try {
    const users = await userService.findAll();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const findUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    if (user.message) return res.status(404).json({ message: user.message });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.user;
    await userService.deleteUser(id);
    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  findAllUsers,
  findUserById,
  deleteUser,
};
