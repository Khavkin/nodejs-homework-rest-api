const path = require('path');
const { usersService } = require('../../service');
const { httpError } = require('../../helpers');
const fs = require('fs').promises;

const imageStorePath = path.join(process.cwd(), 'public', 'avatars');

const setAvatar = async (req, res, next) => {
  const { path: uploadName, originalname } = req.file;
  const { _id } = req.user;

  const destFileName = path.join(imageStorePath, originalname);
  try {
    console.log(uploadName, destFileName);
    await fs.rename(uploadName, destFileName);
  } catch (err) {
    await fs.unlink(uploadName);
    return next(err);
  }

  const avatarURL = 'avatars/' + originalname;
  try {
    const user = await usersService.setAvatar(_id, avatarURL);
    res.status(200).json({ avatarURL });
  } catch (e) {
    next(httpError(500, e.message));
  }
};

module.exports = setAvatar;
