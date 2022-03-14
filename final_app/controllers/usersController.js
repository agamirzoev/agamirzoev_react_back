const jwt = require('jsonwebtoken');
const { Users } = require('../models');
const { News } = require('../models');

module.exports = {
  createUser(req, res) {
    return Users.create({ name: req.body.name, stage: req.body.stage })
      .then((user) => res.status(200).send(user))
      .catch((e) => res.status(500).send(e));
  },

  getOneUser(req, res) {
    const { id } = req.params;
    return Users.findOne({
      where: { id },
    })
      .then((user) => res.status(200).send(user))
      .catch((e) => res.status(500).send(e));
  },

  getProfile(req, res) {
    const { authorization } = req.headers;
    const isVerify = jwt.verify(authorization, process.env.accessTokenSecret);
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
      .then((user) => res.status(200).send(user))
      .catch((e) => res.status(500).send(e));
  },
};
