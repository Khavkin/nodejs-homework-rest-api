const UserModel = require('./schemas/users');

/***
 * function register
 * Add user and return new user
 *
 * @param body {
 * {email} required - user email,
 * {password} required - contact phone,
 * }
 *
 * @return user = {_id,email,subscription,password,token}
 */
const register = async body => {
  try {
    const newUser = await UserModel.create(body);

    return newUser;
  } catch (e) {
    console.error(e.message);
    throw e;
  }
};

/***
 * function getUserByEmail
 * Get user by email
 *
 * @param
 * {email} required - user email,
 *
 * @return user = {_id,email,subscription,password,token}
 */
const getUserByEmail = async email => {
  try {
    const user = await UserModel.findOne({ email });
    return user;
  } catch (e) {
    console.error(e.message);
    throw e;
  }
};

/***
 * function getUserById
 * Get user by id
 *
 * @param
 * {id} required - user _id,
 *
 * @return user = {_id,email,subscription,password,token}
 */
const getUserById = async id => {
  try {
    const user = await UserModel.findById(id);
    return user;
  } catch (e) {
    console.error(e.message);
    throw e;
  }
};

/***
 * function setToken
 * set user token
 *
 * @param
 * {id} required - user _id,
 * {token} required - user _id,
 *
 * @return user = {_id,email,subscription,password,token}
 */
const setToken = async (id, token) => {
  try {
    const user = await UserModel.findByIdAndUpdate(id, { token }, { new: true });
    return user;
  } catch (e) {
    console.error(e.message);
    throw e;
  }
};

/***
 * function setSubscription
 * set user subscription
 *
 * @param
 * {id} required - user _id,
 * {sybscription} required - user subscriptiongit co,
 *
 * @return user = {_id,email,subscription,password,token}
 */
const setSubscription = async (id, subscription) => {
  try {
    const user = await UserModel.findByIdAndUpdate(id, { subscription }, { new: true });
    return user;
  } catch (e) {
    console.error(e.message);
    throw e;
  }
};
/***
 * function setAvatar
 * set user avatar
 *
 * @param
 * {id} required - user _id,
 * {avatar} required - user subscriptiongit co,
 *
 * @return user = {_id,email,subscription,password,token}
 */
const setAvatar = async (id, avatarURL) => {
  try {
    const user = await UserModel.findByIdAndUpdate(id, { avatarURL }, { new: true });
    return user;
  } catch (e) {
    console.error(e.message);
    throw e;
  }
};

/***
 * function getUserByVerificationToken
 * Get user by verificationToken
 *
 * @param
 * {verificationCode} required - code for verification user email,
 *
 * @return user = {_id,email,subscription,password,token,...}
 */
const getUserByVerificationToken = async verificationToken => {
  try {
    const user = await UserModel.findOne({ verificationToken });

    return user;
  } catch (e) {
    console.error(e.message);
    throw e;
  }
};

/***
 * function setVerificationStatus
 * set verified flag to user
 *
 * @param
 * {_id} required - user _id,
 * {
 * data : {
 *   verify: true|false,
 *   verificationToken: "code"|""
 * }
 * } required
 *
 * @return user = {_id,email,subscription,password,token,...}
 */
const setVerificationStatus = async (_id, data) => {
  try {
    const user = await UserModel.findByIdAndUpdate(_id, data, { new: true });

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
  setAvatar,
  getUserByVerificationToken,
  setVerificationStatus,
};

module.exports = usersService;
