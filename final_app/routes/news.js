const express = require('express');
const newsController = require('../controllers/newsController');

const router = express.Router();

/* GET news listing. */
router.get('/', newsController.getAllNews);

module.exports = router;