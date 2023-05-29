const express = require('express');
const usersControllers = require('../controllers/users');

const router = express.Router();

router.post('/login', usersControllers.login);

router.post('/register', usersControllers.register);

router.post('/logout', usersControllers.logout);

router.get('/current', usersControllers.current);

module.exports = router;
