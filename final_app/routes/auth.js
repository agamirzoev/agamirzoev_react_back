const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

/* GET news listing. */
router.post('/registration', authController.registration);
router.post('/login', authController.login);


module.exports = router;