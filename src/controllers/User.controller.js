const jwt = require('jsonwebtoken');
const { userService } = require('../services');

const secret = process.env.JWT_SECRET || 'meuSegredoJWT';

const httpStatusCodes = {
  OK: 200,
  created: 201,
  badRequest: 400,
  unauthorized: 401,
  notFound: 404,
  internalServerError: 500,
  inConflict: 409,
};

const registerUser = async (req, res) => {
  try {
    const { displayName, email, password, image = '' } = req.body;
    const user = await userService.getUser(email, password);

    if (user.email) {
      return res.status(httpStatusCodes.inConflict).json({ message: 'User already registered' });
    }

    const jwtConfig = { algorithm: 'HS256' };
    const token = jwt.sign({ data: { userId: user.id } }, secret, jwtConfig);
    await userService.registerUser(displayName, email, password, image);

    return res.status(httpStatusCodes.created).json({ token });
  } catch (error) {
    return res.status(httpStatusCodes.internalServerError).json({ message: error.message });
  }
};

const findAllUsers = async (_req, res) => {
  try {
    const users = await userService.findAll();
    return res.status(httpStatusCodes.OK).json(users);
  } catch (error) {
    return res.status(httpStatusCodes.internalServerError).json({ message: error.message });
  }
};

const findUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    if (user.message) return res.status(httpStatusCodes.notFound).json({ message: user.message });
    return res.status(httpStatusCodes.OK).json(user);
  } catch (error) {
    return res.status(httpStatusCodes.internalServerError).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  findAllUsers,
  findUserById,
};
