const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Users } = require('../models');

const secret = process.env.ACCESS_TOKEN_SECRET;

module.exports = {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: 'User not found!' });
      }
      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Incorrect password!' });
      }
      const payload = { id: user.id };
      const { id } = user;
      const token = jwt.sign(payload, secret);
      return res.json({ message: 'Authorization was successful!', token, id });
    } catch (e) {
      return res.status(500).json({ e });
    }
  },
};
