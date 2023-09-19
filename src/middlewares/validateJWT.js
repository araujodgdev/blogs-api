const jwt = require('jsonwebtoken');

const { userService } = require('../services');

const secret = process.env.JWT_SECRET || 'meuSegredoJWT';

function extractToken(baererToken) {
  return baererToken.split(' ')[1];
}

module.exports = (req, res, next) => {
  const baererToken = req.headers.authorization;
  const token = extractToken(baererToken);
  try {
    if (!baererToken) return res.status(401).json({ message: 'Token not found' });
    const decoded = jwt.verify(token, secret);
    const user = userService.getUserById(decoded.data.id);

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Expired or invalid token',
    });
  }
};
