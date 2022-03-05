const express = require('express');
const regController = require('../controllers/regController');

const router = express.Router();

router.post('/', regController.registration);

module.exports = router;
