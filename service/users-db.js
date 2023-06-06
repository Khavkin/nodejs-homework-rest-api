const { UserModel } = require('./schemas');

const register = async body => {
  try {
    const newUser = await UserModel.create(body);
    return newUser;
  } catch (error) {
    console.error(e.message);
    throw e;
  }
};

const getUserByEmail = async email => {
  try {
    const user = await UserModel.findOne({ email });
    return user;
  } catch (e) {
    console.error(e.message);
    throw e;
  }
};

const usersService = {
  getUserByEmail,
  register,
};

module.exports = usersService;
