const express = require('express');
const { usersControllers } = require('../../controllers');
const { validateBody, checkUserEmail } = require('../../decorators');
const { usersSchema } = require('../../schemas');
const { auth, upload } = require('../../middlewares');

const router = express.Router();

router.post('/login', validateBody(usersSchema.registerSchema), usersControllers.login);

router.post(
  '/register',
  validateBody(usersSchema.registerSchema),
  checkUserEmail(),
  usersControllers.register
);

router.post('/logout', auth, usersControllers.logout);

router.get('/current', auth, usersControllers.current);

router.patch(
  '/',
  auth,
  validateBody(usersSchema.subscriptionSchema),
  usersControllers.setSubscription
);
router.patch('/avatars', auth, upload.single('avatar'), usersControllers.setAvatar);

module.exports = router;
