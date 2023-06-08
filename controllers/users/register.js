const bcrypt = require('bcrypt');
const { usersService } = require('../../service');
const { httpError } = require('../../helpers');
//const checkUserEmail = require('../../middlewares');

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const saltRounds = 10;

    const hash = await bcrypt.hash(password, saltRounds);
    console.log(hash);

    const { email: responseEmail, subscription } = await usersService.register({
      email,
      password: hash,
    });

    res.status(201).json({ user: { email: responseEmail, subscription } });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = register;

// {
//  "email": "dui.diam@Donec6.com",
//         "password":"Mama-145!"
// }
