const UserModel = require('./schemas/users');

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

const getUserById = async id => {
  try {
    const user = await UserModel.findById(id);
    return user;
  } catch (e) {
    console.error(e.message);
    throw e;
  }
};

const setToken = async (id, token) => {
  try {
    const user = await UserModel.findByIdAndUpdate(id, { token }, { new: true });
    return user;
  } catch (e) {
    console.error(e.message);
    throw e;
  }
};

const setSubscription = async (id, subscription) => {
  try {
    const user = await UserModel.findByIdAndUpdate(id, { subscription }, { new: true });
    return user;
  } catch (e) {
    console.error(e.message);
    throw e;
  }
};

const usersService = {
  getUserByEmail,
  register,
  getUserById,
  setToken,
  setSubscription,
};

module.exports = usersService;
