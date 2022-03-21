const express = require('express');
const usersController = require('../controllers/usersController');

const router = express.Router();

/* GET users listing. */
router.get('/profile', usersController.getProfile);
router.get('/users/:id', usersController.getOneUser);
router.patch('/profile', usersController.changeProfile);

module.exports = router;
