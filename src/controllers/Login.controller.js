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
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.getUser(email, password);

    if (user.message) {
      return res.status(httpStatusCodes.badRequest)
        .json({ message: user.message });
    }

    const jwtConfig = { algorithm: 'HS256' };
    const token = jwt.sign({ data: { userId: user.id } }, secret, jwtConfig);

    return res.status(httpStatusCodes.OK).json({
      token,
    });
  } catch (error) {
    return res.status(httpStatusCodes.internalServerError).json({
      message: error.message,
    });
  }
};

module.exports = {
  login,
};
