const bcrypt = require('bcrypt');
const { usersService } = require('../../service');
const { httpError } = require('../../helpers');
const gravatar = require('gravatar');

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const saltRounds = 10;
    const avatarURL = gravatar.url(email, { protocol: 'http', s: '250' });

    const hash = await bcrypt.hash(password, saltRounds);
    //console.log(avatarUrl);

    const { email: responseEmail, subscription } = await usersService.register({
      email,
      password: hash,
      avatarURL,
    });

    res.status(201).json({ user: { email: responseEmail, subscription } });
  } catch (e) {
    next(httpError(500, e.massage));
  }
};

module.exports = register;
