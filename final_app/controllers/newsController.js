const uuid = require('uuid');
const path = require('path');
const jwt = require('jsonwebtoken');
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
  createNews(req, res) {
    const { authorization } = req.headers;
    const isVerify = jwt.verify(authorization, process.env.accessTokenSecret);
    if (isVerify) {
      const { header, content, tag } = req.body;
      const { picture } = req.files;
      const fileName = `${uuid.v4()}.jpg`;
      picture.mv(path.resolve(__dirname, '..', 'uploads', fileName));
      return News.create({
        header, content, tag, picture: fileName, user_id: isVerify.id,
      })
        .then((news) => res.status(200).send(news))
        .catch((e) => res.status(500).send(e));
    }
    return res.status(403).send({ message: 'Not authorized' });
  },
};
