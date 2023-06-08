const jwt = require('jsonwebtoken');

const verifyToken = token => {
  const secret = process.env.SECRET;
  try {
    const verify = jwt.verify(token, secret);
    //const user = UserModel.findById(verify._id);
    //const user = await usersService.getUserById(verify._id);
    return verify;
  } catch (error) {
    error.status = 401;
    throw error;
  }
};

module.exports = verifyToken;
