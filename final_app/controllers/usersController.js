/* eslint-disable no-param-reassign */
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const path = require('path');
const { Users, News } = require('../models');

module.exports = {
  createUser(req, res) {
    return Users.create({ name: req.body.name, stage: req.body.stage })
      .then((user) => res.status(200).send(user))
      .catch((e) => res.status(500).send(e));
  },

  getOneUser(req, res) {
    const { id } = req.params;
    const { authorization } = req.headers;
    const isVerify = jwt.verify(authorization, process.env.ACCESS_TOKEN_SECRET);

    const userId = id || isVerify.id;
    return Users.findOne({
      where: { id: userId },
      include: [{ model: News, as: 'news' }],
      order: [
        [
          { model: News, as: 'news' },
          'createdAt', 'DESC',
        ],
      ],
    })
      .then((user) => {
        delete user.dataValues.password;
        return res.status(200).send(user);
      })
      .catch((e) => res.status(500).send(e));
  },

  getProfile(req, res) {
    const { authorization } = req.headers;
    const isVerify = jwt.verify(authorization, process.env.ACCESS_TOKEN_SECRET);
    return Users.findOne({
      where: { id: isVerify.id },
      include: [{ model: News, as: 'news' }],
      order: [
        [
          { model: News, as: 'news' },
          'createdAt', 'DESC',
        ],
      ],
    })
      .then((user) => {
        delete user.dataValues.password;
        return res.status(200).send(user);
      })
      .catch((e) => res.status(500).send(e));
  },

  changeProfile(req, res) {
    const { authorization } = req.headers;
    const isVerify = jwt.verify(authorization, process.env.ACCESS_TOKEN_SECRET);
    if (isVerify) {
      const { name, login } = req.body;
      const { avatar } = req.files;
      const fileName = `${uuid.v4()}.jpg`;
      avatar.mv(path.resolve(__dirname, '..', 'uploads', fileName));
      return Users.update({ name, login, avatar: fileName }, {
        where: { id: isVerify.id },
      })
        .then((user) => res.status(200).send(user))
        .catch((e) => res.status(500).send(e));
    }
    return res.status(403).send({ message: 'Not authorized' });
  },
};
