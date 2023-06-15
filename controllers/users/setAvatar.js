const path = require('path');
const { usersService } = require('../../service');
const { httpError } = require('../../helpers');
const fs = require('fs').promises;
const jimp = require('jimp');

const imageStorePath = path.join(process.cwd(), 'public', 'avatars');

const setAvatar = async (req, res, next) => {
  const { path: uploadName, filename } = req.file;
  const { _id } = req.user;

  console.log(req.file);

  const destFileName = path.join(imageStorePath, filename);
  try {
    console.log(uploadName, destFileName);
    const file = await jimp.read(uploadName);
    file.resize(250, 250).write(uploadName);
    await fs.rename(uploadName, destFileName);
  } catch (err) {
    await fs.unlink(uploadName);
    return next(err);
  }

  const avatarURL = 'avatars/' + filename;
  try {
    const user = await usersService.setAvatar(_id, avatarURL);
    res.status(200).json({ avatarURL });
  } catch (e) {
    next(httpError(500, e.message));
  }
};

module.exports = setAvatar;
