const express = require('express');
const usersController = require('../controllers/usersController');

const router = express.Router();

/* GET users listing. */
router.get('/:id', usersController.getOneUser);

module.exports = router;
