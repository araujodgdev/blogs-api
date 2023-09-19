const jwt = require('jsonwebtoken');
const { userService } = require('../services');

const secret = process.env.JWT_SECRET || 'meuSegredoJWT';

const httpStatusCodes = {
  OK: 200,
  created: 201,
  accepted: 202,
  noContent: 204,
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
      return res.status(httpStatusCodes.inConflict)
        .json({ message: 'User already registered' });
    }

    const jwtConfig = { algorithm: 'HS256' };
    const payload = { userId: user.id };
    const token = jwt.sign({ data: payload }, secret, jwtConfig);
    await userService.registerUser(displayName, email, password, image);

    return res.status(httpStatusCodes.created).json({ token });
  } catch (error) {
    return res.status(httpStatusCodes.internalServerError).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
};
