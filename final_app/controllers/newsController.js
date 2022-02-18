const { News } = require('../models');

const SUCCESS_CODE = '200';
const SERVER_ERROR_CODE = '500';

module.exports = {
  getAllNews(req, res) {
    return News.findAll({
      order: [
        ['createdAt', 'ASC']],
    })
      .then((news) => res.status(SUCCESS_CODE).json(news))
      .catch((e) => res.status(SERVER_ERROR_CODE).send(e));
  },
};