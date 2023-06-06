const express = require('express');
const { usersControllers } = require('../../controllers');
const { validateBody, checkUserEmail } = require('../../decorators');
const { usersSchema } = require('../../schemas');

const router = express.Router();

router.post('/login', usersControllers.login);

router.post('/register', validateBody(usersSchema), checkUserEmail(), usersControllers.register);

router.post('/logout', usersControllers.logout);

router.get('/current', usersControllers.current);

module.exports = router;
