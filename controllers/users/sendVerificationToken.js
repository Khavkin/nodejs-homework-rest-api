const { nanoid } = require('nanoid');
const { httpError } = require('../../helpers');
const { usersService } = require('../../service');
const sendEmail = require('../../helpers/sendEmail');

const sendVerificationToken = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await usersService.getUserByEmail(email);
    if (!user) return next(httpError(404, 'User not found'));
    if (user.verify) return next(httpError(400, 'Verification has already been passed'));
    const verificationToken = nanoid();
    await usersService.setVerificationStatus(user._id, { verify: false, verificationToken });

    const response = await sendEmail({ email, verificationToken });
    if (response) res.status(200).json({ message: 'Verification email sent' });
    else res.status(500).json({ message: 'Mail sending error' });
  } catch (error) {
    next(httpError(500, error.message));
  }
};

module.exports = sendVerificationToken;
