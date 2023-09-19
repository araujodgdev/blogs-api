const jwt = require('jsonwebtoken');

const { userService } = require('../services');

const secret = process.env.JWT_SECRET || 'meuSegredoJWT';

function extractToken(baererToken) {
  return baererToken.split(' ')[1];
}

module.exports = async (req, res, next) => {
  const baererToken = req.headers.authorization;
  const token = extractToken(baererToken);
  try {
    if (!baererToken) return res.status(401).json({ message: 'Token not found' });
    const decoded = jwt.verify(token, secret);
    const id = decoded.data.userId;
    const user = await userService.getUserById(id);

    req.user = user;

    return next();
  } catch (error) {
    return res.status(401).json({
      message: 'Expired or invalid token',
    });
  }
};
