const validateDisplayName = (name) => name.length >= 8;

const validateEmailFormat = (email) => {
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regexEmail.test(email);
};

const validatePasswordLength = (password) => password.length >= 6;

const validateNewUserInfo = (req, res, next) => {
  try {
    const { displayName, email, password } = req.body;
    if (!validateDisplayName(displayName)) {
      return res.status(400).json({
        message: '"displayName" length must be at least 8 characters long',
      });
    }
    if (!validateEmailFormat(email)) {
      return res.status(400).json({ message: '"email" must be a valid email' });
    }
    if (!validatePasswordLength(password)) {
      return res.status(400).json({
        message: '"password" length must be at least 6 characters long',
      });
    }
    return next();
  } catch (error) { return res.status(500).json({ message: error.message }); }
};

module.exports = {
  validateNewUserInfo,
};