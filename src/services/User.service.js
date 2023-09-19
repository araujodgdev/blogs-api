const { User } = require('../models');

const getUser = async (email, password) => {
  try {
    const user = await User.findOne({
      where: {
        email,
        password,
      },
    });

    if (!user) {
      throw new Error('Invalid fields');
    }

    return user;
  } catch (error) {
    return {
      message: error.message,
    };
  }
};

module.exports = {
  getUser,
};
