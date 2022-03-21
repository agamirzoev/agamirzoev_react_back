const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Users } = require('../models');

const secret = process.env.ACCESS_TOKEN_SECRET;

module.exports = {
  async registration(req, res) {
    try {
      const {
        email, password, login, name,
      } = req.body;
      if (!email || !password) {
        return res.status(400).json({ Error: 'Uncorrect email or password!' });
      }
      const person = await Users.findOne({ where: { email } });
      if (person) {
        return res.status(400).json({ Error: 'User is already exists' });
      }
      const hashPassword = await bcrypt.hash(password, 5);
      const user = await Users.create({
        email,
        name,
        login,
        password: hashPassword,
        avatar: null,
      });
      const payload = { id: user.id, email };
      const token = jwt.sign(payload, secret);
      return res.status(200).json({ message: 'Registration was successful!', token: `${token}` });
    } catch (e) {
      return res.status(500).json(e);
    }
  },
};
