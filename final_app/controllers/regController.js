const jwt = require('jsonwebtoken');
const { Users } = require('../models');

const secret = process.env.ACCESS_TOKEN_SECRET;

module.exports = {
  async registration(req, res) {
    try {
      const {
        email, password, login, name,
      } = req.body;
      const person = await Users.findOne({ where: { email } });
      if (person) {
        return res.status(400).json({ message: 'User is already exists' });
      }
      const user = await Users.create({
        email,
        name,
        login,
        password,
        avatar: null,
      });
      const payload = { id: user.id };
      const token = jwt.sign(payload, secret);
      return res.status(200).json({ message: 'Registration was successful!', token });
    } catch (e) {
      return res.status(500).json(e);
    }
  },
};
