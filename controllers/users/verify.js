const { usersService } = require('../../service');

const verify = async (req, res) => {
  const { verificationToken } = req.params;

  try {
    const user = await usersService.getUserByVerificationToken(verificationToken);
    if (user) {
      await usersService.setVerificationStatus(user._id, { verify: true, verificationToken: '' });
      res.status(200).json({ message: 'Verification successful' });
    } else res.status(404).json({ message: 'User not found' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = verify;
